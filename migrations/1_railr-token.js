const RailrToken = artifacts.require("RailrToken");

module.exports = function (deployer) {
    deployer.deploy(
        RailrToken,
        process.env.ROUTER_ADDRESS,
        process.env.TREASURY_ADDRESS,
        process.env.DISTRIBUTION_ADDRESS,
        process.env.TEAM_ADDRESS,
        process.env.FIRST_OWNER,
        process.env.SECOND_OWNER,
    );
};
