/* tslint:disable:max-classes-per-file */
type TVehicle = {
    cc: number
    name: string
}

type TMotorbike = TVehicle & {
    numberOfWheel: 2
}

interface IVehicle {
    numberOfWheel: number,
    cc: number
    name: string

    run(roar: string): string
}

interface IMotorbike extends IVehicle {
    numberOfWheel: 2
}

interface IA {
    method(x: string): string
}

interface IA {
    methodB(x: string): string
}

interface IA {
    methodC(x: string): string
}

let A: IA = {
    method(x: string): string {
        return "";
    }, methodB(x: string): string {
        return "";
    }, methodC(x: string): string {
        return "";
    }
}

/*interface IB extends IA {
    /!*Types of property 'method' are incompatible.
    Type '(x: number) => string' is not assignable to type '(x: string) => string'.
    Types of parameters 'x' and 'x' are incompatible.
    Type 'string' is not assignable to type 'number'.*!/
    method(x: number): string
}*/

type TA = {
    method(x: string): string
}

type TB = IA & {
    method(x: number): string
}

class A2 implements IA {
    method(x: string): string {
        return "";
    }

    methodB(x: string): string {
        return "";
    }

    methodC(x: string): string {
        return "";
    }

}

interface IC {
    methodC(x: number): string
}

interface ID {
    methodD(x: number): string
}

class C implements IC, ID {
    methodC(x: number): string {
        return "";
    }

    methodD(x: number): string {
        return "";
    }
}

class Foo {
    dummy: string = 'Foo'
}

class Bar {
    dummy: string = 'Bar'
}

function doSomething(obj: Foo) {
    console.log('I am:', obj.dummy)
}

let foo = new Foo()
let bar = new Bar()
doSomething(foo)
doSomething(bar)

class Doe {
    private dummy: string = 'Doe'
}
let doe = new Doe()
doSomething(doe)
