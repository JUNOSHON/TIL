const someStack = [];

//bad
someStack[someStack.length] = 'abcdefg';

//good
someStack.push('abcdefg');
