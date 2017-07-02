import { ObjectID } from 'mongodb'
import { CreateOrganizationParams } from './api-params/create-organization-params'
import { copyMongoObject } from '../lib/tools'

export class Organization {

    id: string

    name: string
    description: string

    members: OrganizationMember[]

    static fromParams(params: CreateOrganizationParams): Organization {
        if (!CreateOrganizationParams.validate(params)) {
            // TODO
            throw 'Invalid params'
        }

        let organization = new Organization()
        organization.name = params.name
        organization.description = params.description
        organization.members = params.members.map(member => {
            let orgMember = new OrganizationMember()
            orgMember.userId = member.userId
            orgMember.roles = member.roles
            return orgMember
        })

        return organization
    }

    static fromJSON(json: any): Organization {
        let org = new Organization()

        copyMongoObject(org, json)

        org.members = json.members.map(member => OrganizationMember.fromJSON(member))

        return org
    }
}


export class OrganizationMember {
    userId: string
    roles: string[] = []

    static fromJSON(json: any): OrganizationMember {
        let member = new OrganizationMember()
        Object.assign(member, json)
        return member
    }
}