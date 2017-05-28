import { ObjectID } from 'mongodb'


enum CryptoCurrency {
    UNKNOWN = 0,
    BITCOIN = 1,
    ETHEREUM = 2
}




abstract class Wallet {

    constructor(opts: WalletOptions) {
        this.name = opts.name
        this.labels = new Set(opts.labels)
    }

    getId() { return this._id }
    getType() { return this.type }
    getName() { return this.name }
    getLabels() { return this.labels }
    getUserId() { return this._userId }

    setName(name: string) { this.name = name }
    addLabel(label: string) { this.labels.add(label) }
    removeLabel(label: string) { this.labels.delete(label) }


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
        if (Wallet.isJsonWalletValid(json)) {
            let wallet = WALLET_TYPES_MAP.get(json.type)(json)

            wallet._id = typeof json._id === 'string' ? new ObjectID(json._id) : json._id
            wallet.type = <CryptoCurrency>json.type
            wallet.name = json.name
            wallet.labels = new Set(json.labels)
            wallet._userId = json._userId
            wallet._periodicPaymentIds = json._periodicPaymentIds

            return wallet
        }
    }


    static isJsonWalletValid(json: any) {
        // TODO
        return (typeof json._id === 'string' || json._id instanceof ObjectID)
            && typeof json.name === 'string'
            && typeof json.type === 'number'
            && WALLET_TYPES_MAP.has(json.type)
            && json.labels instanceof Array // TODO mcormier: validate each labels
            //&& typeof json._userId === 'string'
    }


    protected _id: ObjectID
    protected _userId: ObjectID
    protected _periodicPaymentIds: ObjectID[] = []
    protected type: CryptoCurrency = CryptoCurrency.UNKNOWN
    protected name: string
    protected labels: Set<string> = new Set<string>()

}

/**
 * Wallet constructor options
 */
class WalletOptions {
    name: string
    labels: string[]
}



import { BitcoinWallet } from './bitcoin-wallet'

const WALLET_TYPES_MAP = new Map<CryptoCurrency, Function>([
    [CryptoCurrency.BITCOIN, BitcoinWallet.fromJSON]
])


export { Wallet, CryptoCurrency, WalletOptions }