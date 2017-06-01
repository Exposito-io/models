import { ObjectID } from 'mongodb'
import { Wallet, CryptoCurrency } from './wallet'
import * as Money from 'js-money'



export abstract class PeriodicPayment {


    constructor(opts?: PeriodicPaymentOptions) {
        if (opts instanceof Object) {
            // Validate PeriodicPaymentOptions

            if (typeof opts.sourceWalletId === 'string')
                opts.sourceWalletId = new ObjectID(opts.sourceWalletId)

            this.sourceWalletId = opts.sourceWalletId
            this.destinationWalletId = opts.destinationWalletId
            this.type = opts.type
            this.schedule = opts.schedule
        }
    }

    getId() { return this._id }
    getSourceWalletId() { return this.sourceWalletId }
    getSourceWallet() { return this.sourceWallet }

    getDestinationWalletId() { return this.destinationWalletId }
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
    public sourceWalletId: ObjectID
    public destinationWalletId: string

    public sourceWallet: Wallet
    public destinationWallet: Wallet
    public type: PeriodicPaymentType
    public cryptoCurrency: CryptoCurrency
    public schedule: string


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

        let periodicPayment = periodicPaymentClass.fromJSON(json)
        periodicPayment.sourceWalletId = new ObjectID(periodicPayment.sourceWalletId)

        return periodicPayment

    }

}


export class PeriodicPaymentOptions {
    sourceWalletId: ObjectID|string
    destinationWalletId: string
    type: PeriodicPaymentType
    schedule: string

    // TODO: complete
    static validate(opts: PeriodicPaymentOptions) {
        return true
    }
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

