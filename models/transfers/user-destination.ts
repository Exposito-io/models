import { ObjectId } from '../../lib/objectid'
import { interface as Interface, string, union, Integer } from 'io-ts'
import { User } from '../user'

/**
 * Exposito user destination for a transfer or
 * periodic transfer 
 */
export class UserDestination {

    /** Exposito User Id */
    @ObjectId userId: string

    /** Crypto address of destination */
    destination: string

    /** 
     * The User associated with the UserDestination
     * can be added to the object 
     */
    user?: User


    static runtimeType() {
        return Interface({
            userId: string,
            destination: string
        })
    }    
}