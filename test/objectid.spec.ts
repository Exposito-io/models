import * as chai from 'chai'
import { ObjectId } from '../lib/objectid'
import 'reflect-metadata'

class Test {
    
    @ObjectId
    isObjectId: string

    isNotObjectId: string
}

describe('ObjectId decorator', () => {
    let t: Test

    beforeEach(() => {
        t = new Test()
    })

    it('adds ObjectId metadata to the right properties', () => {
        chai.assert.strictEqual(Reflect.hasOwnMetadata('ObjectId', t.constructor.prototype, 'isObjectId'), true)
        chai.assert.strictEqual(Reflect.hasOwnMetadata('ObjectId', t.constructor.prototype, 'isNotObjectId'), false)
    })

})