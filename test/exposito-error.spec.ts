import * as chai from 'chai'
import { ExpositoError, ErrorCode } from '../models/exposito-error'


describe('ExpositoError', () => {


    beforeEach(() => {

    })

    it('keeps the right ErrorCode', () => {
        let error = new ExpositoError(ErrorCode.UNKNOWN)
        let invWalletError = new ExpositoError(ErrorCode.INVALID_WALLET, 'Test')

        chai.assert.strictEqual(error.code, ErrorCode.UNKNOWN)
        chai.assert.strictEqual(invWalletError.code, ErrorCode.INVALID_WALLET)
    })

    it('has a default error message', () => {
        let error = new ExpositoError(ErrorCode.UNKNOWN)

        chai.assert.notEqual(error.message, '')
    })

    it('overwrites the default error message if provided in constructor', () => {
        let customMessage = 'Custom message!'
        let error = new ExpositoError(ErrorCode.UNKNOWN, customMessage)

        chai.assert.strictEqual(error.message, customMessage)
    })

})