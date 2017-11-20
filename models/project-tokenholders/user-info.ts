import { ObjectId } from '../../lib/objectid'

export class UserInfo {

    @ObjectId expositoId?: string
    githubUsername?: string

    name?: string
    email?: string
    image?: string


}