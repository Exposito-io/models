import { PaymentDestination } from './payment-destination'

export class Transaction {
    sourceWalletId: string
    sourceType: PaymentDestination
    destination: string
    destinationType: PaymentDestination
    amount: string
    currency: string
    note?: string
    creationDate: Date
    endDate: Date
    status: number
}