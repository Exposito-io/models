import { CreateOrganizationParams } from './api-params/create-organization-params'
import { HostingType } from './hosting-type'
import { copyMongoObject } from '../lib/tools'
import { ObjectId } from '../lib/objectid'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from './project-shareholders'


export class Project {

    id: string

    name: string
    description: string

    hosting: HostingType

    githubProjects: string[] = []

    members: ProjectMember[]

    static fromParams(params: CreateProjectParams): Project {
        if (!CreateProjectParams.validate(params)) {
            // TODO
            throw 'Invalid params'
        }

        let project = new Project()
        project.name = params.name
        project.description = params.description
        project.members = params.members.map(member => {
            let orgMember = new ProjectMember()
            orgMember.userId = member.userId
            orgMember.roles = member.roles
            return orgMember
        })

        return project
    }

    static fromJSON(json: any): Project {
        let org = new Project()

        copyMongoObject(org, json)

        org.members = json.members.map(member => ProjectMember.fromJSON(member))

        return org
    }
}


export class ProjectMember {

    @ObjectId
    userId: string

    roles: string[] = []

    static fromJSON(json: any): ProjectMember {
        let member = new ProjectMember()
        Object.assign(member, json)

        if (json.userId.toHexString)
            member.userId = json.userId.toHexString()

        return member
    }
}


export class CreateProjectParams {

    name: string
    description: string
    hosting: HostingType

    githubProjects: string[]

    members: ProjectMemberParams[]

    shareholders: (ShareholderDescription | InvitedShareholderDescription | GithubShareholdersDescription)[]



    static validate(param: CreateProjectParams): boolean {
        // TODO
        return true
    }
}




export class ProjectMemberParams {
    userId: string
    roles: string[] = []

    static validate(orgMember: ProjectMemberParams): boolean {
        // TODO
        return true
    }
}