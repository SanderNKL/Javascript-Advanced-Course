const logger = result => console.log('LOG:', result);

/* HIGHER ORDER METHODS: higherOrderMethod = (callbackFn) => doSomething(); */
const add = (a, b, callbackFn) => callbackFn(a + b);
add(1, 5, logger);

const subtract = (a, b, callbackFn) => callbackFn(a - b);
subtract(5, 1, result => console.log('ALSO A LOG:', result));

// forEach
const fruits = ['apple', 'strawberry', 'pear']
fruits.forEach(fruit => console.log('Fruit:', fruit));

// map
const names = ['Alice', 'Bob', 'Charlie', 'Dana'];
const nicknames = names.map(name => `The Amazing ${name}`);
console.log('Super heros:', names);

// some
const dungeonParty = ['Warrior', 'Mage', 'Rogue', 'Healer']; ;
const hasHealer = dungeonParty.some(name => name === 'Healer');
console.log('dungeonParty has healer:', hasHealer);

/* SHOP EXAMPLE: Reduce, Filter */
const gold = 1000;
const shop = [
    {
        "name": "Plot armor",
        "price": 9999
    },
    {
        "name": "Jobloop Caps",
        "price": 15
    },
    {
        "name": "Sword of the hero",
        "price": 500
    },
]

// sort - Returns a negative if a should come before b, or visa versa. Zero if they are equal. In which they don't change order.
const sortedShopHigh = shop.sort((a, b) => a.price - b.price);
console.log('Sorted shop by price, low-high:', sortedShopHigh);

// reduce
const priceTotal = shop.reduce((acc, currentValue) => acc + currentValue.price, 0);
console.log(`To buy the entire shop, you need: ${priceTotal}kr`)

// filter
const affordableItems = shop.filter(item => item.price <= gold);
console.log(`With ${gold} gold, you can afford:`, affordableItems);
