// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter{
    function getPrice() internal view returns (uint256){
        //Address (0x694AA1769357215DE4FAC081bf1f309aDC325306)
        //ABI
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) = priceFeed.latestRoundData();
        return uint256(answer) * 1e10; //answer returns in 8 decimal places
    }

    function getConversionRate(uint256 ethAmount) internal view returns(uint256){
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethAmount*ethPrice) / 1e18;  // (ethAmount*ethPrice) is in 10^36 decimal palces 
        return ethAmountInUsd;

    }
    function getVeriosn() internal view returns(uint256){
        return AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306).version();
    }
}