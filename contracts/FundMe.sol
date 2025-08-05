//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {PriceConverter} from "./PriceConverter.sol";

contract FundMe{
    using PriceConverter for uint256;
    uint256 public minimumUsd = 5e18;

    address[] public funders;
    mapping(address funders => uint256 amountFunded) public addressToAmountFunded;

    address public owner;
    constructor(){
        owner = msg.sender; //msg.sender is basically the deployer of the contract
    }
    
    function fund() public payable{
        //Allow users to send money
        //have a minimum amount of send 
        require(msg.value.getConversionRate() >= minimumUsd, "Too low"); //1e18 = 1ETH = 1^9 GWEI= 10^18 Wei 
        //msg.value receives value in wei 

        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = addressToAmountFunded[msg.sender] + msg.value;

    }   

    function withdraw() public onlyOwner{
        
        //for(starting index, ending index, step amount)
        for(uint256 i = 0; i < funders.length; i++){
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0); //resetting the array

        //actually withdrawing the funds:
        //1. transfer
        //payable(msg.sender).transfer(address(this).balance);

        //2. send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send Failed");

        //3. call
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call Failed");

    }

    modifier onlyOwner(){ //modifies a function
        require(msg.sender == owner, "sender not the owner");
        _; //means the rest of the code will be executed if the owner is the sender of this message
    }


  
}