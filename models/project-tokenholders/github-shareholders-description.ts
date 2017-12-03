import { ExpositoError, ErrorCode } from '../exposito-error'
import { interface as Interface, string, union, array } from 'io-ts'

export class GithubShareholdersDescription {
    
    /**
     * Github project formatted like this:
     * \{username}/\{project}
     */
    githubProject: string

    /**
     * Shares of the PeriodicTransfer amount allocated to this project
     */
    shares: string


    static fromParams(params: GithubShareholdersDescription | any): GithubShareholdersDescription {
        if (!GithubShareholdersDescription.validate(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let githubShareholders = new GithubShareholdersDescription()
        githubShareholders.githubProject = params.githubProject
        githubShareholders.shares = params.shares

        return githubShareholders
    }

    /** 
     * @deprecated Use GithubShareholdersDescription.runtimeType().is() instead
     */
    static validate(params: any) {
        return GithubShareholdersDescription.runtimeType().is(params)
    }


    static runtimeType() {
        return Interface({
            githubProject: string,
            shares: string
        })

        // TODO: shares must be a string representing a number
    }

}