
//const와 let은 선언된 블록의 안에서만 존재한다.
{
  let a = 1;
  const b = 1;
}
console.log(a); //ReferenceError
console.log(b); //ReferenceError
