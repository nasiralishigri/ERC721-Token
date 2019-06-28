const Migrations = artifacts.require("ERC721_Implementation");

module.exports = function(deployer) {
 deployer.deploy(Migrations);
};
