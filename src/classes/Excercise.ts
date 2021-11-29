/* tslint:disable:max-classes-per-file */

// Exercise 1
// Differences between interfaces and Classes?
// 1. Interfaces model properties and are sort of blue prints while classes are concrete "things"
// 2. Interfaces do not generate Javascript code while classes do
// 3. Interfaces only exist at compile time while classes also exist at runtime

// Exercise 2
// Refresh final classes and what is the difference between private constructors in final classes Vs. protected constructor
class BFinalClass {
    private constructor(private attr: string) {
    }
}

const broken: BFinalClass = new BFinalClass('asd');

class CClass extends BFinalClass {
    constructor(attr: string) {
        super(attr);
    }
}

class ClassWithProtectedCtor {
    protected constructor(private attr: string) {
    }
}

// I can extend a class with a protected constructor
class DClass extends ClassWithProtectedCtor {
    constructor(attr: string) {
        super(attr);
    }
}

// ...but I cannot instantiate it
const classWithProtectedCtor = new ClassWithProtectedCtor('asd');

// Exercise 3:
type FactoryShoe = {
    (type: 'boot'): Boots,
    (type: 'slipper'): Slippers,
    (type: 'flip-flops'): FlipFlops
}

let shoeFactory: FactoryShoe = (type: 'boot' | 'slipper' | 'flip-flops'): Boots | Slippers | FlipFlops => {
    switch (type) {
        case "slipper":
            return new Slippers();
        case "boot":
            return new Boots();
        case "flip-flops":
            return new FlipFlops();
    }
}

interface Shoe {
    type: string
}

class Boots implements Shoe {
    type: string = 'boot'
}

class Slippers implements Shoe {
    type: string = 'slipper'
}

class FlipFlops implements Shoe {
    type: string = 'flip-flops'
}

const flipFlop = shoeFactory("flip-flops");
console.log(flipFlop);

interface MandatoryNumberBuilder {
    withDummyNumber(n: number): SendableMessageBuilder
}

interface MandatoryRecipientBuilder {
    withDummyRecipient(recipient: string): SendableMessageBuilder
}

interface SendableMessageBuilder {
    send(): void
}

// Exercise 4:
class ADummyBuilder implements ASendableMessageBuilder {

    private dummyText: string | undefined
    private dummyNumber: number | undefined
    private dummyRecipient: string | undefined

    public withDummyNumber(n: number): ASendableMessageBuilder {
        this.dummyNumber = n
        return this;
    }
}

class ASendableMessageBuilder implements SendableMessageBuilder {
    send(): void {
        console.log("Sending message")
    }
}

// Not Allowed
new ADummyBuilder()
    .send();

// Allowed
new ADummyBuilder()
    .withDummyNumber(5)
    .send();
