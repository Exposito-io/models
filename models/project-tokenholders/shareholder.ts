import { ObjectId } from '../../lib/objectid'
import { WalletAddress } from '../wallet-address'


/**
 * Project shareholder with his allocated
 * number of shares. Exposito will try to fetch
 * as much information as possible about the user,
 * but it may be incomplete. e.g. an invited user
 * who is not yet registered or a github developer
 * who has only added his payment address in a gist.
 */
export class Shareholder {

    /** Exposito user id of the shareholder */
    @ObjectId userId?: string

    /** Github username of the shareholder */
    githubUsername?: string

    name?: string
    email?: string
    picture?: string 

    /** Ethereum public address of the shareholder */
    ethereumAddress?: string

    /** Accepted payment methods for the shareholder */
    walletAddresses: WalletAddress[] = []

    /** Number of shares allocated to the shareholder */
    shares: string

}