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