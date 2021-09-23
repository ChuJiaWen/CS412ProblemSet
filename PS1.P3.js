/* A function that takes two inputs: a string and a decorator function, and returns the result of running the
* decorator function using the input string */
let execute = (str, func) => func(str);
/*inspiration comes from Lookahead Zero-length Assertion in regex:
 1.https://newbedev.com/js-string-split-without-removing-the-delimiters
 2.https://www.regular-expressions.info/lookaround.html
 3.https://medium.com/@shemar.gordon32/how-to-split-and-keep-the-delimiter-s-d433fb697c65
  the RegExp /ar/ will look all occurrences of "ar" in the string
  (?=_): a positive lookahead
  global flag "/g" ensures that the RegExp finds matches throughout the entire string
 */
console.log("Execution 1:",execute('supercalifragilisticexpialidocious', (str => str.split(/(?=c)/g))))

/*  A function that replaces all of the ‘a’ characters in a string with ‘A’ characters.
    Dummy approach. First split the string into list of characters and check one by one.
 */
let fun2 = string =>{
    let output_string = ""
    let char_list = string.split("");
    let count=0;
    let length = char_list.length;
    for (let i=0; i< length; i++){
        const char = char_list[i];
        if (char == "a"){
            output_string += "A";
            count++;
        }else{
            output_string += char;
        }
    }
    let output = [
        {originalString: string,
        modifiedString: output_string,
        numberReplaced: count,
        length: length}
    ]
    return output
};
console.log("Execution 2:")
console.table(execute("supercalifragilisticexpialidocious",fun2));

