declare module 'js-money' {
   export class Money {
        amount: number
        currency: string

        /**
         * Creates a new Money instance.
         * The created Money instances is a value object thus it is immutable.
         */
        constructor(amount: number, currency: Object|string)

        static fromInteger(amount: number, currency: string): Money
        static fromDecimal(amount: number, currency: string): Money

        /**
         * Returns the amount represented by this object.
         */
        getAmount(): number

        /**
         * Returns the currency represented by this object.
         */
        getCurrency(): string

        /**
         * Returns true if the two instances of Money are equal, false otherwise.
         */
        equals(other: Money): boolean

        /**
         * Adds the two objects together creating a new Money instance that holds the result of the operation.
         */        
        add(other: Money): Money

        /**
         * Subtracts the two objects creating a new Money instance that holds the result of the operation.
         */       
        subtract(other: Money): Money

        /**
         * Multiplies the object by the multiplier returning a new Money instance that holds the result of the operation.
         */        
        multiply(multiplier: number, fn: Function): Money

        /**
         * Divides the object by the multiplier returning a new Money instance that holds the result of the operation.
         */        
        divide(divisor: number, fn: Function): Money

        /**
         * Allocates fund bases on the ratios provided returing an array of objects as a product of the allocation.
         */
        allocate(ratios: any[]): Money[]

        /**
         * Compares two instances of Money.
         */
        compare(other: Money): number


        /**
         * Checks whether the value represented by this object is greater than the other.
         */
        greaterThan(other: Money): boolean

        /**
         * Checks whether the value represented by this object is greater or equal to the other.
         */        
        greaterThanOrEqual(other: Money): boolean

        /**
         * Checks whether the value represented by this object is less than the other.
         */        
        lessThan(other: Money): boolean

        /**
         * Checks whether the value represented by this object is less than or equal to the other.
         */        
        lessThanOrEqual(other: Money): boolean

        /**
         * Returns true if the amount is zero.
         */
        isZero(): boolean

        /**
         * Returns true if the amount is positive.
         */        
        isPositive(): boolean

        /**
         * Returns true if the amount is negative.
         */        
        isNegative(): boolean

        /**
         * Returns the decimal value as a float.
         */
        toDecimal(): number

        /**
         * Returns the decimal value as a string.
         */        
        toString(): string

        /**
         * Returns a serialised version of the instance.
         */        
        toJSON(): {amount: number, currency: string}

    }    
}