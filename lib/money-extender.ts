import * as Money from 'js-money'

export function moneyExtender(money) {
    for(let key in currencies) {
        money[key] = currencies[key]
    }
}


var currencies = {
    "mBTC": {
        "symbol": "mBTC",
        "name": "milli-bitcoin",
        "symbol_native": "mBTC",
        "decimal_digits": 5,
        "rounding": 0,
        "code": "mBTC",
        "name_plural": "milli-bitcoins"       
    },
    "satoshi": {
        "symbol": "sat",
        "name": "satoshi",
        "symbol_native": "sat",
        "decimal_digits": 0,
        "rounding": 0,
        "code": "sat",
        "name_plural": "satoshis"       
    }

}