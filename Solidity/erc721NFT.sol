// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;
 
import "https://github.com/0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
import "https://github.com/0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 100000000000000000000 = 100

contract NewNFT is NFTokenMetadata, Ownable {
    ERC20 private ERC20interface;

    address public tokenAdress = 0xD253dB6Ecb4EA9d99D26a159cDe4f6Cbb85B3690;
    address public minter;
    uint public nextTokenId;

    mapping(uint256 => uint256) public amountByIdToken; //nft_id address token

    constructor() {
        nftName = "STAR Token";
        nftSymbol = "STAR";
        nextTokenId = 0;
        ERC20interface = ERC20(tokenAdress);
    }

    function addMinter(address _minter)public{
        require(msg.sender == owner, "only owner");
        minter = _minter;
    }

    function mint(address _to, string calldata _uri, uint256 _amount) public {
        require(msg.sender == minter , "only owner");
        nextTokenId++;

        super._mint(_to, nextTokenId);
        super._setTokenUri(nextTokenId, _uri);

        ERC20interface.transferFrom(msg.sender, address(this), _amount);
        amountByIdToken[nextTokenId] = _amount;
    }

    function burn (address _to, uint256 _tokenId) public {
        super._burn(_tokenId);
        ERC20interface.transfer(_to, amountByIdToken[nextTokenId]);
        amountByIdToken[nextTokenId] -= amountByIdToken[nextTokenId];
    }

    function contractBalance() public view returns (uint _amount){
            return ERC20interface.balanceOf(address(this));
    } 
  
  

}