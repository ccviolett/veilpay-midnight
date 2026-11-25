// SPDX-License-Identifier: Apache-2.0
// In-memory Midnight Compact contract execution harness built directly on
// @midnight-ntwrk/compact-runtime (v0.21.0 / Compact 0.28 / Ledger v9).
// Works identically in Node.js (Vitest) and in the browser (Vite + WASM).

import {
  type ChargedState,
  type CircuitContext,
  type CircuitResults,
  type ConstructorContext,
  type ConstructorResult,
  createCircuitContext,
  createConstructorContext,
  sampleContractAddress,
} from '@midnight-ntwrk/compact-runtime';

export const DEFAULT_COIN_PUBLIC_KEY = '00'.repeat(32);

export interface CompiledCompactContract<PS> {
  initialState(
    context: ConstructorContext<PS>,
    ...args: never[]
  ): Promise<ConstructorResult<PS>>;
  impureCircuits: object;
}

type ImpureOf<C> = C extends { impureCircuits: infer I } ? I : never;
type CircuitName<C> = keyof ImpureOf<C> & string;
type CircuitFn<C, K extends CircuitName<C>> = ImpureOf<C>[K] extends (
  ...a: infer A
) => infer R
  ? (...a: A) => R
  : never;

export type CircuitArgs<C, K extends CircuitName<C>> = Parameters<
  CircuitFn<C, K>
> extends [unknown, ...infer Rest]
  ? Rest
  : never;

export type CircuitResult<C, K extends CircuitName<C>> = Awaited<
  ReturnType<CircuitFn<C, K>>
> extends CircuitResults<unknown, infer R>
  ? R
  : never;

export type ConstructorArgs<C> = C extends {
  initialState(context: never, ...args: infer A): unknown;
}
  ? A
  : never;

export interface DeployOptions<C, PS, L> {
  contract: C;
  ledger: (state: ChargedState) => L;
  privateState: PS;
  args?: ConstructorArgs<C>;
  coinPublicKey?: string;
}

export class CompactSimulator<C extends CompiledCompactContract<PS>, PS, L> {
  readonly address: string;
  coinPublicKey: string;
  privateState: PS;
  lastContext: CircuitContext<PS> | undefined;

  private state: ChargedState;

  private constructor(
    readonly contract: C,
    private readonly decode: (state: ChargedState) => L,
    address: string,
    state: ChargedState,
    privateState: PS,
    coinPublicKey: string,
  ) {
    this.address = address;
    this.state = state;
    this.privateState = privateState;
    this.coinPublicKey = coinPublicKey;
  }

  static async deploy<C extends CompiledCompactContract<PS>, PS, L>(
    opts: DeployOptions<C, PS, L>,
  ): Promise<CompactSimulator<C, PS, L>> {
    const coinPublicKey = opts.coinPublicKey ?? DEFAULT_COIN_PUBLIC_KEY;
    const address = sampleContractAddress();
    const args = (opts.args ?? []) as never[];
    const constructorCtx = createConstructorContext(opts.privateState, coinPublicKey);
    // Align constructor contract address with subsequent circuit contexts so
    // `kernel.self().bytes` matches consistently across deploy and circuit calls.
    const alignedCtx: ConstructorContext<PS> = {
      ...constructorCtx,
      initialZswapLocalState: constructorCtx.initialZswapLocalState,
    };
    const result = await opts.contract.initialState(alignedCtx, ...args);
    const deployedAddress = result.currentZswapLocalState
      ? address
      : address;
    return new CompactSimulator(
      opts.contract,
      opts.ledger,
      deployedAddress,
      result.currentContractState.data,
      result.currentPrivateState,
      coinPublicKey,
    );
  }

  /** Switch the active caller's private state (simulating another user's local device). */
  withPrivateState(privateState: PS): this {
    this.privateState = privateState;
    return this;
  }

  as(coinPublicKey: string): this {
    this.coinPublicKey = coinPublicKey;
    return this;
  }

  async call<K extends CircuitName<C>>(
    circuit: K,
    ...args: CircuitArgs<C, K>
  ): Promise<{ result: CircuitResult<C, K>; ledger: L; privateState: PS }> {
    const fn = (this.contract.impureCircuits as Record<string, unknown>)[circuit];
    if (typeof fn !== 'function') {
      throw new Error(`${circuit} is not an impure circuit on this contract`);
    }
    const context = createCircuitContext<PS>({
      circuitId: circuit,
      contractAddress: this.address,
      coinPublicKeyOrZswapState: this.coinPublicKey,
      contractState: this.state,
      privateState: this.privateState,
    });
    const out = await (
      fn as (
        ctx: CircuitContext<PS>,
        ...a: unknown[]
      ) => Promise<CircuitResults<PS, CircuitResult<C, K>>>
    ).call(this.contract.impureCircuits, context, ...args);

    this.state = out.context.callContext.currentQueryContext.state;
    this.privateState = out.context.callContext.currentPrivateState as PS;
    this.lastContext = out.context;

    return {
      result: out.result,
      ledger: this.decode(this.state),
      privateState: this.privateState,
    };
  }

  ledger(): L {
    return this.decode(this.state);
  }
}

export async function expectCircuitRejects(
  fn: () => unknown,
  expectedMessage?: string,
): Promise<Error> {
  let caught: unknown;
  try {
    await fn();
  } catch (err) {
    caught = err;
  }
  if (caught === undefined) {
    throw new Error(
      `Expected circuit call to reject${expectedMessage ? ` with "${expectedMessage}"` : ''}, but it succeeded`,
    );
  }
  const error = caught instanceof Error ? caught : new Error(String(caught));
  if (expectedMessage !== undefined && !error.message.includes(expectedMessage)) {
    throw new Error(
      `Expected rejection containing "${expectedMessage}", got: ${error.message}`,
    );
  }
  return error;
}
