import { ObjectId } from '../../lib/objectid'
import { ShareholderDescription } from './shareholder-description'
import { InvitedShareholderDescription } from './invited-shareholder-description'
import { GithubShareholdersDescription } from './github-shareholders-description'
import { ProjectTokenholdersSnapshot } from './project-tokenholders-snapshot'
import { ExpositoError, ErrorCode } from '../exposito-error'

/**
 * Contains the basic share distribution for a specific project.
 * May contain Exposito users and/or github projects.
 * 
 * Since lines of code for projects varies over time, the shares 
 * distribution is not fixed either. See {@link ProjectShareholdersSnapshot}
 * for project shareholders distribution at a specific moment in time.
 */
export class ProjectShareholdersDistribution {

    id: string

    /**
     * Exposito project's Id
     */
    @ObjectId
    projectId: string

    shareholders: (ShareholderDescription | InvitedShareholderDescription | GithubShareholdersDescription)[]


    static fromParams(params: CreateProjectShareholdersDistributionParams): ProjectShareholdersDistribution {
        if (!CreateProjectShareholdersDistributionParams.validate(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let shareholders = new ProjectShareholdersDistribution()
        shareholders.projectId = params.projectId
        shareholders.shareholders = params.shareholders.map(shareholder => {
             if (ShareholderDescription.validate(shareholder))
                return ShareholderDescription.fromParams(shareholder)
            else if (InvitedShareholderDescription.validate(shareholder))
                return InvitedShareholderDescription.fromParams(shareholder)
            else if (GithubShareholdersDescription.validate(shareholder))
                return GithubShareholdersDescription.fromParams(shareholder)
            else
                throw new ExpositoError(ErrorCode.INVALID_PARAMS)
        })

        return shareholders
    }

}


export class CreateProjectShareholdersDistributionParams {

    projectId: string

    shareholders: (ShareholderDescription | InvitedShareholderDescription | GithubShareholdersDescription)[] = []


    static validate(params: CreateProjectShareholdersDistributionParams) {
        // TODO

        if (!(params.shareholders instanceof Array))
            return false

        let validShareholders = params.shareholders.every(shareholder => {
            return ShareholderDescription.validate(shareholder)
                || InvitedShareholderDescription.validate(shareholder)
                || GithubShareholdersDescription.validate(shareholder)
        })

        return validShareholders && true
    }
}