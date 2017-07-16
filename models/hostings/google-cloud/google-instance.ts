import { Instance, CreateInstanceParams } from '../../instance'
import { copyMongoObject } from '../../../lib/tools'
import { ExpositoError, ErrorCode } from '../../exposito-error'


export class GoogleInstance extends Instance {

    // Google Compute instance name 
    instanceName: string

    machineType: string
    zone: string


    static fromParams(params: CreateGoogleInstanceParams | any) {
        Object.assign(params, new CreateGoogleInstanceParams())

        if (!CreateGoogleInstanceParams.validate(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        params = params as CreateGoogleInstanceParams

        let instance = new GoogleInstance()

        instance.instanceName = `i${params.organizationId}-${params.name}`
        instance.machineType = params.machineType
        instance.zone = params.zone


        return instance
    }


    static fromJSON(json: any): GoogleInstance {
        let instance = new GoogleInstance()

        copyMongoObject(instance, json)

        return instance
    }
}


export class CreateGoogleInstanceParams extends CreateInstanceParams {

    zone: string = 'us-central1-c'
    machineType: string
    disks: GoogleInstanceDiskParam[]


    static validate(params: CreateGoogleInstanceParams): boolean {
        // TODO

        return params.disks.every(GoogleInstanceDiskParam.validate)
            && true
    }
}


export class GoogleInstanceDisk {

    boot: boolean
    autoDelete: boolean
    source: string

}


export class GoogleInstanceDiskParam {
    initializeParams: GoogleInstanceDiskInitializeParams
    boot: boolean
    autoDelete: boolean
    source?: string

    static validate(params: GoogleInstanceDiskParam) {
        // TODO
        return true
    }
}

export class GoogleInstanceDiskInitializeParams {
    sourceImage: string
    diskName: string
    diskSizeGb: number
    diskType: any

    static validate(params: GoogleInstanceDiskInitializeParams) {
        // TODO
        return true
    }
}