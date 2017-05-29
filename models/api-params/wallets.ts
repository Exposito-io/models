export class SendOptions {
    sourceWalletId: string
    destinationWalletId: string
    amount: number
}

export class GetWalletOptions {
    walletId: string
    jsonResult?: boolean
}