# lodash-amd-import package

Automatically imports used lodash modules in your code.

Meant to be used together with https://github.com/mokkabonna/lodash-requirejs-loader-plugin

Just use _.map _.flatten _.sortBy etc from lodash as you normally do, press **alt-l alt-i** and a import string of _!flatten,map,sortBy will be genereated and replace the existing _!... import string you have.


Go from
```js
define([
  '_!map'
], function(_) {

  var uniqueSquares = _.map(_.uniq(_.flatten([9, [2, 7], 7, 2, 2])), function(num) {
    return num * 2;
  });
});
```

to:

```js
define([
  '_!flatten,map,uniq'
], function(_) {

  var uniqueSquares = _.map(_.uniq(_.flatten([9, [2, 7], 7, 2, 2])), function(num) {
    return num * 2;
  });
});
```

just with a keystroke.

No longer used modules will be removed as well. The import list is always sorted.

**Currently only works if there is an existing _!... statement present.**
