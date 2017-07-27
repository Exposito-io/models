import { ObjectId } from '../../lib/objectid'

/**
 * Project shareholder with his allocated
 * number of shares. Exposito will try to fetch
 * as much information as possible about the user,
 * but it may be incomplete. e.g. an invited user
 * who is not yet registered or a github developer
 * who has only added his payment address in a gist.
 */
export class Shareholder {

    /**
     * Exposito user id of the shareholder
     */
    @ObjectId
    userId?: string

    email?: string

    avatarUrl?: string

    /**
     * Github username of the shareholder
     */
    githubUsername?: string

    /**
     * Ethereum public address of the shareholder
     */
    ethereumAddress?: string

    /**
     * Number of shares allocated to the
     * shareholder
     */
    shares: string

}