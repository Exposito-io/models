import { UserPreferences } from './user-preferences'


export class User {

    _id: any
    id: String

    userPreferences: UserPreferences

    constructor() {

    }

    static fromJSON(json: any): User {
        let user = new User()
        return Object.assign(user, json)
    }
}

