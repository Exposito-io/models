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
    // TODO: Rename to confirmationDate
    endDate: Date
    status: number

    static fromJSON(json: any) : Transaction {
        return Object.assign(new Transaction(), json)
    }
}