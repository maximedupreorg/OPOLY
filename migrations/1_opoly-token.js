const OpolyToken = artifacts.require("OpolyToken");

module.exports = function (deployer) {
    deployer.deploy(
        OpolyToken,
        process.env.ROUTER_ADDRESS,
        process.env.TREASURY_ADDRESS,
        process.env.DISTRIBUTION_ADDRESS,
        process.env.TEAM_ADDRESS,
        process.env.FIRST_OWNER,
        process.env.SECOND_OWNER,
    );
};
