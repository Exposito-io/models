import { PaymentDestination } from './payment-destination'
import { GithubProjects } from './api-params/github-projects'

export class DestinationOptions {
    destination: string | DestinationOptions[] | GithubProjects

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

    static fromJSON(json: any) {
        if (typeof json.destination === 'string')
            return json
        else if (json.destination instanceof Array) {
            return {
                destination: json.destination.map(DestinationOptions.fromJSON)
            }
        }
        else if (json.destination.githubProjects) {
            return {
                destination: new GithubProjects(json.destination)
            }
        }
        else
            throw('Invalid DestinationOptions')
    }

    static validate(dest: any) {
        // TODO
    }
}