console.log('Hello Typescript')

let a = 1 + 2
let b = a + 3
let c = {
    apple: a,
    banana: b
}
let d = c.apple + 4
let e = {
    apple: a,
    banana: b
}
let f: unknown = 10;
let g = ['test']

// The compiler does not like this as f is of type unknown
// let result = f + 20
if (typeof f === 'number') {
    const sum = f + 20
    console.log(sum)
}

// The compiler does not like implicit any as per definition in the tsconfig.json
/*function doSomething(a) {
    console.log(a)
}
doSomething(7)*/

// console.log(c + e)

let h0: object = { b: 'value' }
// onsole.log(h0.b) // The property b does not exist on type object

let h: { b: string, c?: number, d: boolean } = {b: 'value', d: true}
console.log(h.b);

let j: { [b: number]: string } = {10: 'ten'} // Object with index signature
let danger: Object = {} // The compiler complains about this one and IT MUST be AVOIDED

type age = number
type person = {name: string, age: age}
const person: person = {
    name: 'Jack',
    age: 20
}

type Cat = {name: string, purrs: boolean}
type Dog = {name: string, barks: boolean, wags: boolean}
type CatOrDogOrBoth = Cat | Dog
type CatAndDog = Cat & Dog

let cat: CatOrDogOrBoth = {
    name: 'sgnapsi',
    purrs: true
}

let dog: CatOrDogOrBoth = {
    name: 'doggy',
    purrs: false,
    barks: true
}

let monster: CatAndDog = {
    barks: true,
    purrs: false,
    name: 'monster',
    wags: true
}

function addItemsToArray() {
    const values = [];
    values.push('text')
    values.push(true)
    return values
}

let array = addItemsToArray();
// array.push(10); // A number cannot be assigned to a type 'string | boolean'. When the type is outside the scope it was defined into, typescript makes it final

const singleton: [number] = [1]
const pair: [number, number] = [1, 2]
const triple: [number, number, number] = [1, 2, 3]
const tuple: [number, ...number[]] = [1, 2, 3, 4, 5] // n-elements tuple with one mandatory element

type Color = string
const colorPalette: [boolean, string, ...Color[]] = [true, 'Custom Color', '#FFFFFF']

const notmodifyable: readonly number[] = [1, 2, 3];
console.log(notmodifyable)

// notmodifyable.push(6); // the property push does not exist on type readonly
console.log(notmodifyable.concat(6)) // A new instance is created here

function doNotReturnAnything() {
    const localVar: number = 4
}

function neverEnding(): never {
    while (true) {
        doNotReturnAnything()
    }
}

// Enum names are singular and Uppercase
// Here TSC infers the key indexes to be 0, 1, 2
enum ColorEnum {
    Red,
    Green,
    Blue
}

// I can also tell the TSC what number values I want my enum to have
enum LanguageEnum {
    Italian = 1,
    English = 5,
    German = 7
}

// Enums can also be merged together
enum BeverageEnum {
    Coffee = 0,
    Water = 1,
}
enum BeverageEnum {
    Tea = 2,
}
// In this case it is possible to access the enum via index, but the index is out of bound
console.log(BeverageEnum[6])

const enum ColorHexEnum {
    Red = '#fd024c',
    Green = '#02fdbf',
    Blue = '#022ffd'
}
console.log(ColorHexEnum[6]) // A const enum can only be accessed using the string literal
console.log(ColorHexEnum.Red)

const enum Cookable {
    Pasta,
    Pizza,
    Vegetables
}
function cookIt(cookable: Cookable) {
    console.log('Cooking: ' + cookable)
}
cookIt(Cookable.Pasta)
cookIt(25) // This is possible because we have defined the Cookable enum type to map numbers

const enum SaferCookable {
    Pasta = 'Pasta',
    Pizza = 'Pizza',
    Vegetables = 'Vegetables'
}
function cookItSafe(cookable: SaferCookable) {
    console.log('Cooking: ' + cookable)
}
cookItSafe(SaferCookable.Pasta)
cookItSafe(25) // It is not possible to call the function with a number as the enum maps string to string

const Y = {type: 'asd'}
const X = [1, true]

const H = null