import { ObjectId } from '../../lib/objectid'
import { ExpositoError, ErrorCode } from '../exposito-error'
import { interface as Interface, string, union, array } from 'io-ts'


/**
 * Project tokenholder represented by
 * an exposito user
 */
export class TokenholderDescription {

    /** Exposito user id */
    @ObjectId userId: string

    /** Number of shares allocated to this user */
    shares: string


    static fromParams(params: TokenholderDescription | any): TokenholderDescription {
        if (!TokenholderDescription.validate(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let shareholder = new TokenholderDescription()
        shareholder.userId = params.userId
        shareholder.shares = params.shares

        return shareholder
    }

    /** @deprecated */
    static validate(params: any) {
        return TokenholderDescription.runtimeType().is(params)
    }


    static runtimeType() {
        return Interface({
            userId: string,
            shares: string
        })
    }

}