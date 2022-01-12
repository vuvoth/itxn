const { getProgram } = require('@algo-builder/runtime');
const { Runtime, AccountStore } = require('@algo-builder/runtime');
const { types } = require('@algo-builder/web');
const { assert } = require('chai');

const minBalance = BigInt(1e6);
const masterBalance = BigInt(10e6);
const amount = BigInt(1e6);

describe('Sample Test', function () {
  let master;

  let runtime;

  this.beforeEach(async function () {
    master = new AccountStore(masterBalance);
    runtime = new Runtime([master]);
  });

  function syncAccounts () {
    master = runtime.getAccount(master.address);
  }

  it('Deploy application....', () => {
    const deployReceipt = runtime.deployApp(
        'approval-asset-tx.py',
        'clear.teal',
        {
           sender: master.account,
           localInts: 1,
           localBytes: 1,
           globalInts: 1,
           globalBytes: 1
        },
        {}
     );

     console.log(deployReceipt);
  });

});
