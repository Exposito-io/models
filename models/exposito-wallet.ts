import { Wallet, WalletType, WalletOptions } from './wallet'
//import { BitcoinCoreWallet } from './core/bitcoin-core-wallet'


export class ExpositoWallet extends Wallet {


    constructor(opts: ExpositoWalletOptions) {
        super(opts)

        this.type = WalletType.EXPOSITO
        this.projectId = opts.projectId
        this.amount = '0'
        this.currency = 'BTC'
    }


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

    static fromParams(params: ExpositoWalletOptions): ExpositoWallet {
        if (!ExpositoWalletOptions.validate(params))
            throw 'Invalid params'

        let wallet = new ExpositoWallet({
            name: params.name,
            description: params.description,
            labels: params.labels,
            projectId: params.projectId
        })

        return wallet
    }

    static fromJSON(json: any): ExpositoWallet {
 
        let expositoWallet = new ExpositoWallet({
            name: json.name,
            description: json.description,
            labels: json.labels,
            projectId: json.projectId
        })   

        expositoWallet.amount = json.amount
        expositoWallet.currency = json.currency

        return expositoWallet
    }



}


export class ExpositoWalletOptions extends WalletOptions {

    static validate(params): boolean {
        // TODO
        return true
    }
}


