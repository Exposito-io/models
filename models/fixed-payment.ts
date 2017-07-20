

import { PeriodicPayment, PeriodicPaymentType, PeriodicPaymentOptions } from './periodic-payment'
import { PaymentDestination } from './payment-destination'
import { Wallet } from './wallet'
import * as tools from '../lib/tools'
import { ExpositoError, ErrorCode } from './exposito-error'
//import { ObjectID } from 'mongodb'
import { Money } from './money'




/**
 * PeriodicPayment that transfers the same fixed amount at each interval
 */
export class FixedPayment extends PeriodicPayment {

    

    constructor() {
        super()
    }


    getAmount() { return '' }




    

    // TODO: Find another name
    static fromOptions(opts: FixedPaymentOptions) {
        if (FixedPaymentOptions.validate(opts)) {                

            let periodicPayment = new FixedPayment()
            
            periodicPayment.sourceWalletId = opts.sourceWalletId
            periodicPayment.destination = opts.destination
            periodicPayment.destinationType = opts.destinationType
            periodicPayment.schedule = opts.schedule
            
            //periodicPayment.amount = Money. opts.amount
            //periodicPayment.amount = Money.fromDecimal(opts.amount, opts.currency)
            periodicPayment.schedule = opts.schedule

            return periodicPayment
        }    
        else
            throw new ExpositoError(ErrorCode.INVALID_PERIODIC_PAYMENT_OPTS)    
    }

    static isValidJSON(json: any) {
        return json.type === PeriodicPaymentType.FIXED
    }

    static fromJSON(json: any): FixedPayment {

        let fixedPayment = new FixedPayment()
        Object.assign(fixedPayment, json)

        //fixedPayment.amount = Money.fromStringDecimal(json.amount.decimalAmount, json.amount.currency)

        return fixedPayment

    }

}


export class FixedPaymentOptions {
    sourceWalletId: string
    destination: string
    destinationType: PaymentDestination
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
        // TODO: Validate destination type

        // Number.valueOf is more strict thant parseFloat
        opts.amount = new Number(opts.amount).valueOf()

        if (typeof opts.currency === 'string')
            opts.currency = opts.currency.toUpperCase()

        // Validate amount/currency
        try {
            let validMoney = Money.fromDecimal(opts.amount, opts.currency)
        } catch(e) {
            return false
        }

        return tools.validateObjectId(opts.sourceWalletId)
            //&& tools.validateObjectId(opts.destinationWalletId)
            && !isNaN(opts.amount)
    }
}


