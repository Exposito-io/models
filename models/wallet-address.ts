export class WalletAddress {
    address: string
    addressType: WalletAddressType
}


export enum WalletAddressType {
    UNKNOWN = 0,
    EXPOSITO = 1, // Exposito Wallet
    BITCOIN = 2,
    ETHEREUM = 3
}