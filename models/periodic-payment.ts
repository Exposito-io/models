import { ObjectID } from 'mongodb'
import { Wallet, WalletType } from './wallet'
import { PaymentDestination } from './payment-destination'
import { DestinationOptions } from './destination-options'
import { Money, Currency } from './money'
import { ValidationResults } from './validation-results'
import { ExpositoError, ErrorCode } from './exposito-error'




export class PeriodicPayment {

    public _id: ObjectID

    public schedule: string
    public sourceWalletId: ObjectID

    public destination: string | DestinationOptions[]
    public destinationType: PaymentDestination

    public amount?: string
    public currency?: string

    public amountFunction?: string
    public amountFunctionFile: string    

    public payments?: IntraPeriodicPayment[]

    public isPaused: boolean
    public isDeleted: boolean


    public sourceWallet?: Wallet


    constructor(opts?: PeriodicPaymentOptions) {
        if (opts instanceof Object) {
            let validation = PeriodicPaymentOptions.validate(opts)

            if (!validation.isValid)
                throw new ExpositoError(ErrorCode.INVALID_PERIODIC_PAYMENT_OPTS, validation.message)

            this.schedule = opts.schedule
            this.sourceWalletId = new ObjectID(opts.sourceWalletId)

            this.destination = opts.destination
            this.destinationType = opts.destinationType

            this.amount = opts.amount
            this.currency = opts.currency

            this.amountFunction = opts.amountFunction
            this.amountFunctionFile = opts.amountFunctionFile

            if (opts.payments)
                this.payments = opts.payments.map(payment => new IntraPeriodicPayment)

            this.isPaused = opts.isPaused
        }
        else if (opts !== undefined)
            throw new ExpositoError(ErrorCode.INVALID_PERIODIC_PAYMENT_OPTS)

    }


    getNextPaymentTime() {
        return new Date()
    }

    /**
     * Returns an estimate of the next payment 
     * amount
     */
    getNextPaymentEstimateAmount(): Money {
        throw 'Not implemented'
    }

    /**
     * Returns the current payment amount
     */
    getPaymentAmount(): Money {
        throw 'Not implemented'
    }



    static fromJSON(json: any): PeriodicPayment {

        let periodicPayment = new PeriodicPayment()
        Object.assign(periodicPayment, json)

        periodicPayment.sourceWalletId = new ObjectID(periodicPayment.sourceWalletId)

        if (json.periodicPayments)
            periodicPayment.payments = json.periodicPayments.map(pp => PeriodicPayment.fromJSON(pp)) 

        return periodicPayment

    }


}



export class IntraPeriodicPayment extends PeriodicPayment {
    constructor(opts?: PeriodicPaymentOptions) {
        super(opts)

        this.isPaused = false
        this.isDeleted = false
    }
}





export class PeriodicPaymentOptions {

    schedule: string
    sourceWalletId?: string

    destination: string | DestinationOptions[]
    destinationType?: PaymentDestination

    amount?: string
    currency?: string

    amountFunction?: string
    amountFunctionFile: string

    payments?: PeriodicPaymentOptions[]

    isPaused?: boolean

    // TODO: complete
    static validate(opts: PeriodicPaymentOptions): ValidationResults {
        if (!this.validateSchedule(opts.schedule))
            return { isValid: false, message: 'Invalid schedule' }

        if (!(typeof opts === 'boolean'))
            opts.isPaused = false
            

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

