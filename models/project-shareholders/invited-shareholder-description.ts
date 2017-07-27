import { ObjectId } from '../../lib/objectid'

/**
 * Project shareholder represented by an Exposito user 
 * who is not yet registered.
 * Will be converted to a {@link ShareholderDescription}
 * object once registered.
 */
export class InvitedShareholderDescription {

    /**
     * Email of the invited user
     */
    email: string

    /**
     * Number of shares allocated to this 
     * user
     */
    shares: string
}