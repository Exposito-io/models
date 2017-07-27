import { ObjectId } from '../../lib/objectid'

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
}