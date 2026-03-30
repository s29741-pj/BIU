const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n');
// TODO

const unit = lines[0]
const precision = Number(lines[1])
const amount = Number(lines[2])
const values = lines.slice(3).map(Number)


const formulas = {
  "CtoF": value => (value * 9/5) + 32,
  "FtoC": value => (value - 32) * 5/9,
  "kmToMi": value =>  value * 0.621371,
  "kgToLb": value => value * 2.20462,
  "miToKm": value => value / 0.621371,
}

function convert(unit){
  const formula = formulas[unit]
    return function(precision){
        return function(value){
           return formula(value).toFixed(precision);
        }
    }
}

const converter = convert(unit)(precision)  
values.forEach((value) => console.log(converter(value)))  







