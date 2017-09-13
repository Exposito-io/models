import { ObjectId } from '../lib/objectid'
import { Project } from './project'


export class UserPreferences {

    @ObjectId
    selectedProjectId: string

    selectedProject?: Project = new Project()

    notifications: NotificationPreferences = new NotificationPreferences()

}


export class NotificationPreferences {

    n1: boolean = false
    n2: boolean = false
    n3: boolean = false
    n4: boolean = false
    n5: boolean = false
    n6: boolean = false
    n7: boolean = false
}