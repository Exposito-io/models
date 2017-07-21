import 'reflect-metadata'

/**
 * MongoDb ObjectId property decorator
 * Specifies that the property will be converted
 * to ObjectId when saved in the database
 * 
 * @param target 
 * @param key 
 */
export function ObjectId(target: any, key: string) {
    Reflect.defineMetadata('ObjectId', true, target, key)
}