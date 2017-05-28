import { ObjectID } from 'mongodb'
import { Wallet, CryptoCurrency } from './wallet'
import * as Money from 'js-money'



export abstract class PeriodicPayment {


    constructor(opts: PeriodicPaymentOptions) {
        if (typeof opts.sourceWalletId === 'string')
            opts.sourceWalletId = new ObjectID(opts.sourceWalletId)

        if (typeof opts.destinationWalletId === 'string')
            opts.destinationWalletId = new ObjectID(opts.destinationWalletId)

        this._sourceWalletId = opts.sourceWalletId
        this._destinationWalletId = opts.destinationWalletId
        this.type = opts.type
        this.schedule = opts.schedule
    }

    getId() { return this._id }
    getSourceWalletId() { return this._sourceWalletId }
    getSourceWallet() { return this.sourceWallet }

    getDestinationWalletId() { return this._destinationWalletId }
    getDestinationWallet() { return this.destinationWallet }

    getSchedule() { return this.schedule }

    isPaused() { return this.paused }
    isDeleted() { return this.deleted }


    getNextPaymentTime() {
        return new Date()
    }

    /**
     * Returns an estimate of the next payment 
     * amount
     */
    abstract getNextPaymentEstimateAmount(): Money

    /**
     * Returns the current payment amount
     */
    abstract getPaymentAmount(): Money


    protected _id: ObjectID
    protected _sourceWalletId: ObjectID
    protected _destinationWalletId: ObjectID

    protected sourceWallet: Wallet
    protected destinationWallet: Wallet
    protected type: PeriodicPaymentType
    protected cryptoCurrency: CryptoCurrency
    protected schedule: string


    protected paused: boolean
    protected deleted: boolean

    static isValidJSON(json: any): boolean {
        if (!(json instanceof Object))
            return false

        // Full object validation
        if (json._id) {
            // TODO
            return true
        }
        // Partial object validation
        else {
            // TODO
            return true
        }
    }

    static fromJSON(json: Object): PeriodicPayment {
        let periodicPaymentClass = PERIODIC_PAYMENT_CLASSES.find(p => p.isValidJSON(json) && PeriodicPayment.isValidJSON(json))

        if (periodicPaymentClass == null)
            throw('Invalid JSON')

        let periodicPayment = Object.assign({}, json, periodicPaymentClass.fromJSON(json))
        return periodicPayment

    }

}


export class PeriodicPaymentOptions {
    sourceWalletId: ObjectID|string
    destinationWalletId: ObjectID|string
    type: PeriodicPaymentType
    schedule: string
}

export enum PeriodicPaymentType {
    UNKNOWN = 0,
    FIXED = 1,
    RESOURCE = 2
}



import { FixedPayment } from './fixed-payment'


const PERIODIC_PAYMENT_CLASSES = [
    FixedPayment
]

