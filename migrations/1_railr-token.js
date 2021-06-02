const RailrToken = artifacts.require("RailrToken");

module.exports = function (deployer) {
    deployer.deploy(RailrToken, "0xae705bed6ed13fe943808ec35e0c09b0f213ca58");
};
