// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//0x01eE664a86235D962A2b8Ae7dE01fEC2c693c549



contract Token {
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowance;

    uint256 public totalSupply = 1000000 * 10**18;
    string public name = "LUNA CZ TOKEN";
    string public symbol = "LUNA CZ";
    uint256 public decimals = 18;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return balances[owner];
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(
            balanceOf(msg.sender) >= value,
            "(balance too low)"
        );
        balances[to] += value;
        balances[msg.sender] -= value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool) {
        require(
            balanceOf(from) >= value,
            "(balance too low)"
        );
        require(
            allowance[from][msg.sender] >= value,
            "(allowance too low)"
        );
        balances[to] += value;
        balances[from] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
}
