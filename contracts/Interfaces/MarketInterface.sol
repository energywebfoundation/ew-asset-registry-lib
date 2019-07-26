pragma solidity ^0.5.0;	

 /// @title this interface should be used by the MarketContractLookup-Contract (see origin-contracts)	
interface MarketInterface {	

     function incrementSupplyPower(uint _supplyId, uint _power) external;	
}