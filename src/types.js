"use strict";
exports.__esModule = true;
console.log('Hello Typescript');
var a = 1 + 2;
var b = a + 3;
var c = {
    apple: a,
    banana: b
};
var d = c.apple + 4;
var e = {
    apple: a,
    banana: b
};
var f = 10;
var g = ['test'];
// The compiler does not like this as f is of type unknown
// let result = f + 20
if (typeof f === 'number') {
    var sum = f + 20;
    console.log(sum);
}
// The compiler does not like implicit any as per definition in the tsconfig.json
/*function doSomething(a) {
    console.log(a)
}
doSomething(7)*/
// console.log(c + e)
var h0 = { b: 'value' };
// onsole.log(h0.b) // The property b does not exist on type object
var h = { b: 'value', d: true };
console.log(h.b);
var j = { 10: 'ten' }; // Object with index signature
var danger = {}; // The compiler complains about this one and IT MUST be AVOIDED
var cat = {
    name: 'sgnapsi',
    purrs: true
};
var dog = {
    name: 'doggy',
    purrs: false,
    barks: true
};
var monster = {
    barks: true,
    purrs: false,
    name: 'monster',
    wags: true
};
function addItemsToArray() {
    var values = [];
    values.push('text');
    values.push(true);
    return values;
}
var array = addItemsToArray();
// array.push(10); // A number cannot be assigned to a type 'string | boolean'. When the type is outside the scope it was defined into, typescript makes it final
var singleton = [1];
var pair = [1, 2];
var triple = [1, 2, 3];
var tuple = [1, 2, 3, 4, 5]; // n-elements tuple with one mandatory element
var colorPalette = [true, 'Custom Color', '#FFFFFF'];
var notmodifyable = [1, 2, 3];
console.log(notmodifyable);
// notmodifyable.push(6); // the property push does not exist on type readonly
console.log('Hello');
console.log(notmodifyable.concat(6));
