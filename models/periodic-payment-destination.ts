
/**
 * Periodic Payments can send to multiple type of destinations: 
 * Exposito Wallet, Bitcoin public address, and more.
 * An instance of PeriodicPaymentDestination represents one
 * of those possible destinations
 */
export class PeriodicPaymentDestination {
    type: PeriodicPaymentDestinationType
}

export enum PeriodicPaymentDestinationType {
    UNKNOWN = 0,
    WALLET = 1, // Exposito Wallet
    BITCOIN_ADDRESS = 2,
    ETHEREUM_ADDRESS = 3
}