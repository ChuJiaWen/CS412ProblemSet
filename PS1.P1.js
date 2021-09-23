/* A function that takes a string as its input and returns a new string that contains all of the
letters in the original string, but in reverse alphabetical order. Ignore punctuation and numbers.
Duplicates are fine, so 'exioi' -> 'xoiie'.*/
let reverse_string = str => str.replace(/[^\w\s]|_/g, "").split("").sort().join('');
console.log("Reverse \"supercalifragilisticexpialidocious\" :",reverse_string('supercalifragilisticexpialidocious'))

