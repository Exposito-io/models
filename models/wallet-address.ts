import { interface as Interface, string, Integer } from 'io-ts'

export class WalletAddress {
    address: string
    addressType: WalletAddressType

    static runtimeType() {
        return Interface({
            address: string,
            addressType: Integer
        })
    }    
}


export enum WalletAddressType {
    UNKNOWN = 0,
    EXPOSITO = 1, // Exposito Wallet
    BITCOIN = 2,
    ETHEREUM = 3
}