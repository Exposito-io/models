import { PeriodicPayment, PeriodicPaymentType, PeriodicPaymentOptions } from './periodic-payment'
import { Wallet } from './wallet'
import * as tools from '../lib/tools'
import { ExpositoError, ErrorCode } from './exposito-error'
import { ObjectID } from 'mongodb'
import * as Money from 'js-money'




/**
 * PeriodicPayment that transfers the same fixed amount at each interval
 */
export class FixedPayment extends PeriodicPayment {

    amount: Money

    constructor() {
            super()
    }


    getAmount() { return this.amount }


    getPaymentAmount() {
        return this.amount
    }

    getNextPaymentEstimateAmount() {
        return this.amount
    }




    // TODO: Find another name
    static fromOptions(opts: FixedPaymentOptions) {
        if (FixedPaymentOptions.validate(opts)) {                

            let periodicPayment = new FixedPayment()
            
            periodicPayment.sourceWalletId = new ObjectID(opts.sourceWalletId)
            periodicPayment.destinationWalletId = new ObjectID(opts.destinationWalletId)
            periodicPayment.schedule = opts.schedule
            periodicPayment.type = PeriodicPaymentType.FIXED
            
            periodicPayment.amount = opts.amount
            periodicPayment.schedule = opts.schedule

            return periodicPayment
        }    
        else
            throw new ExpositoError(ErrorCode.INVALID_PERIODIC_PAYMENT_OPTS)    
    }

    static fromJSON(json: any): FixedPayment {

        let fixedPayment = new FixedPayment()
        Object.assign(fixedPayment, json)

        return fixedPayment

    }

}


export class FixedPaymentOptions {
    sourceWalletId: string
    destinationWalletId: string
    amount: number
    currency: string
    schedule: string
    isPaused?: boolean

    /**
     * Validate a FixedPaymentOptions object.
     * The object doesn't have to extend FixedPaymentOptions, as long as it contains the valid properties
     * amount can be a string, it will be converted to number
     * 
     * This function doesn't validate that either sourceWalletId or destinationWalletId are addresses that
     * points to existing Wallets
     * @param opts 
     */
    static validate(opts: FixedPaymentOptions) {
        // TODO: Validate currency, schedule, isPaused

        // Number.valueOf is more strict thant parseFloat
        opts.amount = new Number(opts.amount).valueOf()

        return tools.validateObjectId(opts.sourceWalletId)
            && tools.validateObjectId(opts.destinationWalletId)
            && !isNaN(opts.amount)
    }
}


