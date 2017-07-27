 import { ObjectId } from '../../lib/objectid'
 import { Shareholder } from './shareholder'
 
 /** 
  * Since lines of code for projects varies over time, the shares
  * distribution is not fixed either. A ProjectShareholdersSnapshot
  * represents a project shareholders distribution at a specific moment 
  * in time.
  */
export class ProjectShareholdersSnapshot {
    
    id: string

    /**
     * Exposito project's Id
     */
    @ObjectId
    projectId: string

    /**
     * Moment of the snapshot
     */
    date: Date

    /**
     * All shareholders of the project
     * at the specific moment, with their
     * respective number of shares
     */
    shareholders: Shareholder[]

}