import { ObjectId } from '../../lib/objectid'
import { ShareholderDescription } from './shareholder-description'
import { InvitedShareholderDescription } from './invited-shareholder-description'
import { GithubShareholdersDescription } from './github-shareholders-description'
import { ProjectTokenholdersSnapshot } from './project-tokenholders-snapshot'
import { ExpositoError, ErrorCode } from '../exposito-error'
import { interface as Interface, string, union, array } from 'io-ts'


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

    /** Exposito project's Id */
    @ObjectId projectId: string

    shareholders: (ShareholderDescription | InvitedShareholderDescription | GithubShareholdersDescription)[]

    lastSnapshot?: ProjectTokenholdersSnapshot


    static fromParams(params: CreateProjectShareholdersDistributionParams): ProjectShareholdersDistribution {
        if (!CreateProjectShareholdersDistributionParams.runtimeType().is(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let shareholders = new ProjectShareholdersDistribution()
        shareholders.projectId = params.projectId
        shareholders.shareholders = params.shareholders.map(shareholder => {
             if (ShareholderDescription.runtimeType().is(shareholder))
                return ShareholderDescription.fromParams(shareholder)
            else if (InvitedShareholderDescription.runtimeType().is(shareholder))
                return InvitedShareholderDescription.fromParams(shareholder)
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
                InvitedShareholderDescription.runtimeType(),
                GithubShareholdersDescription.runtimeType()
            ]))
        })
    }

}


export class CreateProjectShareholdersDistributionParams {

    projectId: string

    shareholders: (ShareholderDescription | InvitedShareholderDescription | GithubShareholdersDescription)[] = []


    /** @deprecated */
    static validate(params: any) {
        return CreateProjectShareholdersDistributionParams.runtimeType().is(params)
    }


    static runtimeType() {
        return Interface({
            shareholders: array(union([
                ShareholderDescription.runtimeType(),
                InvitedShareholderDescription.runtimeType(),
                GithubShareholdersDescription.runtimeType()
            ])),
            projectId: string
        })
    }
}