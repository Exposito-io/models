import { ObjectId } from '../lib/objectid'

export enum WalletType {
    BITCOIN = 'BITCOIN',
    ETHEREUM = 'ETHEREUM',
    EXPOSITO = 'EXPOSITO'
}




export abstract class Wallet {

    constructor(opts: WalletOptions) {
        this.name = opts.name
        this.projectId = opts.projectId
        this.labels = Array.from(new Set(opts.labels || []))
    }

    id: string
    _id: string

    // TODO: convertStringsToObjectIds does not work with inheritance
    @ObjectId projectId: string

    _periodicPaymentIds: string[] = []
    type: WalletType

    name: string
    description: string
    labels: string[] = []

    amount: string
    currency: string






    isValid(): boolean {
        // TODO mcormier
        return true
    }

    toJSON(): any {
        let walletJson = Object.assign({}, <any>this)
        walletJson.labels = Array.from(this.labels)
        return walletJson
    }

    toFrontendJSON(): any {
        return this.toJSON()
    }


    static fromJSON(json: any): Wallet {
        //if (Wallet.isJsonWalletValid(json)) {
        let wallet = WALLET_TYPES_MAP.get(json.type)(json)
        
        //wallet._id = typeof json._id === 'string' ? new ObjectID(json._id) : json._id
        wallet.id = json._id || json.id
        wallet.type = <WalletType>json.type
        wallet.name = json.name
        wallet.labels = Array.from(new Set(json.labels))
        wallet.projectId = json.projectId
        wallet._periodicPaymentIds = json._periodicPaymentIds

        return wallet
        //}
    }


    static isJsonWalletValid(json: any) {
        // TODO
        return typeof json.name === 'string'
            && typeof json.type === 'number'
            && WALLET_TYPES_MAP.has(json.type)
            && json.labels instanceof Array // TODO mcormier: validate each labels
            //&& typeof json._userId === 'string'
    }




}

/**
 * Wallet constructor options
 */
export class WalletOptions {
    name: string
    projectId: string
    labels: string[]
}



import { BitcoinWallet } from './bitcoin-wallet'
import { ExpositoWallet } from './exposito-wallet'

const WALLET_TYPES_MAP = new Map<WalletType, Function>([
    [WalletType.BITCOIN, BitcoinWallet.fromJSON],
    [WalletType.EXPOSITO, ExpositoWallet.fromJSON]
])

