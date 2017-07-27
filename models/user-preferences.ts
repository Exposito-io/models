import { ObjectId } from '../lib/objectid'
import { Project } from './project'


export class UserPreferences {

    @ObjectId
    selectedProjectId: string

    selectedProject?: Project
    

}