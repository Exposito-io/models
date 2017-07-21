
export class User {

    _id: any
    id: String

    constructor() {

    }

    static fromJSON(json: any): User {
        let user = new User()
        return Object.assign(user, json)
    }
}

