import { interface as Interface, string, Integer } from 'io-ts'

import { UserPreferences } from './user-preferences'
import { WalletAddress } from './wallet-address'

/**
 * Exposito User
 */
export class User {

    _id: any

    /** User Id */
    id: string

    /** User full name */
    name: string

    /** User email address */
    email: string

    /** URL of the user image */
    image: string

    /** Default user wallet to use for transactions */
    defaultWallet: WalletAddress


    userPreferences: UserPreferences  


    constructor() {

    }

    static fromJSON(json: any): User {
        let user = new User()
        return Object.assign(user, json)
    }


    // TODO: userPreferences
    static runtimeType() {
        return Interface({
            id: string,
            name: string,
            email: string,
            image: string,
            defaultWallet: WalletAddress.runtimeType(),
            
        })
    }     
}

