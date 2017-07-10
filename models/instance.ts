import { HostingType } from './hosting-type'
import { copyMongoObject } from '../lib/tools'

/**
 * Represents a VM instance
 * 
 */
export class Instance {

    id: string
    name: string
    labels: string[]

    organizationId: string
    hostingType: HostingType


    fromParams(params: CreateInstanceParams) {

    }

    fromJSON(json: any): Instance {

        let wallet = INSTANCE_TYPES_MAP.get(json.type)(json)
        
        copyMongoObject(wallet, json)

        return wallet
    }

}

// TODO: Think of how to setup multiple hostings
// Since Google offers custom instance, maybe we could
// have one set of instance types for all the hosting providers
export class CreateInstanceParams {
    name: string
    organizationId: string
    hostingType: HostingType = HostingType.GoogleCloud
    labels?: string[] = []
    


    static validate(params: CreateInstanceParams): boolean {
        // TODO
        return true
    }
}



const INSTANCE_TYPES_MAP = new Map<HostingType, Function>([
    [HostingType.GoogleCloud, BitcoinWallet.fromJSON]
])

