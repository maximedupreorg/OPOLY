const RailrToken = artifacts.require('RailrToken');

module.exports = function (deployer) {
    deployer.deploy(RailrToken);
};
