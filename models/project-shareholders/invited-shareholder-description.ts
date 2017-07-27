import { ObjectId } from '../../lib/objectid'
import { ExpositoError, ErrorCode } from '../exposito-error'


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


    static fromParams(params: InvitedShareholderDescription | any): InvitedShareholderDescription {
        if (!InvitedShareholderDescription.validate(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let invitedShareholder = new InvitedShareholderDescription()
        invitedShareholder.email = params.email
        invitedShareholder.shares = params.shares

        return invitedShareholder
    }

    static validate(params: InvitedShareholderDescription | any): boolean {
        // TODO
        return params.email != null && params.shares != null
    }
}