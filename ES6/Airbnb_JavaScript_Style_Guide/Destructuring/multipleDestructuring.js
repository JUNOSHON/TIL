//bad
function processInput(input) {
  
  return [left, right, top, bottom];
}
//호출처에서 구조분해로 반환된 데이터의 순서를 고려해야함

const [left, _, top] = processInput(input);

//good
function processInput(input) {
  
  return {left, right, top, bottom};
}
//호출처에서 필요한 데이터만 선택할 수 있음.
const {left, right} = processInput(input);
