var Transact = artifacts.require("./Transact.sol");

module.exports = function(deployer) {
  deployer.deploy(Transact);
};