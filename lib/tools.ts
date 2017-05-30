
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