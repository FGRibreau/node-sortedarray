SortedArray [![Build Status](https://drone.io/github.com/FGRibreau/node-sortedarray/status.png)](https://drone.io/github.com/FGRibreau/node-sortedarray/latest) [![Gittip](http://badgr.co/gittip/fgribreau.png)](https://www.gittip.com/fgribreau/)
-------------------



## NPM
Install the module with: `npm install sortedarray`

## Browser usage

```html
<script type="text/javascript" src="SortedArray.js"></script>
<script type="text/javascript">
var arr = sortedArray([12, 2, 30, 5, 10]); // <=> new SortedArray([12, 2, 30, 5, 10])
arr.toArray() // [2, 5, 10, 12, 30]

var cursor = arr.add(11);
arr.toArray() // [2, 5, 10, 11, 12, 30]

cursor.before; // 12
cursor.after; // 10

var arr2 = sortedArray(['a','c','b','d'], function compare(a, b){
  return a.charCodeAt(0)-b.charCodeAt(0);
});
arr2.toArray(); // ['a', 'b', 'c', 'd']
arr2.add('e');
arr2.toArray(); // ['a', 'b', 'c', 'd', 'e']
</script>
```

## NodeJS usage
```javascript
var sortedArray = require('sortedArray');

```

## Release History
v1.0.0 - Initial commit (23 apr. 2012)

## License
Copyright (c) 2013 Francois-Guillaume Ribreau
Licensed under the MIT license.
