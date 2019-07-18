import { GeneralFunctions, SpecialTx, SearchLog, getClientVersion } from './GeneralFunctions';
import Web3 = require('web3');
import AssetConsumingRegistryLogicJSON from '../../build/contracts/AssetConsumingRegistryLogic.json';
import moment from 'moment';

export class AssetConsumingRegistryLogic extends GeneralFunctions {
    web3: Web3;
    buildFile = AssetConsumingRegistryLogicJSON;

    constructor(web3: Web3, address?: string) {
        super(
            address
                ? new web3.eth.Contract(AssetConsumingRegistryLogicJSON.abi, address)
                : new web3.eth.Contract(
                      AssetConsumingRegistryLogicJSON.abi,
                      (AssetConsumingRegistryLogicJSON as any).networks.length > 0
                          ? AssetConsumingRegistryLogicJSON.networks[0]
                          : null
                  )
        );
        this.web3 = web3;
    }

    async getAllLogNewMeterReadEvents(eventFilter?: SearchLog) {
        let filterParams;
        if (eventFilter) {
            filterParams = {
                fromBlock: eventFilter.fromBlock ? eventFilter.fromBlock : 0,
                toBlock: eventFilter.toBlock ? eventFilter.toBlock : 'latest'
            };
            if (eventFilter.topics) {
                filterParams.topics = eventFilter.topics;
            }
        } else {
            filterParams = {
                fromBlock: 0,
                toBlock: 'latest'
            };
        }

        return await this.web3Contract.getPastEvents('LogNewMeterRead', filterParams);
    }

    async getAllLogAssetCreatedEvents(eventFilter?: SearchLog) {
        let filterParams;
        if (eventFilter) {
            filterParams = {
                fromBlock: eventFilter.fromBlock ? eventFilter.fromBlock : 0,
                toBlock: eventFilter.toBlock ? eventFilter.toBlock : 'latest'
            };
            if (eventFilter.topics) {
                filterParams.topics = eventFilter.topics;
            }
        } else {
            filterParams = {
                fromBlock: 0,
                toBlock: 'latest'
            };
        }

        return await this.web3Contract.getPastEvents('LogAssetCreated', filterParams);
    }

    async getAllLogAssetFullyInitializedEvents(eventFilter?: SearchLog) {
        let filterParams;
        if (eventFilter) {
            filterParams = {
                fromBlock: eventFilter.fromBlock ? eventFilter.fromBlock : 0,
                toBlock: eventFilter.toBlock ? eventFilter.toBlock : 'latest'
            };
            if (eventFilter.topics) {
                filterParams.topics = eventFilter.topics;
            }
        } else {
            filterParams = {
                fromBlock: 0,
                toBlock: 'latest'
            };
        }

        return await this.web3Contract.getPastEvents('LogAssetFullyInitialized', filterParams);
    }

    async getAllLogAssetSetActiveEvents(eventFilter?: SearchLog) {
        let filterParams;
        if (eventFilter) {
            filterParams = {
                fromBlock: eventFilter.fromBlock ? eventFilter.fromBlock : 0,
                toBlock: eventFilter.toBlock ? eventFilter.toBlock : 'latest'
            };
            if (eventFilter.topics) {
                filterParams.topics = eventFilter.topics;
            }
        } else {
            filterParams = {
                fromBlock: 0,
                toBlock: 'latest'
            };
        }

        return await this.web3Contract.getPastEvents('LogAssetSetActive', filterParams);
    }

    async getAllLogAssetSetInactiveEvents(eventFilter?: SearchLog) {
        let filterParams;
        if (eventFilter) {
            filterParams = {
                fromBlock: eventFilter.fromBlock ? eventFilter.fromBlock : 0,
                toBlock: eventFilter.toBlock ? eventFilter.toBlock : 'latest'
            };
            if (eventFilter.topics) {
                filterParams.topics = eventFilter.topics;
            }
        } else {
            filterParams = {
                fromBlock: 0,
                toBlock: 'latest'
            };
        }

        return await this.web3Contract.getPastEvents('LogAssetSetInactive', filterParams);
    }

    async getAllLogChangeOwnerEvents(eventFilter?: SearchLog) {
        let filterParams;
        if (eventFilter) {
            filterParams = {
                fromBlock: eventFilter.fromBlock ? eventFilter.fromBlock : 0,
                toBlock: eventFilter.toBlock ? eventFilter.toBlock : 'latest'
            };
            if (eventFilter.topics) {
                filterParams.topics = eventFilter.topics;
            }
        } else {
            filterParams = {
                fromBlock: 0,
                toBlock: 'latest'
            };
        }

        return await this.web3Contract.getPastEvents('LogChangeOwner', filterParams);
    }

    async getAllEvents(eventFilter?: SearchLog) {
        let filterParams;
        if (eventFilter) {
            filterParams = {
                fromBlock: eventFilter.fromBlock ? eventFilter.fromBlock : 0,
                toBlock: eventFilter.toBlock ? eventFilter.toBlock : 'latest',
                topics: eventFilter.topics ? eventFilter.topics : [null]
            };
        } else {
            filterParams = {
                fromBlock: 0,
                toBlock: 'latest',
                topics: [null]
            };
        }

        return await this.web3Contract.getPastEvents('allEvents', filterParams);
    }

    async update(_newLogic: string, txParams?: SpecialTx) {
        const method = this.web3Contract.methods.update(_newLogic);
        const transactionParams = await this.buildTransactionParams(method, txParams);

        return await this.send(method, transactionParams);
    }

    async getLastMeterReadingAndHash(_assetId: number, txParams?: SpecialTx) {
        return await this.web3Contract.methods.getLastMeterReadingAndHash(_assetId).call(txParams);
    }

    async getAssetBySmartMeter(_smartMeter: string, txParams?: SpecialTx) {
        return await this.web3Contract.methods.getAssetBySmartMeter(_smartMeter).call(txParams);
    }

    async userContractLookup(txParams?: SpecialTx) {
        return await this.web3Contract.methods.userContractLookup().call(txParams);
    }

    async checkAssetExist(_smartMeter: string, txParams?: SpecialTx) {
        return await this.web3Contract.methods.checkAssetExist(_smartMeter).call(txParams);
    }

    async db(txParams?: SpecialTx) {
        return await this.web3Contract.methods.db().call(txParams);
    }

    async addMatcher(_assetId: number, _new: string, txParams?: SpecialTx) {
        const method = this.web3Contract.methods.addMatcher(_assetId, _new);
        const transactionParams = await this.buildTransactionParams(method, txParams);

        return await this.send(method, transactionParams);
    }

    async setMarketLookupContract(
        _assetId: number,
        _marketContractLookup: string,
        txParams?: SpecialTx
    ) {
        const method = this.web3Contract.methods.setMarketLookupContract(_assetId, _marketContractLookup);
        const transactionParams = await this.buildTransactionParams(method, txParams);

        return await this.send(method, transactionParams);
    }

    async getAssetOwner(_assetId: number, txParams?: SpecialTx) {
        return await this.web3Contract.methods.getAssetOwner(_assetId).call(txParams);
    }

    async owner(txParams?: SpecialTx) {
        return await this.web3Contract.methods.owner().call(txParams);
    }

    async changeOwner(_newOwner: string, txParams?: SpecialTx) {
        const method = this.web3Contract.methods.changeOwner(_newOwner);
        const transactionParams = await this.buildTransactionParams(method, txParams);

        return await this.send(method, transactionParams);
    }

    async checkAssetExistExternal(_smartMeter: string, txParams?: SpecialTx) {
        return await this.web3Contract.methods.checkAssetExistExternal(_smartMeter).call(txParams);
    }

    async saveSmartMeterRead(
        _assetId: number,
        _newMeterRead: number,
        _lastSmartMeterReadFileHash: string,
        _timestamp: number = moment().unix(),
        txParams?: SpecialTx
    ) {
        const method = this.web3Contract.methods.saveSmartMeterRead(_assetId, _newMeterRead, _lastSmartMeterReadFileHash, _timestamp);
        const transactionParams = await this.buildTransactionParams(method, txParams);

        return await this.send(method, transactionParams);
    }

    async removeMatcher(_assetId: number, _remove: string, txParams?: SpecialTx) {
        const method = this.web3Contract.methods.removeMatcher(_assetId, _remove);
        const transactionParams = await this.buildTransactionParams(method, txParams);

        return await this.send(method, transactionParams);
    }

    async getAssetGeneral(_assetId: number, txParams?: SpecialTx) {
        return await this.web3Contract.methods.getAssetGeneral(_assetId).call(txParams);
    }

    async getAssetListLength(txParams?: SpecialTx) {
        return await this.web3Contract.methods.getAssetListLength().call(txParams);
    }

    async getAssetById(_assetId: number, txParams?: SpecialTx) {
        return await this.web3Contract.methods.getAssetById(_assetId).call(txParams);
    }

    async isRole(_role: number, _caller: string, txParams?: SpecialTx) {
        return await this.web3Contract.methods.isRole(_role, _caller).call(txParams);
    }

    async getMarketLookupContract(_assetId: number, txParams?: SpecialTx) {
        return await this.web3Contract.methods.getMarketLookupContract(_assetId).call(txParams);
    }

    async setActive(_assetId: number, _active: boolean, txParams?: SpecialTx) {
        const method = this.web3Contract.methods.setActive(_assetId, _active);
        const transactionParams = await this.buildTransactionParams(method, txParams);

        return await this.send(method, transactionParams);
    }

    async createAsset(
        _smartMeter: string,
        _owner: string,
        _active: boolean,
        _matcher: string[],
        _propertiesDocumentHash: string,
        _url: string,
        txParams?: SpecialTx
    ) {
        const method = this.web3Contract.methods.createAsset(_smartMeter, _owner, _active, _matcher, _propertiesDocumentHash, _url);
        const transactionParams = await this.buildTransactionParams(method, txParams);

        return await this.send(method, transactionParams);
    }

    async init(_dbAddress: string, param1: string, txParams?: SpecialTx) {
        const method = this.web3Contract.methods.init(_dbAddress, param1);
        const transactionParams = await this.buildTransactionParams(method, txParams);

        return await this.send(method, transactionParams);
    }

    async getMatcher(_assetId: number, txParams?: SpecialTx) {
        return await this.web3Contract.methods.getMatcher(_assetId).call(txParams);
    }
}
