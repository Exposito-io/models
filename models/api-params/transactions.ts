import { PaymentDestination } from '../payment-destination'
import * as tools from '../../lib/tools'
import { Money } from '../money'

export class CreatePaymentRequest {
    sourceWalletId: string
    sourceType?: PaymentDestination
    destination: string
    destinationType: PaymentDestination
    amount: string
    currency: string
    note?: string

    static validate(request: CreatePaymentRequest): boolean {
        if (typeof request.destinationType === 'string')
            request.destinationType = tools.convertStringToEnum(request.destinationType) as PaymentDestination

        // TODO: Finish validation

        return request.destination != null
            && tools.validateObjectId(request.sourceWalletId)
            && tools.validateEnum(request.destinationType, PaymentDestination)
            && request.destinationType !== PaymentDestination.UNKNOWN
            && Money.isValidStringAmount(request.amount)
            && Money.isValidCurrency(request.currency)        
    }
}