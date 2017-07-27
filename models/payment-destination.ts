
/**
 * Payments can be sent to multiple types of destination: 
 * Exposito Wallet, Bitcoin public address, and more in the future.
 * 
 * @deprecated Use {@link WalletAddress} instead
 */
export enum PaymentDestination {
    UNKNOWN = 0,
    EXPOSITO_WALLET = 1, // Exposito Wallet
    BITCOIN_ADDRESS = 2,
    ETHEREUM_ADDRESS = 3
}