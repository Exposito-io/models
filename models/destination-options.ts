import { PaymentDestination } from './payment-destination'
import { GithubProjects } from './api-params/github-projects'
import { ProjectTokenholdersSnapshot, ProjectTokenholdersDistribution } from './project-tokenholders'
import { UserDestination } from './transfers'
import { interface as Interface, string, union, Integer } from 'io-ts'



export class DestinationOptions {
    destination: string | UserDestination | GithubProjects | ProjectTokenholdersDistribution | DestinationOptions[]

    

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

    static fromJSON(json: any): DestinationOptions {
        if (typeof json.destination === 'string')
            return json
        else if (json.destination instanceof Array) {
            return {
                destination: json.destination.map(DestinationOptions.fromJSON)
            }
        }
        else if (UserDestination.runtimeType().is(json.destination)) {
            return {
                destination: json.destination
            }
        }
        else if (ProjectTokenholdersDistribution.runtimeType().is(json.destination)) {
            return {
                destination: Object.assign({} as ProjectTokenholdersDistribution, json.destination)
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

    static runtimeType() {
        return Interface({
            destination: union([ string, GithubProjects.runtimeType() ]),
            shares: union([ string, undefined ]),
            destinationType: union([ Integer, undefined ])
        })
    }
}


export function getDestinationOptionsType(destinationOptions: DestinationOptions) {

}