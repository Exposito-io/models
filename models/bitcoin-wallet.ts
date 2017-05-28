import { Wallet, CryptoCurrency, WalletOptions } from './wallet'
//import { BitcoinCoreWallet } from './core/bitcoin-core-wallet'


class BitcoinWallet extends Wallet {

    protected coreWallet: any

    constructor(opts: BitcoinWalletOptions) {
        super(opts)

        this.coreWallet = opts.coreWallet
        this.type = CryptoCurrency.BITCOIN
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


    static fromJSON(json: any): BitcoinWallet {
        if (!BitcoinWallet.isJsonWalletValid(json))
            throw('Invalid wallet JSON')

 
        let bitcoinWallet = new BitcoinWallet({
            name: json.name,
            labels: json.labels,
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


class BitcoinWalletOptions extends WalletOptions {
    coreWallet: any
}


export { BitcoinWallet }