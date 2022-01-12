const { executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/algob/build/runtime");
const { getApplicationAddress } = require("algosdk");

async function run(runtimeEnv, deployer) {
    const master = deployer.accounts[0];

    console.log('Sample script has started execution!');


    const deployReceipt = await deployer.deployApp(
        'approval-asset-tx.py',
        'clear.teal',
        {
            sender: master,
            localInts: 1,
            localBytes: 1,
            globalInts: 1,
            globalBytes: 1
        },
        {}
    );

    console.log(deployReceipt);

    const appAddress = getApplicationAddress(deployReceipt.appID);

    console.log(appAddress);

    const fundAppParams = {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.SecretKey,
        fromAccount: master,
        toAccountAddr: appAddress,
        amountMicroAlgos: 10e6,
        payFlags: { totalFee: 1000 }
    };

    await executeTransaction(deployer, fundAppParams);

    console.log(master);

    const createASAParams = {
        type: types.TransactionType.DeployASA,
        sign: types.SignType.SecretKey,
        fromAccount: master,
        asaName: "E21",
        asaDef: {
            unitName: "E21",
            total: 10000000,
            decimals: 0,
            manager: appAddress,
        },
        payFlags: { totalFee: 1000 }
    };

    await executeTransaction(deployer, createASAParams);

    console.log('Sample script execution has finished!');
}

module.exports = { default: run };
