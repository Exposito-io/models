
import { Money as TsMoney, Currencies, Currency, Rounding, RoundingMode } from 'ts-money'


export class Money extends TsMoney {
    


    /**
     * Returns true if the amount is in Bitcoins,
     * Millibitcoins (mBTC) or satoshis
     */
    isBitcoin(): boolean {
        return Money.isBitcoin(this.currency)
    }

    static isBitcoin(currency: string) {
        return BitcoinCurrencies.includes(currency.toUpperCase())
    }

    static isValidStringAmount(amount: string) {
        return new Number(amount).valueOf() !== NaN
    }

    static isValidCurrency(currency) {
        if (typeof currency === 'string')
            return Money.getCurrencyObject(currency) !== undefined
        else if (typeof currency === 'object') {
            return currency.name != null
                && currency.decimal_digits != null
                && currency.rounding != null
                && currency.code != null
        }
        else
            return false
    }


    static fromInteger(amount: number | any, currency?: string): Money {
        return Object.assign(Object.create(Money), TsMoney.fromInteger(amount, currency))
        // TODO: Object.freeze ?
    }

    static fromDecimal(amount: number | any, currency: string | any, rounder?: RoundingMode): Money {
        return Object.assign(Object.create(Money), TsMoney.fromDecimal(amount, currency, rounder))
        // TODO: Object.freeze ?
    }

    static fromStringDecimal(amount: string | any, currency: string | Currency | RoundingMode, rounding?: RoundingMode): Money {
        return Object.assign(Object.create(Money), TsMoney.fromStringDecimal(amount, currency, rounding))
        // TODO: Object.freeze ?
    }    
}

Currencies['satoshi'] = {
    "symbol": "sat",
    "name": "Satoshi",
    "symbol_native": "sat",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "satoshi",
    "name_plural": "Satoshis"
}

Currencies['mBTC'] = {
    "symbol": "mBTC",
    "name": "Millibitcoin",
    "symbol_native": "mBTC",
    "decimal_digits": 5,
    "rounding": 0,
    "code": "mBTC",
    "name_plural": "Millibitcoins"    
}


const BitcoinCurrencies = [
    'BTC',
    'mBTC',
    'satoshi'
].map(c => c.toUpperCase())


export { Currencies, Rounding, Currency }