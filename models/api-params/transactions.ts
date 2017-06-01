import { PaymentDestination } from '../payment-destination'

export class CreatePaymentRequest {
    sourceWalletId: string
    destination: string
    destinationType: PaymentDestination
    amount: number
    currency: string
}