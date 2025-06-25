toyBox = [ 'teddy', 'dinosaur', 'robot' ];

// Spread Operator (...toyBox)
newToyBox = [ ...toyBox, 'unicorn', 'dragon' ]

// Pakk ut array og Rest Operator (...rest)
const [ firstToy, ...rest ] = toyBox;
console.log(newToyBox);

// ...rest med objekter.
const person = { name: 'Sander', age: 15 }
const newPerson = { ...person, city: 'Bergen'}
console.log(newPerson)

// Pakk ut objekt
// const { name, age, city } = newPerson;
// console.log(name, age, city)

// Challange:
const { name, ...userData } = newPerson;
console.log(name, userData)

// Default Verdier
const names = [undefined, null, 'Elida', 'Celine']
const [
    personOne='John',
    personTwo='Jonas',
    personThree='Erik',
    personFour='Patrik'
] = names;
console.log(
    'people:', personOne, personTwo, personThree, personFour
)

const employees = {
    employeeOne: {
        location: 'Bergen'
    },
    employeeTwo: undefined
}
const {
    employeeOne={location: 'Oslo'},
    employeeTwo={location: 'Oslo'}
} = employees;
console.log(employeeOne, employeeTwo)

// Nested Destructuring
const numbersArray = [
    [ 1, 2, 3 ],
    [ 4, 5, 6]
];
// const [[one, two, three], [four, five, six]] = numbersArray;
// console.log(one, two, three, four, five, six)

// Challange:
const [[one, two, three], [...numbers]] = numbersArray;
console.log(one, two, three, numbers)

// Functions
const mathFunctions = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
}
// console.log(mathFunctions.add(1, 2))
const { add } = mathFunctions;
console.log(add(1, 2))