import { Instance, CreateInstanceParams } from '../../instance'
import { copyMongoObject } from '../../../lib/tools'
import { ExpositoError, ErrorCode } from '../../exposito-error'


export class GoogleInstance extends Instance {

    machineType: string
    zone: string


    static fromParams(params: CreateGoogleInstanceParams | any) {
        Object.assign(params, new CreateGoogleInstanceParams())

        if (!CreateGoogleInstanceParams.validate(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)
        
        params = params as CreateGoogleInstanceParams

        let instance = new GoogleInstance()
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


    static validate(params: CreateGoogleInstanceParams): boolean {
        // TODO
        return true
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
}

export class GoogleInstanceDiskInitializeParams {
    sourceImage: string
    diskName: string
    diskSizeGb: number
    diskType: any
}