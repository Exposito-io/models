export class ExpositoError extends Error {

    code: ErrorCode

    constructor(code: ErrorCode, message?: string) {
        super(message != null ? message : defaultErrorMessages.get(code))

        this.code = code
    }
}


export enum ErrorCode {
    UNKNOWN = 0,
    INVALID_WALLET = 1,
    INVALID_PERIODIC_PAYMENT_OPTS = 2
}

const defaultErrorMessages = new Map<ErrorCode, string>([
    [ErrorCode.UNKNOWN, 'Unknown error'],
    [ErrorCode.INVALID_WALLET, 'Invalid wallet'],
    [ErrorCode.INVALID_PERIODIC_PAYMENT_OPTS, 'Invalid PeriodicPaymentOptions object']
])

