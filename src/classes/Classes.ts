/* tslint:disable:max-classes-per-file */
class MyCustomSet {

    constructor(private values: number[]) {
    }

    delete(item: number): MyCustomSet {
        // remove it
        return this
    }

    // The add method returns this, meaning that if any class extends it, the subclass will
    // return the type of object of the implementor
    add(item: number): this {
        this.values = [...this.values, item]
        return this
    }
}

class FantasticCustomSet extends MyCustomSet {

    // In this case there is no reason for the FantasticCustomSet to implement add
    // If MyCustomSet had implemented the method using the superclass as return
    // add(item: number): MyCustomSet {
    // ...
    // }
    // then the Fantastic custom set must have implemented the add method.

    delete(item: number): MyCustomSet {
        return this;
    }

}