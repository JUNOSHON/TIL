//bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastNAme = user.lastName;
  
  return `${firstName} ${lastNAme}`;
}

//good
function getFullName(obj) {
  const {firstName, lastName} = obj;
  return `${firstName} ${lastName}`;
}


//best
function getFullName({firstName, lastName}) {
  return `${firstName} ${lastName}`;
}
