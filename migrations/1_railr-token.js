const RailrToken = artifacts.require("RailrToken");

module.exports = function (deployer) {
    deployer.deploy(
        RailrToken,
        process.env.TREASURY_WALLET,
        process.env.DISTRIBUTION_WALLET,
        process.env.TEAM_WALLET,
    );
};
