
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

export function convertStringToEnum<T>(enumString: string): number {
    return new Number(enumString).valueOf()
}

export function validateEnum(enumToValidate, enumDef): boolean {
    if (typeof enumToValidate === 'string')
        enumToValidate = convertStringToEnum(enumToValidate)

    return enumToValidate in enumDef   
}