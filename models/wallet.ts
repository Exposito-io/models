
export enum WalletType {
    UNKNOWN = 0,
    BITCOIN = 1,
    ETHEREUM = 2
}




export abstract class Wallet {

    constructor(opts: WalletOptions) {
        this.name = opts.name
        this.organizationId = opts.organizationId
        this.labels = new Set(opts.labels)
    }

    id: string
    _id: string
    organizationId: string
    _periodicPaymentIds: string[] = []
    type: WalletType = WalletType.UNKNOWN
    name: string
    labels: Set<string> = new Set<string>()    

    getId() { return this._id }
    getType() { return this.type }
    getName() { return this.name }
    getLabels() { return this.labels }



    isValid(): boolean {
        // TODO mcormier
        return true
    }

    toJSON(): any {
        let walletJson = Object.assign({}, <any>this)
        walletJson.labels = Array.from(this.getLabels())
        return walletJson
    }

    toFrontendJSON(): any {
        return this.toJSON()
    }


    static fromJSON(json: any): Wallet {
        //if (Wallet.isJsonWalletValid(json)) {
        let wallet = WALLET_TYPES_MAP.get(json.type)(json)
        
        //wallet._id = typeof json._id === 'string' ? new ObjectID(json._id) : json._id
        wallet.type = <WalletType>json.type
        wallet.name = json.name
        wallet.labels = new Set(json.labels)
        wallet.organizationId = json.organizationId
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
    organizationId: string
    labels: string[]
}



import { BitcoinWallet } from './bitcoin-wallet'

const WALLET_TYPES_MAP = new Map<WalletType, Function>([
    [WalletType.BITCOIN, BitcoinWallet.fromJSON]
])

