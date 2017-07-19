

/**
 * Returns true if id is a valid MongoDB ObjectId string
 * 
 * @param id 
 */
export function validateObjectId(id: string): boolean {
    let regex = new RegExp("^[0-9a-fA-F]{24}$")

    return typeof id === 'string'
        && regex.test(id)
}

export function copyMongoObject(dest: any, src: any) {
    for(let key in src) {
        if (key === '_id' && isMongoObjectId(src[key]))
            dest.id = src[key].toHexString()
        else
            dest[key] = src[key]
    }
}

/**
 * Returns true if obj is an instance of 
 * mongodb ObjectId. Can be called on frontend
 * 
 * @param obj 
 */
export function isMongoObjectId(obj: any): boolean {
    return obj != null 
        && obj.generationTime != null 
        && obj.getTimestamp != null 
        && obj.toHexString != null
}

export function convertStringToEnum<T>(enumString: string): number {
    return new Number(enumString).valueOf()
}

export function validateEnum(enumToValidate, enumDef): boolean {
    if (typeof enumToValidate === 'string')
        enumToValidate = convertStringToEnum(enumToValidate)

    return enumToValidate in enumDef   
}