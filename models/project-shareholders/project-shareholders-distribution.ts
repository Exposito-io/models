import { ObjectId } from '../../lib/objectid'
import { ShareholderDescription } from './shareholder-description'

/**
 * Contains the basic share distribution for a specific project.
 * May contain Exposito users and/or github projects.
 * 
 * Since lines of code for projects varies over time, therefor
 * the shares distribution is not fixed either. See ProjectShareholdersSnapshot
 * for project shareholders distribution at a specific moment in time.
 */
export class ProjectShareholdersDistribution {

    id: string

    @ObjectId
    projectId: string

    shareholders: ShareholderDescription[]

}