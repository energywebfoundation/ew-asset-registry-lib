pragma solidity ^0.5.0;	

 /// @title this interface should be used by the MarketContractLookup-Contract (see origin-contracts)	
interface TradableEntityCreationInterface {	

     function createTradableEntity(uint _assetId, uint _powerInW) external returns (uint);	
}