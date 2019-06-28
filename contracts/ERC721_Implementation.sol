pragma solidity ^0.5.0;
import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
contract ERC721_Implementation is ERC721{
  uint8 price = 200;
  address deployer_owner;
    constructor () public
    {
        deployer_owner = msg.sender;
    }
/**
    * Custom accessor to create a unique token
    */
    function mintUniqueTokenTo(
        address _to,
        uint256 _tokenId
        // string memory  _tokenURI
    ) public
    {

    // require(msg.sender == deployer_owner, "This is only allowed for contract deplloyer");
           super._mint(_to, _tokenId);
        
        
        // super._setTokenURI(_tokenId, _tokenURI);
    }


function transferToken(address _from, address _to , uint256 _tokenId)public { // Token Transfer from others account

    super.transferFrom(_from , _to , _tokenId);
}

function getBalanceOf()public view{ // Get balance of User 
    super.balanceOf(msg.sender);
}
function ownerOfToken(uint _tokenId)public view returns(address) { // Get the Owner of the Token
    return super.ownerOf(_tokenId);
    
}

function testGasLimit()public returns (uint256 gasUsed) // check gas  limit 
{
    uint256 startGas = gasleft();
    return startGas;

}

event checkToken(address addr, uint256 _token);
function noOfTokens()public returns(uint256){

emit checkToken(msg.sender, super.balanceOf(msg.sender));
    return super.balanceOf(msg.sender);
}


function transferFrom(address _from,address _to ,uint256 _tokenId) public{ // transfer Tpken from one account to another account

    return super.transferFrom(_from, _to, _tokenId);

}

function approveTokenTransfer(address _to, uint256 _tokenId)public payable{   // Approve token Transfer to other
     return super.approve(_to, _tokenId);

}



}