
# DESCTRUCTURING A LIST
## 1. Lag en liste
Vi skal se på hvordan vi kan hente ut verdier fra en liste på en enkel måte.

Først lager vi en liste med leketøy:

```js
toyBox = [ 'teddy', 'dinosaur', 'robot' ];
```

## 2. Hente ut de første elementene
Så skal vi hente ut de første to leketøyene.

```js
const [ firstToy, secondToy ] = toyBox;
console.log(firstToy, secondToy);
```
Her tar vi de tre første verdiene i rekkefølge og lagrer dem i variablene firstToy og secondToy.

### Navnene betyr ingenting!
Det er viktig å forstå at navnet på variablene ikke spiller noen rolle. JavaScript bryr seg ikke om hva du kaller variablene – det bare henter ut verdiene i riktig rekkefølge.

La oss teste dette: (Bytt ut secondToy med ThirdToy)
```js
const [ firstToy, thirdToy ] = toyBox;
console.log(firstToy, secondToy);
```
Du tenker kanskje: "Vi får `Teddy & Robot`?".
Men nei! Vi får `Teddy & Dinosaur`!

#### Hvorfor?
Det er fordi 'thirdToy' står plassert som nummer to i destrukteringen vår, og tror derfor at thirdToy representerer det andre elementet i listen.

Javascript, når du destrukturerer arrays, har ingen måte å lese variabelnavnet og skjønne at du ønsker det tredje elementet. Det er derfor viktig at du setter opp variablene i rekkefølgen som samsvarer med listen. Denne regelen gjelder ikke for Objekter, og det kommer vi til snart.


## 3. ...rest (Rest Operator)
Vi kan bruke en spesiell teknikk kalt rest-operator (...) for å hente resten av tallene i arrayet. (ex: ...rest)

```js
const toyBox = ['teddy', 'dinosaur', 'robot'];
const [ firstToy, ...rest ] = toyBox;
console.log(firstToy, rest);
```
Output: `'teddy, Array['dinosaur', 'robot']`
(Verifiser i console log)

## 4. ...spread (Spread Operator)
Når vi bruker spread-operatoren kan vi kopiere data, og legge til noe nytt.
```js
const toyBox = ['teddy', 'dinosaur', 'robot'];
const biggerToyBox = [
    [ ...toyBox ],
    [ 'knight', 'unicorn', 'dragon']
];
```
Output: `1, 2, 3, 4, 5, 6, 7, 8`

### Du kan også bruke spread-operatoren til å kopiere et objekt:
```js
const person = { name: "Alex", age: 25 };
const newPerson = { ...person, city: "Oslo" };

console.log(newPerson); 
```
Output: `{ name: "Alex", age: 25, city: "Oslo" }`

## 4. Pakk ut objekter
Destrukturering fungerer ikke bare for lister, men også for objekter! La oss se på hvordan vi kan hente ut verdier fra et objekt.

#### Eksempel:
Vi starter med et objekt som inneholder informasjon om en person:
```js
const person = {
  name: "Alice",
  age: 25,
  city: "Oslo"
};
```

#### Hvordan pakke ut verdier fra objektet?
Som jeg nevnte tidligere, når vi destrukturerer lister, kan vi gi variablene hvilket som helst navn, og det spiller ingen rolle. Det er rekkefølgen som bestemmer hvilken verdi variabelen får.

Men når vi destrukturerer objekter, må variabelnavnene samsvare med nøklene (keys) i objektet, fordi JavaScript bruker nøkler til å finne verdiene.

La oss se på hvordan vi gjør dette.

```js
const { name, age, city } = person;
console.log(name, age, city);
```

Det at vi bruker navnet på nøkkelen betyr at rekkefølge ikke har noe å si når vi pakker ut objekter.
Det betyr at jeg kan velge hvilke variabler som jeg ønsker å hente ut, og i hvilken som helst rekkefølge:

```js
// Eksempel 1
const { name, city } = person;
console.log(name, city);
```
Output: `name, city` 
```js
// Eksempel 2
const { city, name, age } = person;
console.log(name, age, city);
```
Output: `name, age, city` 

### 👉 Spørsmål til deltakerne:
Kan dere en annen måte vi kan pakke ut **alle** verdiene som vi ikke allerede har pakket ut fra objektet vårt? 

(La dem svare – vi håper de sier noe sånt som: "Kan vi bruke `...rest` operatoren for å hente de andre verdiene")

```js
const { city, ...rest } = person;
console.log(city);
console.log(rest);
```

## 5. Default Verdier
Nå skal vi se på default verdier.

Vi begynner med å lage en tom liste, og så lager vi en liste med variabler som har en default verdi.
```js
const names = []
const [ a='John', b='Jonas', c='Erik', d='Patrik' ] = names;
console.log(a, b, c, d)
```

Output: `John Jonas Erik Patrik`

### 👉 Spørsmål til deltakerne:
Hva tror dere skjer visst jeg putter noen verdier inn i names arrayet vårt nå?

(La dem svare – vi håper de sier noe sånt som: "Da vil de nye verdiene overskrive default-verdiene")

### Vis hva som skjer.
```js
const names = [ "Alice", "Bob", "Charlie", "David" ];
const [ a='John', b='Jonas', c='Erik', d='Patrik' ] = names;
console.log(a, b, c, d)
```
Output: `Alice Bob Charlie David`

### 👉 Spørsmål til deltakerne:
Hva tror dere skjer hvis vi fjerner "David" fra names-lista?

(La dem svare – vi håper de sier noe sånt som: "Da vil `d` få verdien `Patrik` fordi det er default-verdien.")

```js
const names = [ "Alice", "Bob", "Charlie" ];
const [ a='John', b='Jonas', c='Erik', d='Patrik' ] = names;
console.log(a, b, c, d)
```
Output: `Alice Bob Charlie Patrik`

### DEFAULT VERDIER MED OBJEKTER
Vi kan også ha default verdier med objekter.
```js
const { b = 2 } = { b: undefined };
console.log(b)
```
Output: `2`

Default vil kun erstatte verdien til key-en dersom verdien er undefined.

```js
const { b = 2 } = { b: null };
console.log(c);
```
Output: `null`

# 6. Nested destructuring
Destructuring kan også hjelpe oss med mer komplekse arrays.
For eksempel, Nested arrays!

```js
const numbersArray = [
    [ 1, 2, 3 ],
    [ 4, 5, 6]
];
const [[one, two, three], [four, five, six]] = numbersArray;
console.log(one, two, three, four); 
```

```js
const numbers = [1, [2, 3], 4, 5];
const [one, [two, three], four] = numbers;
console.log(one, two, three, four); 
```
Output: `1, 2, 3, 4, 5`

### 👉 Spørsmål til deltakerne:
Hva tror dere skjer dersom vi skriver programmet vårt slik?
```js
const numbers = [1, [2, 3], 4, 5];
const [[one, two, three], [...rest]] = numbersArray;
console.log(one, two, three, four); 
```

