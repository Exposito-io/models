import { ObjectId } from '../../lib/objectid'
import { ShareholderDescription } from './shareholder-description'
import { InvitedShareholderDescription } from './invited-shareholder-description'
import { GithubShareholdersDescription } from './github-shareholders-description'

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

}