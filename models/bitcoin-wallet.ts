import { Wallet, WalletType, WalletOptions } from './wallet'
//import { BitcoinCoreWallet } from './core/bitcoin-core-wallet'


export class BitcoinWallet extends Wallet {

    coreWallet: any

    constructor(opts: BitcoinWalletOptions) {
        super(opts)

        this.coreWallet = opts.coreWallet
        this.type = WalletType.BITCOIN
        this.projectId = opts.projectId
    }

    getCoreWallet() { return this.coreWallet }

    isValid(): boolean {
        // TODO mcormier
        return super.isValid()
            && true
    }


    toJSON(): any {
        // TODO mcormier
        let wallet = Object.assign(this, super.toJSON())
        return wallet
    }

    toFrontendJSON(): any {
        let wallet = Object.assign(this, super.toFrontendJSON())
        wallet.coreWallet = undefined
        return wallet
    }

    static fromParams(params: BitcoinWalletOptions): BitcoinWallet {
        if (!BitcoinWalletOptions.validate(params))
            throw 'Invalid params'

        let wallet = new BitcoinWallet({
            name: params.name,
            labels: params.labels,
            projectId: params.projectId,
            coreWallet: params.coreWallet
        })

        return wallet
    }

    static fromJSON(json: any): BitcoinWallet {
 
        let bitcoinWallet = new BitcoinWallet({
            name: json.name,
            labels: json.labels,
            projectId: json.projectId,
            //coreWallet: BitcoinCoreWallet.fromObj(json.bitcoinWallet)
            coreWallet: json.coreWallet
        })   

        return bitcoinWallet
    }


    static isJsonWalletValid(json: any) {
        return Wallet.isJsonWalletValid(json)
            && json.coreWallet instanceof Object
    }


}


export class BitcoinWalletOptions extends WalletOptions {
    coreWallet?: any

    static validate(params: BitcoinWalletOptions): boolean {
        // TODO
        return true
    }
}


