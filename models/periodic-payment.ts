//import { ObjectID } from 'mongodb'
import { Wallet, WalletType } from './wallet'
import { PaymentDestination } from './payment-destination'
import { DestinationOptions } from './destination-options'
import { UserDestination } from './transfers'
import { Money, Currency } from './money'
import { ValidationResults } from './validation-results'
import { ExpositoError, ErrorCode } from './exposito-error'
import { GithubProjects } from './api-params/github-projects'
import { ObjectId } from '../lib/objectid'
import { ProjectTokenholdersSnapshot, ProjectTokenholdersDistribution } from './project-tokenholders'
import { interface as Interface, string, union, array, any } from 'io-ts'




export class PeriodicPayment {

    _id: string

    id: string

    /** Exposito project associated with the PeriodicTransfer */
    @ObjectId projectId: string

    /** Description of the PeriodicTransfer */
    description: string

    /** Cron expression */
    schedule: string

    /** Source wallet id */
    @ObjectId sourceWalletId: string

    // TODO: Simplify structure
    destination: string | UserDestination | GithubProjects | ProjectTokenholdersDistribution | DestinationOptions[]
    destinationType?: PaymentDestination

    amount?: string
    currency?: string

    /** Is amount in percentage  */
    isAmountPct = false

    /** 
     * To enable more complex transfers, a function can 
     * determine the amount 
     */
    amountFunction?: string
    amountFunctionFile?: string

    payments?: IntraPeriodicPayment[]

    isPaused: boolean = false
    isDeleted: boolean = false


    sourceWallet?: Wallet


    constructor(opts?: PeriodicPaymentOptions) {
        if (opts instanceof Object) {
            let validation = PeriodicPaymentOptions.validate(opts)

            if (!validation.isValid)
                throw new ExpositoError(ErrorCode.INVALID_PERIODIC_PAYMENT_OPTS, validation.message)

            this.schedule = opts.schedule
            this.sourceWalletId = opts.sourceWalletId
            this.projectId = opts.projectId

            let destination = DestinationOptions.fromJSON({ 
                destination: opts.destination,
                destinationType: opts.destinationType
            })

            this.description = opts.description

            this.destination = destination.destination
            this.destinationType = destination.destinationType

            this.amount = opts.amount
            this.currency = opts.currency

            this.amountFunction = opts.amountFunction
            this.amountFunctionFile = opts.amountFunctionFile

            if (opts.payments)
                this.payments = opts.payments.map(payment => new IntraPeriodicPayment)

            this.isPaused = opts.isPaused || false

            // Cleanup undefined attributes to prevent mongo from saving them
            //Object.keys(this).forEach((key) => (this[key] == undefined) && delete this[key])
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


    hasFixedAmount(): boolean {
        return this.amount != null && this.currency != null
    }

    static fromJSON(json: any): PeriodicPayment {

        let periodicPayment = new PeriodicPayment()
        Object.assign(periodicPayment, json)

        if (json.periodicPayments)
            periodicPayment.payments = json.periodicPayments.map(pp => PeriodicPayment.fromJSON(pp)) 

        let destination = DestinationOptions.fromJSON({ 
            destination: json.destination,
            destinationType: json.destinationType
        })

        periodicPayment.destination = destination.destination
        periodicPayment.destinationType = destination.destinationType

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

    @ObjectId projectId: string
    schedule: string

    // Optional?
    sourceWalletId?: string

    destination: string | UserDestination | GithubProjects | ProjectTokenholdersDistribution | DestinationOptions[]
    destinationType?: PaymentDestination

    description: string

    amount?: string
    currency?: string

    amountFunction?: string
    amountFunctionFile?: string

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


    static runtimeType() {
        return Interface({
            projectId: string,
            description: string,
            schedule: string,
            destination: union([
                string, 
                UserDestination.runtimeType(), 
                GithubProjects.runtimeType(),
                ProjectTokenholdersDistribution.runtimeType(),
                array(DestinationOptions.runtimeType()) 
            ])
        })
    }       
}

export enum PeriodicPaymentType {
    UNKNOWN = 0,
    FIXED = 1,
    RESOURCE = 2,
    GROUP = 3
}

export { DestinationOptions }

import { FixedPayment } from './fixed-payment'


const PERIODIC_PAYMENT_CLASSES = [
    FixedPayment
]

