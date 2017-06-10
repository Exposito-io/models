
import { Money as TsMoney, Currencies, Currency, Rounding } from 'ts-money'


export class Money extends TsMoney {
    
    /**
     * Returns true if the amount is in Bitcoins,
     * Millibitcoins (mBTC) or satoshis
     */
    isBitcoin(): boolean {
        return BitcoinCurrencies.includes(this.currency)
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


export { Currencies, Rounding }