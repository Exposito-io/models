import { ObjectId } from '../../lib/objectid'
import { ShareholderDescription } from './shareholder-description'
import { InvitedTokenholderDescription } from './invited-tokenholder-description'
import { GithubShareholdersDescription } from './github-shareholders-description'
import { ProjectTokenholdersSnapshot } from './project-tokenholders-snapshot'
import { ExpositoError, ErrorCode } from '../exposito-error'
import { interface as Interface, string, union, array } from 'io-ts'


/**
 * Contains the basic share distribution for a specific project.
 * May contain Exposito users and/or github projects.
 * 
 * Since lines of code for projects varies over time, the shares 
 * distribution is not fixed either. See {@link ProjectTokenholdersSnapshot}
 * for project shareholders distribution at a specific moment in time.
 */
export class ProjectTokenholdersDistribution {

    id: string

    /** Exposito project's Id */
    @ObjectId projectId: string

    tokenholders: (ShareholderDescription | InvitedTokenholderDescription | GithubShareholdersDescription)[]

    lastSnapshot?: ProjectTokenholdersSnapshot


    static fromParams(params: CreateProjectShareholdersDistributionParams): ProjectTokenholdersDistribution {
        if (!CreateProjectShareholdersDistributionParams.runtimeType().is(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let shareholders = new ProjectTokenholdersDistribution()
        shareholders.projectId = params.projectId
        shareholders.tokenholders = params.shareholders.map(shareholder => {
             if (ShareholderDescription.runtimeType().is(shareholder))
                return ShareholderDescription.fromParams(shareholder)
            else if (InvitedTokenholderDescription.runtimeType().is(shareholder))
                return InvitedTokenholderDescription.fromParams(shareholder)
            else if (GithubShareholdersDescription.runtimeType().is(shareholder))
                return GithubShareholdersDescription.fromParams(shareholder)
            else
                throw new ExpositoError(ErrorCode.INVALID_PARAMS)
        })

        return shareholders
    }

    static runtimeType() {
        return Interface({
            id: string,
            projectId: string,
            shareholders: array(union([
                ShareholderDescription.runtimeType(),
                InvitedTokenholderDescription.runtimeType(),
                GithubShareholdersDescription.runtimeType()
            ]))
        })
    }

}


export class CreateProjectShareholdersDistributionParams {

    projectId: string

    shareholders: (ShareholderDescription | InvitedTokenholderDescription | GithubShareholdersDescription)[] = []


    /** @deprecated */
    static validate(params: any) {
        return CreateProjectShareholdersDistributionParams.runtimeType().is(params)
    }


    static runtimeType() {
        return Interface({
            shareholders: array(union([
                ShareholderDescription.runtimeType(),
                InvitedTokenholderDescription.runtimeType(),
                GithubShareholdersDescription.runtimeType()
            ])),
            projectId: string
        })
    }
}