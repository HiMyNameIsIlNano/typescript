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

function varArgsParameters (...numbers: number[]): number {
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
    return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`
}

console.log(`Fancy Date: ${fancyDate.call(new Date())}`)
console.log(fancyDate()) // in this case this is null because nothing is passed to the function