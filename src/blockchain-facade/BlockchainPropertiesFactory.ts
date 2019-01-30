import * as EwGeneralLib from 'ew-utils-general-lib';
import * as Winston from 'winston';
import Web3 = require('web3');
import { UserContractLookupJSON, UserContractLookup, UserLogic } from 'ew-user-registry-contracts';
import { AssetContractLookup, AssetConsumingRegistryLogic, AssetProducingRegistryLogic } from 'ew-asset-registry-contracts';

export const createBlockchainProperties = async (
    logger: Winston.Logger,
    web3: Web3, 
    assetContractLookupAddress: string,
): Promise<EwGeneralLib.Configuration.BlockchainProperties> => {

    const assetLookupContractInstance: AssetContractLookup = new AssetContractLookup(
        web3,
        assetContractLookupAddress);
    
    return {
        consumingAssetLogicInstance: new AssetConsumingRegistryLogic(
            web3,
            await assetLookupContractInstance.assetConsumingRegistry(),
        ),
        producingAssetLogicInstance: new AssetProducingRegistryLogic(
            web3, 
            await assetLookupContractInstance.assetProducingRegistry(),
            ),
        userLogicInstance: new UserLogic(web3, await assetLookupContractInstance.userRegistry()),
        
        web3: web3 as any,
    
    };
};