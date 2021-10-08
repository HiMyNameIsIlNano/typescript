function f1(a: number, b: number) {
    return a + b
}

const r1 = f1(0, 1)

// Non-arrow functions are forbidden
const f2 = function (a: number, b: number) {
    return a + b
}
const r2 = f2(1, 1)

const f3 = (a: number, b: number) => {
    return a + b
}
const r3 = f3(1, 2)

const f4 = (a: number, b: number) => a + b
const r4 = f4(2, 2)

// This is a really bad idea for defining a function
const f5 = new Function('a', 'b', 'return a + b')
const r5 = f5(3, 2)

console.log('result: ' + r1 + ' ' + r2 + ' ' + r3 + ' ' + r4 + ' ' + r5)

const fWithOptional = (a: number, b?: boolean) => {
    if (b) {
        return a * 2
    }
    return a * 3
}
console.log('fWithOptional: ' + fWithOptional(5)) // 15
console.log('fWithOptional: ' + fWithOptional(5, true)) // 10
console.log('fWithOptional: ' + fWithOptional(5, false)) // 15

const fWithDefault = (a: number, b: number = 0) => a + b
console.log('fWithDefault: ' + fWithDefault(5)) // 5
console.log('fWithDefault: ' + fWithDefault(5, 1)) // 6

function varArgsParameters(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
}

console.log('varArgsParameters: ' + varArgsParameters(1, 2, 3))
console.log('varArgsParameters: ' + varArgsParameters(10, 20, 30, 40))

let x = {
    a() {
        return this // this is not allowed outside of class bodies (see: tslint.json `no-invalid-this`)
    }
}
const thees = x.a(); // thees is of type `a()`
console.log(thees) // `this` is in this case the function a() of x

const that = x.a
console.log(that()) // that is of type `() => a()` therefore the value returned by the function is undefined

function fancyDate() {
    return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}` // In this case the compiler complains that 'this' is of type any
}

console.log(`Fancy Date: ${fancyDate.call(new Date())}`)

// console.log(fancyDate()) // in this case this is null because nothing is passed to the function

function fancyDateWithExplicitThis(this: Date) {
    return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`
}

console.log(`Fancy Date with call: ${fancyDateWithExplicitThis.call(new Date())}`)
console.log(`Fancy Date with apply: ${fancyDateWithExplicitThis.apply(new Date())}`)

function* fibonacci() {
    let a = 0
    let b = 1
    // const c = 1
    while (1) {
        yield a; // This allows the generator to generate a new value. Yield b would have worked anyway. Yield c would have never worked
        [a, b] = [b, a + b] // Assign b to a, and assign b to a + b
    }
}
const generator = fibonacci();
console.log(`Next fibonacci value: ${generator.next().value}`)
console.log(`Next fibonacci value: ${generator.next().value}`)
console.log(`Next fibonacci value: ${generator.next().value}`)
console.log(`Next fibonacci value: ${generator.next().value}`)
console.log(`Next fibonacci value: ${generator.next().value}`)

let numbers = {
    *[Symbol.iterator]() {
        for (let n = 0; n <  5; n++) {
            yield n;
        }
    }
}
// Using an iterator
for (const n of numbers) {
    console.log(`current number: ${n}`)
}

const allNumbers = [...numbers];
console.log(`allNumbers: ${allNumbers}`)

const [zero, one, ...rest] = numbers
console.log(`zero: ${zero}, one: ${one}, rest: ${rest}`)

// This is a function defined as type and then implemented following the function signature
type Sum = (n: number, addend?: number) => number
let increment: Sum = (n, addend = 1) => {
    return n + addend;
}
console.log(`Increment 5 by 1: ${increment(5)}`)
console.log(`Increment 5 by 2: ${increment(5, 2)}`)

type Reserve = {
    (from: Date, to: Date, destination: string): number
    (from: Date, destination: string): number
}

// In order for the problem to be fixed we have to compose the signature by hand
let twoWayReservationOk: Reserve = (from: Date, toOrDestination: Date | string, destination?: string) => {
    if (toOrDestination instanceof Date) {
        // Roundtrip
    } else if (typeof toOrDestination === 'string') {
        // single leg trip
    }
    return 100
};

function createDummy(dummy: 'a'): number
function createDummy(dummy: 'b'): number
function createDummy(dummy: 'c'): number
function createDummy(dummy: string): number {
    return 10;
}

type name = {
    firstName: string
}
let Al: name = {firstName: 'Al'}
let John: name = {firstName: 'John'}
let Jack: name = {firstName: 'Jack'}
let names = [
    {firstName: 'Al'},
    {firstName: 'John'},
    {firstName: 'Jack'}
]

let namesInline: {firstName: string} [] = [
    {firstName: 'Al'},
    {firstName: 'John'},
    {firstName: 'Jack'}
]

type Filter = {
    (arr: number[], f: (item: number) => boolean): number[]
    (arr: string[], f: (item: string) => boolean): string[]
    (arr: object[], f: (item: object) => boolean): object[]
}

let filter: Filter = (array: (number | string | object)[], f: ((item: number) => boolean) | ((item: string) => boolean) | ((item: object) => boolean)): (string | number | object)[] => {
    const filtered = []
    for (const item of array) {
        if (f(item)) {
            filtered.push(item)
        }
    }
    return filtered
}
let result = filter(namesInline, _ => _.firstName.startsWith('A'))
console.log(result)

let result2 = filter(names, _ => _.firstName.startsWith('A'))
console.log(result2)

type GenericFilter = {
    <T>(arr: T[], f: (item: T) => boolean): T[]
}
let genericFilter: GenericFilter = (array, f) => {
    const filtered = []
    for (const item of array) {
        if (f(item)) {
            filtered.push(item)
        }
    }
    return filtered
}
let genericFilterResult = genericFilter(names, _ => _.firstName.startsWith('A'))
console.log(`Generic Filter Result: ${genericFilterResult}`)

let genericFilterResult2 = genericFilter([1, 2, 3, 4], _ => _ > 2)
console.log(`Generic Filter Result: ${genericFilterResult2}`)

type AnotherGenericFilter<T> = {
    (arr: T[], f: (item: T) => boolean): T[]
}
let stringGenericFilter: AnotherGenericFilter<string> = (array, f) => {
    const filtered = []
    for (const item of array) {
        if (f(item)) {
            filtered.push(item.toLowerCase())
        }
    }
    return filtered
}
let genericFilterResult3 = stringGenericFilter(['A', 'B', 'C', 'D'], _ => _ === 'A')
console.log(`String Filter Result: ${genericFilterResult3}`)


type PayloadVO = {
    id: number,
    buttonId: string
}
type MyEvent<T = PayloadVO> = {
    description: string,
    payload: T
}
// Warning having assigned a default value to the payload, it is not necessary to use the diamond annotation anymore
type EventWithPayload = MyEvent<PayloadVO>

type RandomVO = {
    id: number,
    generatedNumber: number
}
let randomNumberEvent: MyEvent<RandomVO> = {
    description: 'A newly generated number',
    payload: {
        id: 1,
        generatedNumber: 20
    }
}

function printEvent<T>(event: MyEvent<T>): void {
    console.log(`The following event was generated: ${event.description} and payload ${event.payload}`)
}
// In this case the type T is bound to RandomVO because the payload is of type RandomVO
printEvent(randomNumberEvent)

// In this case the type T is bound to string because the payload is of type string
printEvent({
    description: 'Another random event',
    payload: 'UUID12345'
})

type payload<T> = {
    data: T
}
type stringPayload = payload<string>
type numberPayload = payload<number>

function inspect<T extends payload<unknown>>(element: T): void {
    console.log(element.data)
}

const stringPayloadInstance: stringPayload = {
    data: 'Foo'
}
const numberPayloadInstance: numberPayload = {
    data: 10
}

inspect(stringPayloadInstance)
inspect(numberPayloadInstance)

type item = {
    id: number
}
type amount = {
    amount: number
}
function inspectWithIntersection<T extends item & amount>(element: T): void {
    console.log(`ID: ${element.id} and AMOUNT: ${element.amount}`)
}
let product: item & amount = {
    id: 15,
    amount: 10
}
inspectWithIntersection(product)

type ReserveApi = {
    (from: Date, to: Date, destination: string): number
    (from: Date, destination: string): number
    (destination: string): number
}

let reserveApiImpl: ReserveApi = (fromOrDestination: Date | string, toOrDestination?: Date | string, destination?: string) => {
    return 10;
}

// Assignment
type comparator<T, U = boolean> = (value: T, expected: T) => U
let compareNumbers: comparator<number> = (v1, v2) => {
    return v1 === v2
}
let compareStrings: comparator<string> = (v1, v2) => {
    return v1 === v2
}

const is = <T>(value: T, expected: T) => {
    return value === expected
}
function is1<T>(value: T, expected: T): boolean {
    return value === expected
}
function isNAry<T>(...args: T[]): boolean {
    const length = args.length;
    const expected = args[length - 1]
    for (let i = length - 2; i >= 0; i--) {
        if (args[i] !== expected) {
            return false
        }
    }
    return true;
}

console.log(`asd is test: ${is('asd', 'test')}`)
console.log(`asd is asd: ${is('asd', 'asd')}`)
console.log(`asd is empty: ${is('asd', '')}`)
console.log(`2 is 10: ${is(2, 10)}`)
console.log(`2 is 2: ${is(2, 2)}`)
// Expected to be wrong
console.log(`2 is asd: ${is(2, 'asd')}`)
console.log(`2 is 2: ${isNAry(2, 2)}`)
console.log(`2, 2 and 3: ${isNAry(2, 2, 3)}`)
// Expected to be wrong
console.log(`2, 2 and 3: ${isNAry(2, 2, 'asd')}`)

const numbers: number[] = [1, 2, 3]
console.log(`length: ${numbers.length}, numbers[2]: ${numbers[numbers.length - 1]}, numbers[1]: ${numbers[numbers.length - 2]}`)
