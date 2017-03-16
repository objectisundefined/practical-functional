var { List } = require('immutable-ext')

var res =
  List.of(x => y => z => [x, y, z].join('-'))
    .ap(List.of('tshirt', 'sweater'))
    .ap(List.of('white', 'black'))
    .ap(List.of('small', 'medium', 'large'))

console.log(res)

/*
List [ "tshirt-white-small", "tshirt-white-medium", "tshirt-white-large",
"tshirt-black-small", "tshirt-black-medium", "tshirt-black-large",
"sweater-white-small", "sweater-white-medium", "sweater-white-large",
"sweater-black-small", "sweater-black-medium", "sweater-black-large" ]
*/
