import { UserPreferences } from './user-preferences'
import { WalletAddress } from './wallet-address'


export class User {

    _id: any
    id: string


    name: string
    email: string
    image: string

    defaultWallet: WalletAddress

    userPreferences: UserPreferences

    


    constructor() {

    }

    static fromJSON(json: any): User {
        let user = new User()
        return Object.assign(user, json)
    }
}

