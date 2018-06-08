var PublicRecords = artifacts.require("./PublicRecords.sol");
// var Todo = artifacts.require("./Todo.sol");

module.exports = function(deployer) {
  deployer.deploy(PublicRecords);
  // deployer.deploy(Todo);
};
