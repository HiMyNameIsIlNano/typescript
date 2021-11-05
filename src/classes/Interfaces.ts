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

// let doe = new Doe()
// doSomething(doe)

type State = {
    [key: string]: string
}

class DatabaseString {
    state: State = {}

    getState(key: string): string | null {
        return key in this.state ? this.state[key] : null
    }

    setState(key: string, value: string) {
        this.state[key] = value
    }

    static from(state: State): DatabaseString {
        const db = new DatabaseString()
        for (const key in state) {
            db.setState(key, state[key])
        }
        return db
    }
}

console.log(typeof DatabaseString)

class MapWrapper<K, V> {

    private cache: unknown

    constructor(private key: K, private value: V) {
    }

    getKey(): K {
        return this.key
    }

    setKey(k: K): void {
        this.key = k
    }

    // This is a public instance method and it has access to K and V, but it adds two additional generics K1 and V1
    merge<K1, V1>(map: MapWrapper<K | K1, V | V1>): MapWrapper<K | K1, V | V1> {
        // do something with the input param
        return map
    }

    // As this method is static it has no access to the K and V types as they are instance level types
    static of<X, Y>(key: X, value: Y): MapWrapper<X, Y> {
        return new MapWrapper(key, value)
    }
}

const mapWrapper = new MapWrapper<string, number>("Hello", 5);
// This is a bit stupid but it works
mapWrapper.merge<number, boolean>(mapWrapper)

// This is the generic signature for a constructor that returns an object of type T and an arbitrary number of parameters
type ClassConstructor<T> = new(...args: any[]) => T

// This is basically defining a mixin that adds a debug feature to whatever object K and it uses a generic object with a 'getDebugValue' method
function withEZDebug<K extends ClassConstructor<{
    getDebugValue(): string
}>>(Class: K) {
    return class extends Class {
        debug() {
            return `My Mixin ${this.getDebugValue()}`
        }
    }
}

// This will be the class subject to the mixin
class Person {
    constructor(private name: string, private surname: string) {
    }

    getName() {
        return 'getName called'
    }

    getSurname() {
        return 'getSurname called'
    }

    getDebugValue() {
        // if the getDebugValue declared the following signature 'getDebugValue(): object' we might have returned { ... }
        // return { fullname: this.name + this.surname }

        return `${this.name} ${this.surname}`
    }
}

// We are adding the debug feature to a Person.
const DebuggerMixin = withEZDebug(Person)

// From here on we can use the debuggerMixin as if it were a Person
const debuggerMixin = new DebuggerMixin('Hi', 'There')
console.log(debuggerMixin.getName(), debuggerMixin.getSurname(), debuggerMixin.debug())

class AFinalClass {

    private constructor(private _description: string) {
    }

    getDescription(): string {
        return this._description;
    }

    // This method can be used when we want to be able to instantiate a class, but do not want to permit extendibility.
    public static create(description: string): AFinalClass {
        return new AFinalClass(description)
    }
}

const aFinalClass = AFinalClass.create('dummy');
console.log(aFinalClass.getDescription())

// error TS2675: Cannot extend a class 'AFinalClass'. Class constructor is marked as private.
/*
class AFinalExtended extends AFinalClass {
}*/
