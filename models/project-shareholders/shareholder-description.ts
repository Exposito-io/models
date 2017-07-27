import { ObjectId } from '../../lib/objectid'
import { ExpositoError, ErrorCode } from '../exposito-error'


/**
 * Project shareholder represented by 
 * an exposito user
 */
export class ShareholderDescription {

    @ObjectId
    userId: string

    /**
     * Number of shares allocated to this 
     * user
     */
    shares: string


    static fromParams(params: ShareholderDescription | any): ShareholderDescription {
        if (!ShareholderDescription.validate(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let shareholder = new ShareholderDescription()
        shareholder.userId = params.userId
        shareholder.shares = params.shares

        return shareholder
    }    


    static validate(params: ShareholderDescription | any) {
        // TODO
        return params.userId != null && params.shares != null
    }
}