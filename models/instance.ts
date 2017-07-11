import { HostingType } from './hosting-type'
import { copyMongoObject } from '../lib/tools'
import { ExpositoError, ErrorCode } from './exposito-error'

/**
 * Represents a VM instance
 * 
 */
export class Instance {

    id: string
    name: string
    description: string
    labels: string[]

    organizationId: string
    hostingType: HostingType


    static fromParams(params: CreateInstanceParams) {
        Object.assign(params, new CreateInstanceParams())

        if (!CreateInstanceParams.validate(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let instance = INSTANCE_TYPES_MAP.get(params.hostingType).fromParams(params)

        instance.name = params.name
        instance.description = params.description
        instance.labels = params.labels

        instance.organizationId = params.organizationId
        instance.hostingType = params.hostingType

        return instance
    }


    static fromJSON(json: any): Instance {

        let instance = INSTANCE_TYPES_MAP.get(json.type).fromJSON(json)
        
        instance.id = json.id || json._id.toHexString ? json._id.toHexString() : json._id
        instance.name = json.name
        instance.description = json.description
        instance.labels = json.labels

        instance.organizationId = json.organizationId
        instance.hostingType = json.hostingType

        return instance
    }

}

// TODO: Think of how to setup multiple hostings
// Since Google offers custom instance, maybe we could
// have one set of instance types for all the hosting providers
export class CreateInstanceParams {
    name: string
    description: string
    organizationId: string
    hostingType: HostingType = HostingType.GoogleCloud
    labels?: string[] = []
    


    static validate(params: CreateInstanceParams): boolean {
        // TODO
        return true
    }
}


import { GoogleInstance } from './hostings/google-cloud/google-instance'

const INSTANCE_TYPES_MAP = new Map<HostingType, typeof GoogleInstance>([
    [HostingType.GoogleCloud, GoogleInstance]
])

