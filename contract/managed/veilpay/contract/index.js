import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.21.0');

export var RunStatus;
(function (RunStatus) {
  RunStatus[RunStatus['Open'] = 0] = 'Open';
  RunStatus[RunStatus['Finalized'] = 1] = 'Finalized';
  RunStatus[RunStatus['Audited'] = 2] = 'Audited';
})(RunStatus || (RunStatus = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_3 = new __compactRuntime.CompactTypeEnum(2, 1);

class _PayrollRun_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment()))))));
  }
  fromValue(value_0) {
    return {
      budgetCap: _descriptor_1.fromValue(value_0),
      minAllocation: _descriptor_1.fromValue(value_0),
      maxAllocation: _descriptor_1.fromValue(value_0),
      expectedHeadcount: _descriptor_2.fromValue(value_0),
      issuedCount: _descriptor_2.fromValue(value_0),
      claimedCount: _descriptor_2.fromValue(value_0),
      status: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.budgetCap).concat(_descriptor_1.toValue(value_0.minAllocation).concat(_descriptor_1.toValue(value_0.maxAllocation).concat(_descriptor_2.toValue(value_0.expectedHeadcount).concat(_descriptor_2.toValue(value_0.issuedCount).concat(_descriptor_2.toValue(value_0.claimedCount).concat(_descriptor_3.toValue(value_0.status)))))));
  }
}

const _descriptor_4 = new _PayrollRun_0();

const _descriptor_5 = __compactRuntime.CompactTypeBoolean;

const _descriptor_6 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_7 = __compactRuntime.CompactTypeField;

class _MerkleTreeDigest_0 {
  alignment() {
    return _descriptor_7.alignment();
  }
  fromValue(value_0) {
    return {
      field: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.field);
  }
}

const _descriptor_8 = new _MerkleTreeDigest_0();

class _IncomeAttestation_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_6.alignment()));
  }
  fromValue(value_0) {
    return {
      runId: _descriptor_0.fromValue(value_0),
      thresholdAmount: _descriptor_1.fromValue(value_0),
      verifierTag: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.runId).concat(_descriptor_1.toValue(value_0.thresholdAmount).concat(_descriptor_6.toValue(value_0.verifierTag)));
  }
}

const _descriptor_9 = new _IncomeAttestation_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_6.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.bytes);
  }
}

const _descriptor_10 = new _ContractAddress_0();

class _tuple_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_6.alignment());
  }
  fromValue(value_0) {
    return [
      _descriptor_1.fromValue(value_0),
      _descriptor_6.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0[0]).concat(_descriptor_6.toValue(value_0[1]));
  }
}

const _descriptor_11 = new _tuple_0();

class _MerkleTreePathEntry_0 {
  alignment() {
    return _descriptor_8.alignment().concat(_descriptor_5.alignment());
  }
  fromValue(value_0) {
    return {
      sibling: _descriptor_8.fromValue(value_0),
      goes_left: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_8.toValue(value_0.sibling).concat(_descriptor_5.toValue(value_0.goes_left));
  }
}

const _descriptor_12 = new _MerkleTreePathEntry_0();

const _descriptor_13 = new __compactRuntime.CompactTypeVector(10, _descriptor_12);

class _MerkleTreePath_0 {
  alignment() {
    return _descriptor_6.alignment().concat(_descriptor_13.alignment());
  }
  fromValue(value_0) {
    return {
      leaf: _descriptor_6.fromValue(value_0),
      path: _descriptor_13.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.leaf).concat(_descriptor_13.toValue(value_0.path));
  }
}

const _descriptor_14 = new _MerkleTreePath_0();

class _tuple_1 {
  alignment() {
    return _descriptor_6.alignment().concat(_descriptor_1.alignment().concat(_descriptor_6.alignment()));
  }
  fromValue(value_0) {
    return [
      _descriptor_6.fromValue(value_0),
      _descriptor_1.fromValue(value_0),
      _descriptor_6.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0[0]).concat(_descriptor_1.toValue(value_0[1]).concat(_descriptor_6.toValue(value_0[2])));
  }
}

const _descriptor_15 = new _tuple_1();

class _VoucherPayload_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_1.alignment()));
  }
  fromValue(value_0) {
    return {
      runId: _descriptor_0.fromValue(value_0),
      recipientKey: _descriptor_6.fromValue(value_0),
      amount: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.runId).concat(_descriptor_6.toValue(value_0.recipientKey).concat(_descriptor_1.toValue(value_0.amount)));
  }
}

const _descriptor_16 = new _VoucherPayload_0();

const _descriptor_17 = new __compactRuntime.CompactTypeBytes(6);

class _LeafPreimage_0 {
  alignment() {
    return _descriptor_17.alignment().concat(_descriptor_6.alignment());
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_17.fromValue(value_0),
      data: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_17.toValue(value_0.domain_sep).concat(_descriptor_6.toValue(value_0.data));
  }
}

const _descriptor_18 = new _LeafPreimage_0();

class _NullifierPreimage_0 {
  alignment() {
    return _descriptor_6.alignment().concat(_descriptor_6.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment()))));
  }
  fromValue(value_0) {
    return {
      domain: _descriptor_6.fromValue(value_0),
      instance: _descriptor_6.fromValue(value_0),
      secretKey: _descriptor_6.fromValue(value_0),
      runId: _descriptor_0.fromValue(value_0),
      salt: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.domain).concat(_descriptor_6.toValue(value_0.instance).concat(_descriptor_6.toValue(value_0.secretKey).concat(_descriptor_0.toValue(value_0.runId).concat(_descriptor_6.toValue(value_0.salt)))));
  }
}

const _descriptor_19 = new _NullifierPreimage_0();

class _AttestationPreimage_0 {
  alignment() {
    return _descriptor_6.alignment().concat(_descriptor_6.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_1.alignment())))));
  }
  fromValue(value_0) {
    return {
      domain: _descriptor_6.fromValue(value_0),
      instance: _descriptor_6.fromValue(value_0),
      employeeKey: _descriptor_6.fromValue(value_0),
      runId: _descriptor_0.fromValue(value_0),
      verifierTag: _descriptor_6.fromValue(value_0),
      thresholdAmount: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.domain).concat(_descriptor_6.toValue(value_0.instance).concat(_descriptor_6.toValue(value_0.employeeKey).concat(_descriptor_0.toValue(value_0.runId).concat(_descriptor_6.toValue(value_0.verifierTag).concat(_descriptor_1.toValue(value_0.thresholdAmount))))));
  }
}

const _descriptor_20 = new _AttestationPreimage_0();

const _descriptor_21 = new __compactRuntime.CompactTypeVector(2, _descriptor_7);

const _descriptor_22 = new __compactRuntime.CompactTypeVector(3, _descriptor_6);

class _Either_0 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_6.alignment().concat(_descriptor_6.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_5.fromValue(value_0),
      left: _descriptor_6.fromValue(value_0),
      right: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.is_left).concat(_descriptor_6.toValue(value_0.left).concat(_descriptor_6.toValue(value_0.right)));
  }
}

const _descriptor_23 = new _Either_0();

const _descriptor_24 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _UserAddress_0 {
  alignment() {
    return _descriptor_6.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.bytes);
  }
}

const _descriptor_25 = new _UserAddress_0();

class _Either_1 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_10.alignment().concat(_descriptor_25.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_5.fromValue(value_0),
      left: _descriptor_10.fromValue(value_0),
      right: _descriptor_25.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.is_left).concat(_descriptor_10.toValue(value_0.left).concat(_descriptor_25.toValue(value_0.right)));
  }
}

const _descriptor_26 = new _Either_1();

class _Maybe_0 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_26.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_5.fromValue(value_0),
      value: _descriptor_26.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.is_some).concat(_descriptor_26.toValue(value_0.value));
  }
}

const _descriptor_27 = new _Maybe_0();

const _descriptor_28 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.localSecretKey) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named localSecretKey');
    }
    if (typeof(witnesses_0.getAccumulatorOpening) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getAccumulatorOpening');
    }
    if (typeof(witnesses_0.nextRunSalt) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named nextRunSalt');
    }
    if (typeof(witnesses_0.getIssueVoucherSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getIssueVoucherSecret');
    }
    if (typeof(witnesses_0.getClaimVoucherSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getClaimVoucherSecret');
    }
    if (typeof(witnesses_0.getVoucherPath) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getVoucherPath');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      async deriveAdminKey(context, ...args_1) {
        return { result: pureCircuits.deriveAdminKey(...args_1), context };
      },
      async deriveAuditorKey(context, ...args_1) {
        return { result: pureCircuits.deriveAuditorKey(...args_1), context };
      },
      async deriveEmployeeKey(context, ...args_1) {
        return { result: pureCircuits.deriveEmployeeKey(...args_1), context };
      },
      async computeTotalCommitment(context, ...args_1) {
        return { result: pureCircuits.computeTotalCommitment(...args_1), context };
      },
      async computeVoucherCommitment(context, ...args_1) {
        return { result: pureCircuits.computeVoucherCommitment(...args_1), context };
      },
      async deriveNullifier(context, ...args_1) {
        return { result: pureCircuits.deriveNullifier(...args_1), context };
      },
      async deriveAttestationId(context, ...args_1) {
        return { result: pureCircuits.deriveAttestationId(...args_1), context };
      },
      rotateAdmin: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`rotateAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newAdminKey_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('rotateAdmin',
                                     'argument 1 (as invoked from Typescript)',
                                     'veilpay.compact line 234 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(newAdminKey_0.buffer instanceof ArrayBuffer && newAdminKey_0.BYTES_PER_ELEMENT === 1 && newAdminKey_0.length === 32)) {
          __compactRuntime.typeError('rotateAdmin',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'veilpay.compact line 234 char 1',
                                     'Bytes<32>',
                                     newAdminKey_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(newAdminKey_0),
            alignment: _descriptor_6.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._rotateAdmin_0(context,
                                                   partialProofData,
                                                   newAdminKey_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      setComplianceAuditor: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setComplianceAuditor: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newAuditorKey_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setComplianceAuditor',
                                     'argument 1 (as invoked from Typescript)',
                                     'veilpay.compact line 241 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(newAuditorKey_0.buffer instanceof ArrayBuffer && newAuditorKey_0.BYTES_PER_ELEMENT === 1 && newAuditorKey_0.length === 32)) {
          __compactRuntime.typeError('setComplianceAuditor',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'veilpay.compact line 241 char 1',
                                     'Bytes<32>',
                                     newAuditorKey_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(newAuditorKey_0),
            alignment: _descriptor_6.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._setComplianceAuditor_0(context,
                                                            partialProofData,
                                                            newAuditorKey_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      createPayrollRun: async (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`createPayrollRun: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const budgetCap_0 = args_1[1];
        const minAllocation_0 = args_1[2];
        const maxAllocation_0 = args_1[3];
        const expectedHeadcount_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createPayrollRun',
                                     'argument 1 (as invoked from Typescript)',
                                     'veilpay.compact line 250 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(budgetCap_0) === 'bigint' && budgetCap_0 >= 0n && budgetCap_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createPayrollRun',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'veilpay.compact line 250 char 1',
                                     'Uint<0..18446744073709551616>',
                                     budgetCap_0)
        }
        if (!(typeof(minAllocation_0) === 'bigint' && minAllocation_0 >= 0n && minAllocation_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createPayrollRun',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'veilpay.compact line 250 char 1',
                                     'Uint<0..18446744073709551616>',
                                     minAllocation_0)
        }
        if (!(typeof(maxAllocation_0) === 'bigint' && maxAllocation_0 >= 0n && maxAllocation_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createPayrollRun',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'veilpay.compact line 250 char 1',
                                     'Uint<0..18446744073709551616>',
                                     maxAllocation_0)
        }
        if (!(typeof(expectedHeadcount_0) === 'bigint' && expectedHeadcount_0 >= 0n && expectedHeadcount_0 <= 65535n)) {
          __compactRuntime.typeError('createPayrollRun',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'veilpay.compact line 250 char 1',
                                     'Uint<0..65536>',
                                     expectedHeadcount_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(budgetCap_0).concat(_descriptor_1.toValue(minAllocation_0).concat(_descriptor_1.toValue(maxAllocation_0).concat(_descriptor_2.toValue(expectedHeadcount_0)))),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._createPayrollRun_0(context,
                                                        partialProofData,
                                                        budgetCap_0,
                                                        minAllocation_0,
                                                        maxAllocation_0,
                                                        expectedHeadcount_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      issueVoucher: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`issueVoucher: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const runId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('issueVoucher',
                                     'argument 1 (as invoked from Typescript)',
                                     'veilpay.compact line 292 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(runId_0) === 'bigint' && runId_0 >= 0n && runId_0 <= 4294967295n)) {
          __compactRuntime.typeError('issueVoucher',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'veilpay.compact line 292 char 1',
                                     'Uint<0..4294967296>',
                                     runId_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(runId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._issueVoucher_0(context,
                                                    partialProofData,
                                                    runId_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      claimVoucher: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`claimVoucher: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const runId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('claimVoucher',
                                     'argument 1 (as invoked from Typescript)',
                                     'veilpay.compact line 348 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(runId_0) === 'bigint' && runId_0 >= 0n && runId_0 <= 4294967295n)) {
          __compactRuntime.typeError('claimVoucher',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'veilpay.compact line 348 char 1',
                                     'Uint<0..4294967296>',
                                     runId_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(runId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._claimVoucher_0(context,
                                                    partialProofData,
                                                    runId_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      proveIncomeThreshold: async (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`proveIncomeThreshold: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const runId_0 = args_1[1];
        const thresholdAmount_0 = args_1[2];
        const verifierTag_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('proveIncomeThreshold',
                                     'argument 1 (as invoked from Typescript)',
                                     'veilpay.compact line 394 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(runId_0) === 'bigint' && runId_0 >= 0n && runId_0 <= 4294967295n)) {
          __compactRuntime.typeError('proveIncomeThreshold',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'veilpay.compact line 394 char 1',
                                     'Uint<0..4294967296>',
                                     runId_0)
        }
        if (!(typeof(thresholdAmount_0) === 'bigint' && thresholdAmount_0 >= 0n && thresholdAmount_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('proveIncomeThreshold',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'veilpay.compact line 394 char 1',
                                     'Uint<0..18446744073709551616>',
                                     thresholdAmount_0)
        }
        if (!(verifierTag_0.buffer instanceof ArrayBuffer && verifierTag_0.BYTES_PER_ELEMENT === 1 && verifierTag_0.length === 32)) {
          __compactRuntime.typeError('proveIncomeThreshold',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'veilpay.compact line 394 char 1',
                                     'Bytes<32>',
                                     verifierTag_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(runId_0).concat(_descriptor_1.toValue(thresholdAmount_0).concat(_descriptor_6.toValue(verifierTag_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_6.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._proveIncomeThreshold_0(context,
                                                            partialProofData,
                                                            runId_0,
                                                            thresholdAmount_0,
                                                            verifierTag_0);
        partialProofData.output = { value: _descriptor_6.toValue(result_0), alignment: _descriptor_6.alignment() };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      finalizeRun: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`finalizeRun: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const runId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('finalizeRun',
                                     'argument 1 (as invoked from Typescript)',
                                     'veilpay.compact line 440 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(runId_0) === 'bigint' && runId_0 >= 0n && runId_0 <= 4294967295n)) {
          __compactRuntime.typeError('finalizeRun',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'veilpay.compact line 440 char 1',
                                     'Uint<0..4294967296>',
                                     runId_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(runId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._finalizeRun_0(context,
                                                   partialProofData,
                                                   runId_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      discloseRunTotal: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`discloseRunTotal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const runId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('discloseRunTotal',
                                     'argument 1 (as invoked from Typescript)',
                                     'veilpay.compact line 466 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(runId_0) === 'bigint' && runId_0 >= 0n && runId_0 <= 4294967295n)) {
          __compactRuntime.typeError('discloseRunTotal',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'veilpay.compact line 466 char 1',
                                     'Uint<0..4294967296>',
                                     runId_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(runId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._discloseRunTotal_0(context,
                                                        partialProofData,
                                                        runId_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      }
    };
    this.impureCircuits = {
      rotateAdmin: this.circuits.rotateAdmin,
      setComplianceAuditor: this.circuits.setComplianceAuditor,
      createPayrollRun: this.circuits.createPayrollRun,
      issueVoucher: this.circuits.issueVoucher,
      claimVoucher: this.circuits.claimVoucher,
      proveIncomeThreshold: this.circuits.proveIncomeThreshold,
      finalizeRun: this.circuits.finalizeRun,
      discloseRunTotal: this.circuits.discloseRunTotal
    };
    this.provableCircuits = {
      rotateAdmin: this.circuits.rotateAdmin,
      setComplianceAuditor: this.circuits.setComplianceAuditor,
      createPayrollRun: this.circuits.createPayrollRun,
      issueVoucher: this.circuits.issueVoucher,
      claimVoucher: this.circuits.claimVoucher,
      proveIncomeThreshold: this.circuits.proveIncomeThreshold,
      finalizeRun: this.circuits.finalizeRun,
      discloseRunTotal: this.circuits.discloseRunTotal
    };
  }
  async initialState(...args_0) {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const orgId_0 = args_0[1];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(orgId_0.buffer instanceof ArrayBuffer && orgId_0.BYTES_PER_ELEMENT === 1 && orgId_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 1 (argument 2 as invoked from Typescript)',
                                 'veilpay.compact line 222 char 1',
                                 'Bytes<32>',
                                 orgId_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('rotateAdmin', new __compactRuntime.ContractOperation());
    state_0.setOperation('setComplianceAuditor', new __compactRuntime.ContractOperation());
    state_0.setOperation('createPayrollRun', new __compactRuntime.ContractOperation());
    state_0.setOperation('issueVoucher', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimVoucher', new __compactRuntime.ContractOperation());
    state_0.setOperation('proveIncomeThreshold', new __compactRuntime.ContractOperation());
    state_0.setOperation('finalizeRun', new __compactRuntime.ContractOperation());
    state_0.setOperation('discloseRunTotal', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext({circuitId: 'constructor', contractAddress: __compactRuntime.dummyContractAddress(), coinPublicKeyOrZswapState: constructorContext_0.initialZswapLocalState.coinPublicKey, contractState: state_0.data, privateState: constructorContext_0.initialPrivateState});
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(0n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(1n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(2n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(3n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(4n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(5n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(6n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(7n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newBoundedMerkleTree(
                                                                       new __compactRuntime.StateBoundedMerkleTree(10)
                                                                     )).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                        alignment: _descriptor_1.alignment() })).arrayPush(__compactRuntime.StateValue.newMap(
                                                                                                                                                                             new __compactRuntime.StateMap()
                                                                                                                                                                           ))
                                                          .encode() } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(2n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(0n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       'root',
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(8n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(9n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const disclosedOrg_0 = orgId_0;
    __compactRuntime.assert(!this._equal_0(disclosedOrg_0, new Uint8Array(32)),
                            'Organization ID cannot be empty');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(0n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(disclosedOrg_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const sk_0 = this._localSecretKey_0(context, partialProofData);
    const tmp_0 = this._deriveAdminKey_0(sk_0, disclosedOrg_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(1n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_1 = this._deriveAuditorKey_0(sk_0, disclosedOrg_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(2n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_1),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.callContext.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.callContext.currentPrivateState,
      currentZswapLocalState: context.callContext.currentZswapLocalState
    }
  }
  _merkleTreePathRoot_0(path_0) {
    return { field:
               this._folder_0((...args_0) =>
                                this._merkleTreePathEntryRoot_0(...args_0),
                              this._degradeToTransient_0(this._persistentHash_3({ domain_sep:
                                                                                    new Uint8Array([109, 100, 110, 58, 108, 104]),
                                                                                  data:
                                                                                    path_0.leaf })),
                              path_0.path) };
  }
  _merkleTreePathEntryRoot_0(recursiveDigest_0, entry_0) {
    const left_0 = entry_0.goes_left ? recursiveDigest_0 : entry_0.sibling.field;
    const right_0 = entry_0.goes_left ?
                    entry_0.sibling.field :
                    recursiveDigest_0;
    return this._transientHash_0([left_0, right_0]);
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_21, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_22, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_19, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_20, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_18, value_0);
    return result_0;
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_1,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  _persistentCommit_1(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_16,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  _localSecretKey_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.localSecretKey(witnessContext_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('localSecretKey',
                                 'return value',
                                 'veilpay.compact line 117 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_6.toValue(result_0),
      alignment: _descriptor_6.alignment()
    });
    return result_0;
  }
  _getAccumulatorOpening_0(context, partialProofData, runId_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getAccumulatorOpening(witnessContext_0,
                                                                                runId_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 2  && typeof(result_0[0]) === 'bigint' && result_0[0] >= 0n && result_0[0] <= 18446744073709551615n && result_0[1].buffer instanceof ArrayBuffer && result_0[1].BYTES_PER_ELEMENT === 1 && result_0[1].length === 32)) {
      __compactRuntime.typeError('getAccumulatorOpening',
                                 'return value',
                                 'veilpay.compact line 120 char 1',
                                 '[Uint<0..18446744073709551616>, Bytes<32>]',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_11.toValue(result_0),
      alignment: _descriptor_11.alignment()
    });
    return result_0;
  }
  _nextRunSalt_0(context, partialProofData, runId_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.nextRunSalt(witnessContext_0,
                                                                      runId_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('nextRunSalt',
                                 'return value',
                                 'veilpay.compact line 123 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_6.toValue(result_0),
      alignment: _descriptor_6.alignment()
    });
    return result_0;
  }
  _getIssueVoucherSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getIssueVoucherSecret(witnessContext_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 3  && result_0[0].buffer instanceof ArrayBuffer && result_0[0].BYTES_PER_ELEMENT === 1 && result_0[0].length === 32 && typeof(result_0[1]) === 'bigint' && result_0[1] >= 0n && result_0[1] <= 18446744073709551615n && result_0[2].buffer instanceof ArrayBuffer && result_0[2].BYTES_PER_ELEMENT === 1 && result_0[2].length === 32)) {
      __compactRuntime.typeError('getIssueVoucherSecret',
                                 'return value',
                                 'veilpay.compact line 126 char 1',
                                 '[Bytes<32>, Uint<0..18446744073709551616>, Bytes<32>]',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_15.toValue(result_0),
      alignment: _descriptor_15.alignment()
    });
    return result_0;
  }
  _getClaimVoucherSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getClaimVoucherSecret(witnessContext_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 2  && typeof(result_0[0]) === 'bigint' && result_0[0] >= 0n && result_0[0] <= 18446744073709551615n && result_0[1].buffer instanceof ArrayBuffer && result_0[1].BYTES_PER_ELEMENT === 1 && result_0[1].length === 32)) {
      __compactRuntime.typeError('getClaimVoucherSecret',
                                 'return value',
                                 'veilpay.compact line 129 char 1',
                                 '[Uint<0..18446744073709551616>, Bytes<32>]',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_11.toValue(result_0),
      alignment: _descriptor_11.alignment()
    });
    return result_0;
  }
  _getVoucherPath_0(context, partialProofData, commitment_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getVoucherPath(witnessContext_0,
                                                                         commitment_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && result_0.leaf.buffer instanceof ArrayBuffer && result_0.leaf.BYTES_PER_ELEMENT === 1 && result_0.leaf.length === 32 && Array.isArray(result_0.path) && result_0.path.length === 10 && result_0.path.every((t) => typeof(t) === 'object' && typeof(t.sibling) === 'object' && typeof(t.sibling.field) === 'bigint' && t.sibling.field >= 0 && t.sibling.field <= __compactRuntime.MAX_FIELD && typeof(t.goes_left) === 'boolean'))) {
      __compactRuntime.typeError('getVoucherPath',
                                 'return value',
                                 'veilpay.compact line 132 char 1',
                                 'struct MerkleTreePath<leaf: Bytes<32>, path: Vector<10, struct MerkleTreePathEntry<sibling: struct MerkleTreeDigest<field: Field>, goes_left: Boolean>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_14.toValue(result_0),
      alignment: _descriptor_14.alignment()
    });
    return result_0;
  }
  _deriveAdminKey_0(sk_0, orgId_0) {
    return this._persistentHash_0([new Uint8Array([118, 101, 105, 108, 112, 97, 121, 58, 97, 100, 109, 105, 110, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   orgId_0,
                                   sk_0]);
  }
  _deriveAuditorKey_0(sk_0, orgId_0) {
    return this._persistentHash_0([new Uint8Array([118, 101, 105, 108, 112, 97, 121, 58, 97, 117, 100, 105, 116, 111, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   orgId_0,
                                   sk_0]);
  }
  _deriveEmployeeKey_0(sk_0, instance_0) {
    return this._persistentHash_0([new Uint8Array([118, 101, 105, 108, 112, 97, 121, 58, 101, 109, 112, 108, 111, 121, 101, 101, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   instance_0,
                                   sk_0]);
  }
  _computeTotalCommitment_0(total_0, salt_0) {
    return this._persistentCommit_0(total_0, salt_0);
  }
  _computeVoucherCommitment_0(runId_0, recipientKey_0, amount_0, salt_0) {
    return this._persistentCommit_1({ runId: runId_0,
                                      recipientKey: recipientKey_0,
                                      amount: amount_0 },
                                    salt_0);
  }
  _deriveNullifier_0(sk_0, runId_0, salt_0, instance_0) {
    return this._persistentHash_1({ domain:
                                      new Uint8Array([118, 101, 105, 108, 112, 97, 121, 58, 110, 117, 108, 108, 105, 102, 105, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                    instance: instance_0,
                                    secretKey: sk_0,
                                    runId: runId_0,
                                    salt: salt_0 });
  }
  _deriveAttestationId_0(employeeKey_0,
                         runId_0,
                         verifierTag_0,
                         thresholdAmount_0,
                         instance_0)
  {
    return this._persistentHash_2({ domain:
                                      new Uint8Array([118, 101, 105, 108, 112, 97, 121, 58, 97, 116, 116, 101, 115, 116, 97, 116, 105, 111, 110, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                    instance: instance_0,
                                    employeeKey: employeeKey_0,
                                    runId: runId_0,
                                    verifierTag: verifierTag_0,
                                    thresholdAmount: thresholdAmount_0 });
  }
  async _requireTreasuryAdmin_0(context, partialProofData) {
    const sk_0 = this._localSecretKey_0(context, partialProofData);
    const callerKey_0 = this._deriveAdminKey_0(sk_0,
                                               _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                         partialProofData,
                                                                                                         [
                                                                                                          { dup: { n: 0 } },
                                                                                                          { idx: { cached: false,
                                                                                                                   pushPath: false,
                                                                                                                   path: [
                                                                                                                          { tag: 'value',
                                                                                                                            value: { value: _descriptor_28.toValue(0n),
                                                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                                                          { popeq: { cached: false,
                                                                                                                     result: undefined } }]).value));
    __compactRuntime.assert(this._equal_1(callerKey_0,
                                          _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_28.toValue(1n),
                                                                                                                                alignment: _descriptor_28.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Caller is not the treasury admin');
    return [];
  }
  async _requireAuditorOrAdmin_0(context, partialProofData) {
    const sk_0 = this._localSecretKey_0(context, partialProofData);
    const isAuditor_0 = this._equal_2(this._deriveAuditorKey_0(sk_0,
                                                               _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                         partialProofData,
                                                                                                                         [
                                                                                                                          { dup: { n: 0 } },
                                                                                                                          { idx: { cached: false,
                                                                                                                                   pushPath: false,
                                                                                                                                   path: [
                                                                                                                                          { tag: 'value',
                                                                                                                                            value: { value: _descriptor_28.toValue(0n),
                                                                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                                                                          { popeq: { cached: false,
                                                                                                                                     result: undefined } }]).value)),
                                      _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                partialProofData,
                                                                                                [
                                                                                                 { dup: { n: 0 } },
                                                                                                 { idx: { cached: false,
                                                                                                          pushPath: false,
                                                                                                          path: [
                                                                                                                 { tag: 'value',
                                                                                                                   value: { value: _descriptor_28.toValue(2n),
                                                                                                                            alignment: _descriptor_28.alignment() } }] } },
                                                                                                 { popeq: { cached: false,
                                                                                                            result: undefined } }]).value));
    const isAdmin_0 = this._equal_3(this._deriveAdminKey_0(sk_0,
                                                           _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                     partialProofData,
                                                                                                                     [
                                                                                                                      { dup: { n: 0 } },
                                                                                                                      { idx: { cached: false,
                                                                                                                               pushPath: false,
                                                                                                                               path: [
                                                                                                                                      { tag: 'value',
                                                                                                                                        value: { value: _descriptor_28.toValue(0n),
                                                                                                                                                 alignment: _descriptor_28.alignment() } }] } },
                                                                                                                      { popeq: { cached: false,
                                                                                                                                 result: undefined } }]).value)),
                                    _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                              partialProofData,
                                                                                              [
                                                                                               { dup: { n: 0 } },
                                                                                               { idx: { cached: false,
                                                                                                        pushPath: false,
                                                                                                        path: [
                                                                                                               { tag: 'value',
                                                                                                                 value: { value: _descriptor_28.toValue(1n),
                                                                                                                          alignment: _descriptor_28.alignment() } }] } },
                                                                                               { popeq: { cached: false,
                                                                                                          result: undefined } }]).value));
    __compactRuntime.assert(isAuditor_0 || isAdmin_0,
                            'Caller is not authorized to audit payroll');
    return [];
  }
  async _rotateAdmin_0(context, partialProofData, newAdminKey_0) {
    await this._requireTreasuryAdmin_0(context, partialProofData);
    const nextAdmin_0 = newAdminKey_0;
    __compactRuntime.assert(!this._equal_4(nextAdmin_0, new Uint8Array(32)),
                            'New admin key cannot be zero');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(1n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(nextAdmin_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  async _setComplianceAuditor_0(context, partialProofData, newAuditorKey_0) {
    await this._requireTreasuryAdmin_0(context, partialProofData);
    const nextAuditor_0 = newAuditorKey_0;
    __compactRuntime.assert(!this._equal_5(nextAuditor_0, new Uint8Array(32)),
                            'Auditor key cannot be zero');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(2n),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(nextAuditor_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  async _createPayrollRun_0(context,
                            partialProofData,
                            budgetCap_0,
                            minAllocation_0,
                            maxAllocation_0,
                            expectedHeadcount_0)
  {
    await this._requireTreasuryAdmin_0(context, partialProofData);
    const pubBudget_0 = budgetCap_0;
    const pubMin_0 = minAllocation_0;
    const pubMax_0 = maxAllocation_0;
    const pubHeadcount_0 = expectedHeadcount_0;
    __compactRuntime.assert(pubBudget_0 > 0n, 'Budget cap must be positive');
    __compactRuntime.assert(pubMin_0 > 0n, 'Minimum allocation must be positive');
    __compactRuntime.assert(pubMin_0 <= pubMax_0,
                            'Minimum allocation cannot exceed maximum');
    __compactRuntime.assert(pubMax_0 <= pubBudget_0,
                            'Maximum allocation cannot exceed budget cap');
    __compactRuntime.assert(pubHeadcount_0 > 0n && pubHeadcount_0 <= 1024n,
                            'Expected headcount must be between 1 and 1024');
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(3n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_2.toValue(tmp_0),
                                                                alignment: _descriptor_2.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    const runId_0 = ((t1) => {
                      if (t1 > 4294967295n) {
                        throw new __compactRuntime.CompactError('veilpay.compact line 270 char 17: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                      }
                      return t1;
                    })(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_28.toValue(3n),
                                                                                                             alignment: _descriptor_28.alignment() } }] } },
                                                                                  { popeq: { cached: true,
                                                                                             result: undefined } }]).value));
    const initialSalt_0 = this._nextRunSalt_0(context, partialProofData, runId_0);
    __compactRuntime.assert(!this._equal_6(initialSalt_0, new Uint8Array(32)),
                            'Initial accumulator salt must be non-zero');
    const tmp_1 = { budgetCap: pubBudget_0,
                    minAllocation: pubMin_0,
                    maxAllocation: pubMax_0,
                    expectedHeadcount: pubHeadcount_0,
                    issuedCount: 0n,
                    claimedCount: 0n,
                    status: 0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(4n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(runId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_2 = this._computeTotalCommitment_0(0n, initialSalt_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(5n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(runId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_2),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return runId_0;
  }
  async _issueVoucher_0(context, partialProofData, runId_0) {
    await this._requireTreasuryAdmin_0(context, partialProofData);
    const rid_0 = runId_0;
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_28.toValue(4n),
                                                                                                                  alignment: _descriptor_28.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Payroll run does not exist');
    const run_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_28.toValue(4n),
                                                                                                        alignment: _descriptor_28.alignment() } }] } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_0.toValue(rid_0),
                                                                                                        alignment: _descriptor_0.alignment() } }] } },
                                                                             { popeq: { cached: false,
                                                                                        result: undefined } }]).value);
    __compactRuntime.assert(run_0.status === 0,
                            'Payroll run is no longer open for issuance');
    let t_0;
    __compactRuntime.assert((t_0 = run_0.issuedCount,
                             t_0 < run_0.expectedHeadcount),
                            'Payroll run headcount limit reached');
    const __compact_pattern_tmp5_0 = this._getAccumulatorOpening_0(context,
                                                                   partialProofData,
                                                                   rid_0);
    const prevTotal_0 = __compact_pattern_tmp5_0[0];
    const prevSalt_0 = __compact_pattern_tmp5_0[1];
    const newSalt_0 = this._nextRunSalt_0(context, partialProofData, rid_0);
    const __compact_pattern_tmp4_0 = this._getIssueVoucherSecret_0(context,
                                                                   partialProofData);
    const recipientKey_0 = __compact_pattern_tmp4_0[0];
    const salaryAmount_0 = __compact_pattern_tmp4_0[1];
    const voucherSalt_0 = __compact_pattern_tmp4_0[2];
    __compactRuntime.assert(!this._equal_7(recipientKey_0, new Uint8Array(32)),
                            'Recipient public key cannot be zero');
    __compactRuntime.assert(!this._equal_8(voucherSalt_0, new Uint8Array(32)),
                            'Voucher salt must be non-zero');
    __compactRuntime.assert(!this._equal_9(newSalt_0, new Uint8Array(32)),
                            'New accumulator salt must be non-zero');
    __compactRuntime.assert(!this._equal_10(newSalt_0, prevSalt_0),
                            'New accumulator salt must differ from previous salt');
    __compactRuntime.assert(this._equal_11(_descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_28.toValue(5n),
                                                                                                                                 alignment: _descriptor_28.alignment() } }] } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_0.toValue(rid_0),
                                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value),
                                           this._computeTotalCommitment_0(prevTotal_0,
                                                                          prevSalt_0)),
                            'Accumulator witness does not match committed running total');
    __compactRuntime.assert(salaryAmount_0 >= run_0.minAllocation,
                            'Salary is below payroll run minimum band');
    __compactRuntime.assert(salaryAmount_0 <= run_0.maxAllocation,
                            'Salary exceeds payroll run maximum band');
    __compactRuntime.assert(prevTotal_0 <= run_0.budgetCap,
                            'Committed total already exceeds budget cap');
    let t_1;
    __compactRuntime.assert(salaryAmount_0
                            <=
                            (t_1 = run_0.budgetCap,
                             (__compactRuntime.assert(t_1 >= prevTotal_0,
                                                      'result of subtraction would be negative'),
                              t_1 - prevTotal_0)),
                            'Issuing voucher would exceed payroll run budget cap');
    const newTotal_0 = ((t1) => {
                         if (t1 > 18446744073709551615n) {
                           throw new __compactRuntime.CompactError('veilpay.compact line 327 char 20: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                         }
                         return t1;
                       })(prevTotal_0 + salaryAmount_0);
    const tmp_0 = this._computeTotalCommitment_0(newTotal_0, newSalt_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(5n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const commitment_0 = this._computeVoucherCommitment_0(rid_0,
                                                          recipientKey_0,
                                                          salaryAmount_0,
                                                          voucherSalt_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(7n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(0n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(1n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.leafHash(
                                                                                              { value: _descriptor_6.toValue(commitment_0),
                                                                                                alignment: _descriptor_6.alignment() }
                                                                                            )).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(1n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { addi: { immediate: 1 } },
                                       { ins: { cached: true, n: 1 } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(2n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(0n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       'root',
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_1 = { budgetCap: run_0.budgetCap,
                    minAllocation: run_0.minAllocation,
                    maxAllocation: run_0.maxAllocation,
                    expectedHeadcount: run_0.expectedHeadcount,
                    issuedCount:
                      ((t1) => {
                        if (t1 > 65535n) {
                          throw new __compactRuntime.CompactError('veilpay.compact line 341 char 20: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                        }
                        return t1;
                      })(run_0.issuedCount + 1n),
                    claimedCount: run_0.claimedCount,
                    status: run_0.status };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(4n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  async _claimVoucher_0(context, partialProofData, runId_0) {
    const rid_0 = runId_0;
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_28.toValue(4n),
                                                                                                                  alignment: _descriptor_28.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Payroll run does not exist');
    const run_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_28.toValue(4n),
                                                                                                        alignment: _descriptor_28.alignment() } }] } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_0.toValue(rid_0),
                                                                                                        alignment: _descriptor_0.alignment() } }] } },
                                                                             { popeq: { cached: false,
                                                                                        result: undefined } }]).value);
    let t_0;
    __compactRuntime.assert((t_0 = run_0.claimedCount, t_0 < run_0.issuedCount),
                            'All issued vouchers for this run have been claimed');
    const sk_0 = this._localSecretKey_0(context, partialProofData);
    const __compact_pattern_tmp2_0 = this._getClaimVoucherSecret_0(context,
                                                                   partialProofData);
    const salaryAmount_0 = __compact_pattern_tmp2_0[0];
    const voucherSalt_0 = __compact_pattern_tmp2_0[1];
    const instance_0 = _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 2 } },
                                                                                   { idx: { cached: true,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_28.toValue(0n),
                                                                                                              alignment: _descriptor_28.alignment() } }] } },
                                                                                   { popeq: { cached: true,
                                                                                              result: undefined } }]).value).bytes;
    const employeeKey_0 = this._deriveEmployeeKey_0(sk_0, instance_0);
    const commitment_0 = this._computeVoucherCommitment_0(rid_0,
                                                          employeeKey_0,
                                                          salaryAmount_0,
                                                          voucherSalt_0);
    const path_0 = this._getVoucherPath_0(context,
                                          partialProofData,
                                          commitment_0);
    __compactRuntime.assert(this._equal_12(path_0.leaf, commitment_0),
                            'Merkle path leaf does not match voucher commitment');
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._merkleTreePathRoot_0(path_0),
                             _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_28.toValue(7n),
                                                                                                                   alignment: _descriptor_28.alignment() } }] } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_28.toValue(2n),
                                                                                                                   alignment: _descriptor_28.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_8.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'Voucher commitment is not present in the payroll Merkle tree');
    const nullifier_0 = this._deriveNullifier_0(sk_0,
                                                rid_0,
                                                voucherSalt_0,
                                                instance_0);
    __compactRuntime.assert(!_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_28.toValue(8n),
                                                                                                                   alignment: _descriptor_28.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(nullifier_0),
                                                                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'Voucher has already been claimed');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(8n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(nullifier_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = { budgetCap: run_0.budgetCap,
                    minAllocation: run_0.minAllocation,
                    maxAllocation: run_0.maxAllocation,
                    expectedHeadcount: run_0.expectedHeadcount,
                    issuedCount: run_0.issuedCount,
                    claimedCount:
                      ((t1) => {
                        if (t1 > 65535n) {
                          throw new __compactRuntime.CompactError('veilpay.compact line 384 char 21: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                        }
                        return t1;
                      })(run_0.claimedCount + 1n),
                    status: run_0.status };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(4n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  async _proveIncomeThreshold_0(context,
                                partialProofData,
                                runId_0,
                                thresholdAmount_0,
                                verifierTag_0)
  {
    const rid_0 = runId_0;
    const threshold_0 = thresholdAmount_0;
    const vTag_0 = verifierTag_0;
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_28.toValue(4n),
                                                                                                                  alignment: _descriptor_28.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Payroll run does not exist');
    __compactRuntime.assert(threshold_0 > 0n, 'Threshold must be positive');
    __compactRuntime.assert(!this._equal_13(vTag_0, new Uint8Array(32)),
                            'Verifier tag cannot be empty');
    const sk_0 = this._localSecretKey_0(context, partialProofData);
    const __compact_pattern_tmp3_0 = this._getClaimVoucherSecret_0(context,
                                                                   partialProofData);
    const salaryAmount_0 = __compact_pattern_tmp3_0[0];
    const voucherSalt_0 = __compact_pattern_tmp3_0[1];
    const instance_0 = _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 2 } },
                                                                                   { idx: { cached: true,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_28.toValue(0n),
                                                                                                              alignment: _descriptor_28.alignment() } }] } },
                                                                                   { popeq: { cached: true,
                                                                                              result: undefined } }]).value).bytes;
    const employeeKey_0 = this._deriveEmployeeKey_0(sk_0, instance_0);
    const commitment_0 = this._computeVoucherCommitment_0(rid_0,
                                                          employeeKey_0,
                                                          salaryAmount_0,
                                                          voucherSalt_0);
    const path_0 = this._getVoucherPath_0(context,
                                          partialProofData,
                                          commitment_0);
    __compactRuntime.assert(this._equal_14(path_0.leaf, commitment_0),
                            'Merkle path leaf does not match voucher commitment');
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._merkleTreePathRoot_0(path_0),
                             _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_28.toValue(7n),
                                                                                                                   alignment: _descriptor_28.alignment() } }] } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_28.toValue(2n),
                                                                                                                   alignment: _descriptor_28.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_8.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'Voucher commitment is not present in the payroll Merkle tree');
    __compactRuntime.assert(salaryAmount_0 >= threshold_0,
                            'Verified salary is below the requested income threshold');
    const attestationId_0 = this._deriveAttestationId_0(employeeKey_0,
                                                        rid_0,
                                                        vTag_0,
                                                        threshold_0,
                                                        instance_0);
    const tmp_1 = { runId: rid_0,
                    thresholdAmount: threshold_0,
                    verifierTag: vTag_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(9n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(attestationId_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(tmp_1),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return attestationId_0;
  }
  async _finalizeRun_0(context, partialProofData, runId_0) {
    await this._requireTreasuryAdmin_0(context, partialProofData);
    const rid_0 = runId_0;
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_28.toValue(4n),
                                                                                                                  alignment: _descriptor_28.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Payroll run does not exist');
    const run_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_28.toValue(4n),
                                                                                                        alignment: _descriptor_28.alignment() } }] } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_0.toValue(rid_0),
                                                                                                        alignment: _descriptor_0.alignment() } }] } },
                                                                             { popeq: { cached: false,
                                                                                        result: undefined } }]).value);
    __compactRuntime.assert(run_0.status === 0,
                            'Payroll run is already finalized');
    let t_0;
    __compactRuntime.assert((t_0 = run_0.issuedCount, t_0 > 0n),
                            'Cannot finalize a payroll run with zero issued vouchers');
    const tmp_0 = { budgetCap: run_0.budgetCap,
                    minAllocation: run_0.minAllocation,
                    maxAllocation: run_0.maxAllocation,
                    expectedHeadcount: run_0.expectedHeadcount,
                    issuedCount: run_0.issuedCount,
                    claimedCount: run_0.claimedCount,
                    status: 1 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(4n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  async _discloseRunTotal_0(context, partialProofData, runId_0) {
    await this._requireAuditorOrAdmin_0(context, partialProofData);
    const rid_0 = runId_0;
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_28.toValue(4n),
                                                                                                                  alignment: _descriptor_28.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Payroll run does not exist');
    const run_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_28.toValue(4n),
                                                                                                        alignment: _descriptor_28.alignment() } }] } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_0.toValue(rid_0),
                                                                                                        alignment: _descriptor_0.alignment() } }] } },
                                                                             { popeq: { cached: false,
                                                                                        result: undefined } }]).value);
    __compactRuntime.assert(run_0.status === 1,
                            'Payroll run must be finalized before aggregate audit disclosure');
    const __compact_pattern_tmp1_0 = this._getAccumulatorOpening_0(context,
                                                                   partialProofData,
                                                                   rid_0);
    const finalTotal_0 = __compact_pattern_tmp1_0[0];
    const finalSalt_0 = __compact_pattern_tmp1_0[1];
    __compactRuntime.assert(this._equal_15(_descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_28.toValue(5n),
                                                                                                                                 alignment: _descriptor_28.alignment() } }] } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_0.toValue(rid_0),
                                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value),
                                           this._computeTotalCommitment_0(finalTotal_0,
                                                                          finalSalt_0)),
                            'Audit opening does not match committed running total');
    __compactRuntime.assert(finalTotal_0 <= run_0.budgetCap,
                            'Audited total exceeds budget cap');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(6n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(finalTotal_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { budgetCap: run_0.budgetCap,
                    minAllocation: run_0.minAllocation,
                    maxAllocation: run_0.maxAllocation,
                    expectedHeadcount: run_0.expectedHeadcount,
                    issuedCount: run_0.issuedCount,
                    claimedCount: run_0.claimedCount,
                    status: 2 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_28.toValue(4n),
                                                                  alignment: _descriptor_28.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(rid_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_0(f, x, a0) {
    for (let i = 0; i < 10; i++) { x = f(x, a0[i]); }
    return x;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_10(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_11(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_12(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_14(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_15(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    callContext: { currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()), currentGasCost: __compactRuntime.emptyRunningCost() },
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get organizationId() {
      return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_28.toValue(0n),
                                                                                                   alignment: _descriptor_28.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get treasuryAdmin() {
      return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_28.toValue(1n),
                                                                                                   alignment: _descriptor_28.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get complianceAuditor() {
      return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_28.toValue(2n),
                                                                                                   alignment: _descriptor_28.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get runCount() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_28.toValue(3n),
                                                                                                   alignment: _descriptor_28.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    payrollRuns: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(4n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(4n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'veilpay.compact line 96 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(4n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'veilpay.compact line 96 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(4n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[4];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_4.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    runningTotalCommitments: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(5n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(5n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'veilpay.compact line 99 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(5n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'veilpay.compact line 99 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(5n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    auditedTotals: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(6n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(6n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'veilpay.compact line 102 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(6n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'veilpay.compact line 102 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(6n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[6];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    voucherTree: {
      isFull(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isFull: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(7n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(1n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(1024n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'lt',
                                                                          'neg',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      checkRoot(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`checkRoot: expected 1 argument, received ${args_0.length}`);
        }
        const rt_0 = args_0[0];
        if (!(typeof(rt_0) === 'object' && typeof(rt_0.field) === 'bigint' && rt_0.field >= 0 && rt_0.field <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('checkRoot',
                                     'argument 1',
                                     'veilpay.compact line 106 char 1',
                                     'struct MerkleTreeDigest<field: Field>',
                                     rt_0)
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(7n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(2n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(rt_0),
                                                                                                                                 alignment: _descriptor_8.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      root(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`root: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[7];
        return ((result) => result             ? __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(result)             : undefined)(self_0.asArray()[0].asBoundedMerkleTree().rehash().root()?.value);
      },
      firstFree(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`first_free: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[7];
        return __compactRuntime.CompactTypeField.fromValue(self_0.asArray()[1].asCell().value);
      },
      pathForLeaf(...args_0) {
        if (args_0.length !== 2) {
          throw new __compactRuntime.CompactError(`path_for_leaf: expected 2 arguments, received ${args_0.length}`);
        }
        const index_0 = args_0[0];
        const leaf_0 = args_0[1];
        if (!(typeof(index_0) === 'bigint' && index_0 >= 0 && index_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 1',
                                     'veilpay.compact line 106 char 1',
                                     'Field',
                                     index_0)
        }
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 2',
                                     'veilpay.compact line 106 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[7];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(10, _descriptor_6).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().pathForLeaf(    index_0,    {      value: _descriptor_6.toValue(leaf_0),      alignment: _descriptor_6.alignment()    }  )?.value);
      },
      findPathForLeaf(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`find_path_for_leaf: expected 1 argument, received ${args_0.length}`);
        }
        const leaf_0 = args_0[0];
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('find_path_for_leaf',
                                     'argument 1',
                                     'veilpay.compact line 106 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[7];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(10, _descriptor_6).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().findPathForLeaf(    {      value: _descriptor_6.toValue(leaf_0),      alignment: _descriptor_6.alignment()    }  )?.value);
      },
      history(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`history: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[7];
        return self_0.asArray()[2].asMap().keys().map(  (elem) => __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    claimedNullifiers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(8n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(8n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'veilpay.compact line 109 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(8n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[8];
        return self_0.asMap().keys().map((elem) => _descriptor_6.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    incomeAttestations: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(9n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(9n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'veilpay.compact line 112 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(9n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(key_0),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'veilpay.compact line 112 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_28.toValue(9n),
                                                                                                     alignment: _descriptor_28.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(key_0),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[9];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_6.fromValue(key.value),      _descriptor_9.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  callContext: { currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress()), currentGasCost: __compactRuntime.emptyRunningCost() }
};
const _dummyContract = new Contract({
  localSecretKey: (...args) => undefined,
  getAccumulatorOpening: (...args) => undefined,
  nextRunSalt: (...args) => undefined,
  getIssueVoucherSecret: (...args) => undefined,
  getClaimVoucherSecret: (...args) => undefined,
  getVoucherPath: (...args) => undefined
});
export const pureCircuits = {
  deriveAdminKey: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveAdminKey: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    const orgId_0 = args_0[1];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('deriveAdminKey',
                                 'argument 1',
                                 'veilpay.compact line 139 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    if (!(orgId_0.buffer instanceof ArrayBuffer && orgId_0.BYTES_PER_ELEMENT === 1 && orgId_0.length === 32)) {
      __compactRuntime.typeError('deriveAdminKey',
                                 'argument 2',
                                 'veilpay.compact line 139 char 1',
                                 'Bytes<32>',
                                 orgId_0)
    }
    return _dummyContract._deriveAdminKey_0(sk_0, orgId_0);
  },
  deriveAuditorKey: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveAuditorKey: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    const orgId_0 = args_0[1];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('deriveAuditorKey',
                                 'argument 1',
                                 'veilpay.compact line 143 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    if (!(orgId_0.buffer instanceof ArrayBuffer && orgId_0.BYTES_PER_ELEMENT === 1 && orgId_0.length === 32)) {
      __compactRuntime.typeError('deriveAuditorKey',
                                 'argument 2',
                                 'veilpay.compact line 143 char 1',
                                 'Bytes<32>',
                                 orgId_0)
    }
    return _dummyContract._deriveAuditorKey_0(sk_0, orgId_0);
  },
  deriveEmployeeKey: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveEmployeeKey: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    const instance_0 = args_0[1];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('deriveEmployeeKey',
                                 'argument 1',
                                 'veilpay.compact line 149 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    if (!(instance_0.buffer instanceof ArrayBuffer && instance_0.BYTES_PER_ELEMENT === 1 && instance_0.length === 32)) {
      __compactRuntime.typeError('deriveEmployeeKey',
                                 'argument 2',
                                 'veilpay.compact line 149 char 1',
                                 'Bytes<32>',
                                 instance_0)
    }
    return _dummyContract._deriveEmployeeKey_0(sk_0, instance_0);
  },
  computeTotalCommitment: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`computeTotalCommitment: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const total_0 = args_0[0];
    const salt_0 = args_0[1];
    if (!(typeof(total_0) === 'bigint' && total_0 >= 0n && total_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('computeTotalCommitment',
                                 'argument 1',
                                 'veilpay.compact line 153 char 1',
                                 'Uint<0..18446744073709551616>',
                                 total_0)
    }
    if (!(salt_0.buffer instanceof ArrayBuffer && salt_0.BYTES_PER_ELEMENT === 1 && salt_0.length === 32)) {
      __compactRuntime.typeError('computeTotalCommitment',
                                 'argument 2',
                                 'veilpay.compact line 153 char 1',
                                 'Bytes<32>',
                                 salt_0)
    }
    return _dummyContract._computeTotalCommitment_0(total_0, salt_0);
  },
  computeVoucherCommitment: (...args_0) => {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`computeVoucherCommitment: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const runId_0 = args_0[0];
    const recipientKey_0 = args_0[1];
    const amount_0 = args_0[2];
    const salt_0 = args_0[3];
    if (!(typeof(runId_0) === 'bigint' && runId_0 >= 0n && runId_0 <= 4294967295n)) {
      __compactRuntime.typeError('computeVoucherCommitment',
                                 'argument 1',
                                 'veilpay.compact line 157 char 1',
                                 'Uint<0..4294967296>',
                                 runId_0)
    }
    if (!(recipientKey_0.buffer instanceof ArrayBuffer && recipientKey_0.BYTES_PER_ELEMENT === 1 && recipientKey_0.length === 32)) {
      __compactRuntime.typeError('computeVoucherCommitment',
                                 'argument 2',
                                 'veilpay.compact line 157 char 1',
                                 'Bytes<32>',
                                 recipientKey_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('computeVoucherCommitment',
                                 'argument 3',
                                 'veilpay.compact line 157 char 1',
                                 'Uint<0..18446744073709551616>',
                                 amount_0)
    }
    if (!(salt_0.buffer instanceof ArrayBuffer && salt_0.BYTES_PER_ELEMENT === 1 && salt_0.length === 32)) {
      __compactRuntime.typeError('computeVoucherCommitment',
                                 'argument 4',
                                 'veilpay.compact line 157 char 1',
                                 'Bytes<32>',
                                 salt_0)
    }
    return _dummyContract._computeVoucherCommitment_0(runId_0,
                                                      recipientKey_0,
                                                      amount_0,
                                                      salt_0);
  },
  deriveNullifier: (...args_0) => {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`deriveNullifier: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    const runId_0 = args_0[1];
    const salt_0 = args_0[2];
    const instance_0 = args_0[3];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('deriveNullifier',
                                 'argument 1',
                                 'veilpay.compact line 169 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    if (!(typeof(runId_0) === 'bigint' && runId_0 >= 0n && runId_0 <= 4294967295n)) {
      __compactRuntime.typeError('deriveNullifier',
                                 'argument 2',
                                 'veilpay.compact line 169 char 1',
                                 'Uint<0..4294967296>',
                                 runId_0)
    }
    if (!(salt_0.buffer instanceof ArrayBuffer && salt_0.BYTES_PER_ELEMENT === 1 && salt_0.length === 32)) {
      __compactRuntime.typeError('deriveNullifier',
                                 'argument 3',
                                 'veilpay.compact line 169 char 1',
                                 'Bytes<32>',
                                 salt_0)
    }
    if (!(instance_0.buffer instanceof ArrayBuffer && instance_0.BYTES_PER_ELEMENT === 1 && instance_0.length === 32)) {
      __compactRuntime.typeError('deriveNullifier',
                                 'argument 4',
                                 'veilpay.compact line 169 char 1',
                                 'Bytes<32>',
                                 instance_0)
    }
    return _dummyContract._deriveNullifier_0(sk_0, runId_0, salt_0, instance_0);
  },
  deriveAttestationId: (...args_0) => {
    if (args_0.length !== 5) {
      throw new __compactRuntime.CompactError(`deriveAttestationId: expected 5 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const employeeKey_0 = args_0[0];
    const runId_0 = args_0[1];
    const verifierTag_0 = args_0[2];
    const thresholdAmount_0 = args_0[3];
    const instance_0 = args_0[4];
    if (!(employeeKey_0.buffer instanceof ArrayBuffer && employeeKey_0.BYTES_PER_ELEMENT === 1 && employeeKey_0.length === 32)) {
      __compactRuntime.typeError('deriveAttestationId',
                                 'argument 1',
                                 'veilpay.compact line 186 char 1',
                                 'Bytes<32>',
                                 employeeKey_0)
    }
    if (!(typeof(runId_0) === 'bigint' && runId_0 >= 0n && runId_0 <= 4294967295n)) {
      __compactRuntime.typeError('deriveAttestationId',
                                 'argument 2',
                                 'veilpay.compact line 186 char 1',
                                 'Uint<0..4294967296>',
                                 runId_0)
    }
    if (!(verifierTag_0.buffer instanceof ArrayBuffer && verifierTag_0.BYTES_PER_ELEMENT === 1 && verifierTag_0.length === 32)) {
      __compactRuntime.typeError('deriveAttestationId',
                                 'argument 3',
                                 'veilpay.compact line 186 char 1',
                                 'Bytes<32>',
                                 verifierTag_0)
    }
    if (!(typeof(thresholdAmount_0) === 'bigint' && thresholdAmount_0 >= 0n && thresholdAmount_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('deriveAttestationId',
                                 'argument 4',
                                 'veilpay.compact line 186 char 1',
                                 'Uint<0..18446744073709551616>',
                                 thresholdAmount_0)
    }
    if (!(instance_0.buffer instanceof ArrayBuffer && instance_0.BYTES_PER_ELEMENT === 1 && instance_0.length === 32)) {
      __compactRuntime.typeError('deriveAttestationId',
                                 'argument 5',
                                 'veilpay.compact line 186 char 1',
                                 'Bytes<32>',
                                 instance_0)
    }
    return _dummyContract._deriveAttestationId_0(employeeKey_0,
                                                 runId_0,
                                                 verifierTag_0,
                                                 thresholdAmount_0,
                                                 instance_0);
  }
};
export const expectedVk = {
  'claimVoucher': '1dca068ed7385b5fca3be043e2220347650e760f437c9f26157ea0a13813e1f5',
  'createPayrollRun': '341cd3b675c5746466454f155d765f99f911c28e89c7c50187497650a5084743',
  'discloseRunTotal': '7d828959415665c13b176d860539612896ef0b6f8e4b74fb7c64a6ee04d1dc8f',
  'finalizeRun': '5a81babab2fe6bd98eaf9f8c5df5a03193eacdbfbb20fadeae8f45127e1750dc',
  'issueVoucher': '8c525ae4691e46bf7c8a2733ca0f4b2c8f405affe5de320f27762e6d025989d7',
  'proveIncomeThreshold': '9726c9204d90b553cc8649feaadaef1c45821438fd3c4aac4f600920418dc5ab',
  'rotateAdmin': '64b444aaf787867c7428e3389d99e41b665b49d5d46de2ba7040ca400131a5d4',
  'setComplianceAuditor': '9336b8b53bd2b3466bb2ff5e8246619a4602f06b0925a3afdb68c4146fd76b52',
};

export const circuitSignatures = {
  'deriveAdminKey': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'deriveAuditorKey': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'deriveEmployeeKey': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'computeTotalCommitment': {pure: true, provable: false, argumentTypes: [{tag: 'Uint', maxval: '18446744073709551615'}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'computeVoucherCommitment': {pure: true, provable: false, argumentTypes: [{tag: 'Uint', maxval: '4294967295'}, {tag: 'Bytes', length: 32}, {tag: 'Uint', maxval: '18446744073709551615'}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'deriveNullifier': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Uint', maxval: '4294967295'}, {tag: 'Bytes', length: 32}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'deriveAttestationId': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Uint', maxval: '4294967295'}, {tag: 'Bytes', length: 32}, {tag: 'Uint', maxval: '18446744073709551615'}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'rotateAdmin': {pure: false, provable: true, argumentTypes: [{tag: 'Alias', name: 'AdminPublicKey', type: {tag: 'Bytes', length: 32}}], resultType: {tag: 'Tuple', types: []}},
  'setComplianceAuditor': {pure: false, provable: true, argumentTypes: [{tag: 'Alias', name: 'AdminPublicKey', type: {tag: 'Bytes', length: 32}}], resultType: {tag: 'Tuple', types: []}},
  'createPayrollRun': {pure: false, provable: true, argumentTypes: [{tag: 'Uint', maxval: '18446744073709551615'}, {tag: 'Uint', maxval: '18446744073709551615'}, {tag: 'Uint', maxval: '18446744073709551615'}, {tag: 'Uint', maxval: '65535'}], resultType: {tag: 'Uint', maxval: '4294967295'}},
  'issueVoucher': {pure: false, provable: true, argumentTypes: [{tag: 'Uint', maxval: '4294967295'}], resultType: {tag: 'Tuple', types: []}},
  'claimVoucher': {pure: false, provable: true, argumentTypes: [{tag: 'Uint', maxval: '4294967295'}], resultType: {tag: 'Tuple', types: []}},
  'proveIncomeThreshold': {pure: false, provable: true, argumentTypes: [{tag: 'Uint', maxval: '4294967295'}, {tag: 'Uint', maxval: '18446744073709551615'}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Alias', name: 'AttestationId', type: {tag: 'Bytes', length: 32}}},
  'finalizeRun': {pure: false, provable: true, argumentTypes: [{tag: 'Uint', maxval: '4294967295'}], resultType: {tag: 'Tuple', types: []}},
  'discloseRunTotal': {pure: false, provable: true, argumentTypes: [{tag: 'Uint', maxval: '4294967295'}], resultType: {tag: 'Tuple', types: []}},
};

export const declaredInterfaces = {};

//# sourceMappingURL=index.js.map
