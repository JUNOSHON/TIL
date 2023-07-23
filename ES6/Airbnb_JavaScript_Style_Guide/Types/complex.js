const foo = [1, 2];
const bar = foo;

bar[0] = 9;
console.log(foo[0], bar[0]);
