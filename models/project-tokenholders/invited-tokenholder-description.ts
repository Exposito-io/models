import { ObjectId } from '../../lib/objectid'
import { ExpositoError, ErrorCode } from '../exposito-error'
import { interface as Interface, string, union, array } from 'io-ts'


/**
 * Project shareholder represented by an Exposito user 
 * who is not yet registered.
 * Will be converted to a {@link ShareholderDescription}
 * object once registered.
 */
export class InvitedTokenholderDescription {

    /** Email of the invited user */
    email: string

    /** Shares of the amount allocated to this user */
    shares: string


    static fromParams(params: InvitedTokenholderDescription | any): InvitedTokenholderDescription {
        if (!InvitedTokenholderDescription.validate(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let invitedShareholder = new InvitedTokenholderDescription()
        invitedShareholder.email = params.email
        invitedShareholder.shares = params.shares

        return invitedShareholder
    }

    /** @deprecated */
    static validate(params: any) {
        return InvitedTokenholderDescription.runtimeType().is(params)
    }


    static runtimeType() {
        return Interface({
            email: string,
            shares: string
        })
    }
}