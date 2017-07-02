export class CreateOrganizationParams {

    name: string
    description: string

    members: OrganizationMemberParams[]



    static validate(param: CreateOrganizationParams): boolean {
        // TODO
        return true
    }
}


export class OrganizationMemberParams {
    userId: string
    roles: string[] = []

    static validate(orgMember: OrganizationMemberParams): boolean {
        // TODO
        return true
    }
}