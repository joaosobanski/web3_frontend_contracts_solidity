// SPDX-License-Identifier: GPL-3.0
// contract 0x9E6221329396DD4d7f873A3C5980689B17bcE5dF
// token 0x07E104BB45A50F413c172e5e1F4c0961e3B0706C
    pragma solidity ^0.8.0;

    import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
    import "../Token721.sol";
//1000000000000000000
    contract Sorteio{
        
        ERC20 private ERC20interface;
        ERC721 private ERC721interface;

        uint256 ticketValue = 100000000000000000000;

        address private owner;

        address public sorteado;
        
        address public tokenAdress; 
        address public nftAddress; 
        
        mapping(address => uint256) public userTokenBalance;
        
        address[] private _address;
 
        constructor (){
            owner = msg.sender;
            //tokenAdress = 0x247BD9e325E9ba4A1B92087A88D825ccfD9380A1; // rinkeby
            //tokenAdress = 0x07E104BB45A50F413c172e5e1F4c0961e3B0706C; // rinkeby
            tokenAdress = 0xD253dB6Ecb4EA9d99D26a159cDe4f6Cbb85B3690; 
            ERC20interface = ERC20(tokenAdress); 
        }
//
//1000000000000000000 = 1
//1000000000000000000000
        function contractBalance() public view returns (uint _amount){
            return ERC20interface.balanceOf(address(this));
        }
        
        function senderBalance() public view returns (uint){
            return ERC20interface.balanceOf(msg.sender);
        }
        
        function deposit (uint256 _amount) external  {
            require(userTokenBalance[msg.sender] == 0 , "you are already participating");
            require(_amount == ticketValue, "deposit amount is 100 TOKENS");
            address from = msg.sender;
            address to = address(this);

            _address.push(msg.sender);
            ERC20interface.transferFrom(from, to, _amount);
            userTokenBalance[msg.sender] += _amount;
        }


        function withdraw (uint256 _amount) public {  
            ERC20interface.transfer(msg.sender, _amount);
            userTokenBalance[msg.sender] -= _amount;
        } 

        function approveAllowanceToNFT(address _contract) public {
            require(msg.sender == owner , "only owner");
            nftAddress = _contract;
            ERC20interface.approve(_contract, ticketValue);
        }
 
        function getSorteio() public { 
            require(msg.sender == owner , "only owner");
            sorteado = _address[randomize()];
            uint amount_devs = 0;

            for(uint i=0 ; i < _address.length ; i++){
                if(_address[i] != sorteado){
                    ERC20interface.transfer(_address[i], userTokenBalance[_address[i]] - 10);
                    amount_devs = 10;
                    userTokenBalance[_address[i]] -= userTokenBalance[_address[i]];
                }else if(_address[i] == sorteado) {
                    string memory str;
                    NewNFT(nftAddress).mint(sorteado, str, userTokenBalance[sorteado]);
                }
            }

            if(amount_devs > 0){
                ERC20interface.transfer(owner, amount_devs);
            }

            _address = new address[](0);
 
        } 
 
 
        function randomize () private view returns (uint256) 
        { 
            uint256 random = uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, _address)
                )
            );
            uint256 winner = random % _address.length; 
            return winner;
        }


        function allowance() public view returns (uint){
            return ERC20interface.allowance(msg.sender, address(this));
        }
        
        /*
            function transferBack (address payable _to) public payable  {
            _to = msg.sender;
            uint balance = ERC20interface.balanceOf(address(this)); // the balance of this smart contract
            ERC20interface.transferFrom(address(this), _to, balance);
        }*/
        
     
    }


 