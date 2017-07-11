import { Instance, CreateInstanceParams } from '../../instance'
import { copyMongoObject } from '../../../lib/tools'
import { ExpositoError, ErrorCode } from '../../exposito-error'


export class GoogleInstance extends Instance {

    machinteType: string
    zone: string


    static fromParams(params: CreateInstanceParams) {
        Object.assign(params, new CreateGoogleInstanceParams())

        if (!CreateGoogleInstanceParams.validate(params))
            throw new ExpositoError(ErrorCode.INVALID_PARAMS)

        let instance = new GoogleInstance()


        return instance
    }


    static fromJSON(json: any): GoogleInstance {
        let instance = new GoogleInstance()

        copyMongoObject(instance, json)

        return instance
    }
}


export class CreateGoogleInstanceParams extends CreateInstanceParams {

    static validate(params: CreateGoogleInstanceParams): boolean {
        // TODO
        return true
    }
}