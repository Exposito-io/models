import { ExpositoError, ErrorCode } from '../exposito-error'

export class GithubShareholdersDescription {
    
    /**
     * Github project formatted like this:
     * \{username}/\{project}
     */
    githubProject: string

    /**
     * Number of shares allocated to this 
     * project
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

    static validate(params: GithubShareholdersDescription | any): boolean {
        // TODO
        return params.githubProject != null && params.shares != null
    }

}