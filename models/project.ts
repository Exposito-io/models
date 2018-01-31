import { CreateOrganizationParams } from './api-params/create-organization-params'
import { HostingType } from './hosting-type'
import { copyMongoObject } from '../lib/tools'
import { ObjectId } from '../lib/objectid'
import { ProjectTokenholdersDistribution, TokenholderDescription, InvitedTokenholderDescription, GithubTokenholdersDescription } from './project-tokenholders'
import { interface as Interface, string, union, array, any } from 'io-ts'
import { ProjectTokenholdersSnapshot } from './project-tokenholders/project-tokenholders-snapshot';


/** Exposito project */
export class Project {

    id: string

    name: string
    description: string

    contractAddress: string

    githubProjects: string[] = []

    /**
     *  Tokenholder distribution for the project.
     *  Token distribution is stored in a separate mongodb collection since it
     *  will be managed in a smart contract in the near future
     */
    tokenDistribution?: ProjectTokenholdersDistribution

    lastTokenholdersSnapshot?: ProjectTokenholdersSnapshot

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


    static runtimeType() {
        return Interface({
            name: string,
            description: string,
            //members: array(any)
        })
    }    
}


export class ProjectMember {

    @ObjectId userId: string

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

    githubProjects: string[]

    members: ProjectMemberParams[]

    shareholders: (TokenholderDescription | InvitedTokenholderDescription | GithubTokenholdersDescription)[]



    static validate(param: CreateProjectParams): boolean {
        // TODO
        return param instanceof Object
            && typeof param.name === 'string'
            && param.name != null
            && typeof param.description === 'string'
            && param.description != null
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