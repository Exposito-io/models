import { ObjectId } from '../../lib/objectid'
import { TokenholderDescription } from './tokenholder-description'
import { InvitedTokenholderDescription } from './invited-tokenholder-description'
import { GithubTokenholdersDescription } from './github-tokenholders-description'
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

    tokenholders: (TokenholderDescription | InvitedTokenholderDescription | GithubTokenholdersDescription)[]

    lastSnapshot?: ProjectTokenholdersSnapshot


    static fromParams(params: CreateProjectTokenholdersDistributionParams): ProjectTokenholdersDistribution {
        if (!CreateProjectTokenholdersDistributionParams.runtimeType().is(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let shareholders = new ProjectTokenholdersDistribution()
        shareholders.projectId = params.projectId
        shareholders.tokenholders = params.shareholders.map(shareholder => {
             if (TokenholderDescription.runtimeType().is(shareholder))
                return TokenholderDescription.fromParams(shareholder)
            else if (InvitedTokenholderDescription.runtimeType().is(shareholder))
                return InvitedTokenholderDescription.fromParams(shareholder)
            else if (GithubTokenholdersDescription.runtimeType().is(shareholder))
                return GithubTokenholdersDescription.fromParams(shareholder)
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
                TokenholderDescription.runtimeType(),
                InvitedTokenholderDescription.runtimeType(),
                GithubTokenholdersDescription.runtimeType()
            ]))
        })
    }

}


export class CreateProjectTokenholdersDistributionParams {

    projectId: string

    shareholders: (TokenholderDescription | InvitedTokenholderDescription | GithubTokenholdersDescription)[] = []


    /** @deprecated */
    static validate(params: any) {
        return CreateProjectTokenholdersDistributionParams.runtimeType().is(params)
    }


    static runtimeType() {
        return Interface({
            shareholders: array(union([
                TokenholderDescription.runtimeType(),
                InvitedTokenholderDescription.runtimeType(),
                GithubTokenholdersDescription.runtimeType()
            ])),
            projectId: string
        })
    }
}