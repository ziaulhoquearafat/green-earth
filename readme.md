1. What is the difference between var, let, and const? var, let, and const are
   used to make variables.

var: This is the old style. It is function-scoped. We don't use it much now.

let: This is a new style. It is block-scoped. You can change its value later.

const: This is also a new style and block-scoped. You cannot change its value
after you set it once.

Example:

-> Using let, we can change the value let age = 25; age = 26;

-> Using const, we cannot change the value const birthYear = 1998; birthYear =
1999; -> This will give an error.

2. What is the difference between map(), forEach(), and filter()? These are all
   for arrays.

forEach(): It just loops over each item in an array. It does not create a new
array.

map(): It loops over each item, does some work on it, and then returns a new
array with the results.

filter(): It loops over each item and checks a condition. It returns a new array
with only the items that pass the condition.

Example:

const numbers = [1, 2, 3, 4, 5];

-> forEach just prints each number numbers.forEach(num => { console.log(num);
});

-> map makes a new array where each number is multiplied by 2 const
doubledNumbers = numbers.map(num => num \* 2); -> doubledNumbers is now [2, 4,
6, 8, 10]

-> filter makes a new array with only the even numbers const evenNumbers =
numbers.filter(num => num % 2 === 0); -> evenNumbers is now [2, 4]

3. What are arrow functions in ES6? Arrow functions are just a shorter and
   simpler way to write a normal function.

Example:

// Normal function function add(a, b) { return a + b; }

// Same function as an arrow function const addArrow = (a, b) => a + b;

console.log(addArrow(5, 5)); // Prints 10

4. How does destructuring assignment work in ES6?

Destructuring is an easy way to take out values from an object or an array and
put them into separate variables.

Example:

// For an object const person = { name: 'Jamal', age: 30 };

const { name, age } = person; // Taking out name and age console.log(name); //
Prints 'Jamal'

// For an array const fruits = ['Apple', 'Banana']; const [first, second] =
fruits; // Taking out first and second fruit console.log(first); // Prints
'Apple'

5. Explain template literals in ES6.

-> Template literals are a better way to create strings. We use back-ticks (`)
instead of single or double quotes. It makes adding variables inside a string
very easy.

Example:

const myName = 'Kamal';

// Old way with string concatenation (+) const greetingOld = 'Hello, ' +
myName + '! Welcome.';

// New way with template literals const greetingNew =
`Hello, ${myName}! Welcome.`;

console.log(greetingNew); // Prints 'Hello, Kamal! Welcome.'
