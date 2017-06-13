import { ObjectID } from 'mongodb'
import { Wallet, WalletType } from './wallet'
import { PaymentDestination } from './payment-destination'
import { DestinationOptions } from './destination-options'
import { Money, Currency } from './money'
import { ValidationResults } from './validation-results'
import { ExpositoError, ErrorCode } from './exposito-error'




export abstract class PeriodicPayment {

    public _id: ObjectID
    public sourceWalletId: ObjectID

    public destination: string | DestinationOptions[]
    public destinationType: PaymentDestination

    public amount?: string
    public amountFunction?: string
    public amountFunctionFile: string    


    public type: PeriodicPaymentType
    public schedule: string

    public isPaused: boolean
    public isDeleted: boolean

    public sourceWallet: Wallet

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


    static fromOptions(opts: PeriodicPaymentOptions) {
        if (PeriodicPaymentOptions.validate(opts)) {

        }
        else
            throw new ExpositoError(ErrorCode.INVALID_PERIODIC_PAYMENT_OPTS)
    }


    static fromJSON(json: Object): PeriodicPayment {
        let periodicPaymentClass = PERIODIC_PAYMENT_CLASSES.find(p => p.isValidJSON(json))

        if (periodicPaymentClass == null)
            throw('Invalid JSON')

        let periodicPayment = periodicPaymentClass.fromJSON(json)
        periodicPayment.sourceWalletId = new ObjectID(periodicPayment.sourceWalletId)

        return periodicPayment

    }


}





export class PeriodicPaymentOptions {

    schedule: string
    sourceWalletId?: string

    destination: string | DestinationOptions[]
    destinationType?: PaymentDestination

    amount?: string
    amountFunction?: string
    amountFunctionFile: string

    currency?: string
    payments?: PeriodicPaymentOptions[]

    // TODO: complete
    static validate(opts: PeriodicPaymentOptions): ValidationResults {
        if (!this.validateSchedule(opts.schedule))
            return { isValid: false, message: 'Invalid schedule' }

        //if (opts.sourceWalletId == undefined && )
        return { isValid: true }
    }

    private static validateSchedule(schedule: string) {
        return typeof schedule === 'string'
    }
}

export enum PeriodicPaymentType {
    UNKNOWN = 0,
    FIXED = 1,
    RESOURCE = 2,
    GROUP = 3
}



import { FixedPayment } from './fixed-payment'


const PERIODIC_PAYMENT_CLASSES = [
    FixedPayment
]

