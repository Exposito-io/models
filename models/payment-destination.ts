
/**
 * Payments can be sent to multiple types of destination: 
 * Exposito Wallet, Bitcoin public address, and more in the future.
 */

export enum PaymentDestination {
    UNKNOWN = 0,
    WALLET = 1, // Exposito Wallet
    BITCOIN_ADDRESS = 2,
    ETHEREUM_ADDRESS = 3
}