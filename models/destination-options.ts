import { PaymentDestination } from './payment-destination'

export class DestinationOptions {
    destination: string | DestinationOptions[]

    /**
     * Used in an array of DestinationOptions object
     * to divide the payment amount. The amount received 
     * by this specific destination will be shares divided by 
     * the total shares of the DestinationOptions[]
     * 
     * For example: 
     * 
     * amount: '100',
     * currency: 'USD'
     * destination: [{ 
     *   shares: 3,
     *   destination: '',
     *   destinationType: 1
     * }, {
     *   shares: 7,
     *   destination: '',
     *   destinationType: 1
     * }]
     * 
     * The 100$ would be split into 30$ for the first destination
     * and 70$ for the second
     */
    shares?: number
    destinationType?: PaymentDestination
}