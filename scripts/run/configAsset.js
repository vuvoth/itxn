const { executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/algob/build/runtime");

async function run(runtimeEnv, deployer) {
    const master = deployer.accounts[0];
    const bob = deployer.accounts[1];

    console.log('Config Asset script has started execution!');
    console.log(master);
    console.log(bob);
    const appID = 1;
    const assetID = 3;

    const txParam = {
        type: types.TransactionType.CallApp,
        sign: types.SignType.SecretKey,
        fromAccount: master,
        appID: appID,
        appArgs: ['str:modify_asa'],
        accounts: [master.addr, "KW5MRCMF4ICRW32EQFHJJQXF6O6DIXHD4URTXPD657B6QTQA3LWZSLJEUY"],
        foreignAssets: [assetID],
        payFlags: { totalFee: 1000 }
    }

    await executeTransaction(deployer, txParam);

    console.log('Config Asset script execution has finished!');
}

module.exports = { default: run };
