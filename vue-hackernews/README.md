# Vue.js HackerNews clone

[Live demo](http://vuejs.github.io/vue-hackernews/)

Built with [Vue.js](http://vuejs.org), [vue-router](https://github.com/vuejs/vue-router) and the official [HackerNews API](https://github.com/HackerNews/API), with routing, comments, comment folding, user profile & realtime updates.

The build setup uses [Webpack](http://webpack.github.io/) and the [vue-loader](https://github.com/vuejs/vue-loader) plugin, which enables Vue components to be written in a format that encapsulates a component's style, template and logic in a single file.

If you are using SublimeText you can get proper syntax highlighting for `*.vue` files with [vue-syntax-highlight](https://github.com/vuejs/vue-syntax-highlight).

### Building
node v5.11.1

``` bash
npm install
# watch:
npm run dev
# build:
npm run build
```

### License
vue router中文文档
http://router.vuejs.org/zh-cn/index.html
**嵌套路由**
http://router.vuejs.org/zh-cn/nested.html

**你应该使用 v-link 而不是 href 来处理浏览时的跳转。原因如下：**
>它在 HTML5 history 模式和 hash 模式下的工作方式相同，所以如果你决定改变模式，或者 IE9 浏览器退化为 hash 模式时，都不需要做任何改变。
>在 HTML5 history 模式下，v-link 会监听点击事件，防止浏览器尝试重新加载页面。
>在 HTML5 history 模式下使用 root 选项时，不需要在 v-link 的 URL 中包含 root 路径

# Es6 study  step to step
>let 允许把变量的作用域限制在块级域中。与 var 不同处是：var申明变量要么是全局的，要么是函数级的，而无法是块级的

**let vs var**

```js
    'use strict';
    var a = 5;
    var b = 10;
    if (a === 5) {
      let a = 4; // The scope is inside the if-block
      var b = 1; // The scope is inside the function
      console.log(a);  // 4
      console.log(b);  // 1
    } 
    console.log(a); // 5
    console.log(b); // 1
    //let在循环中可以使用let关键字绑定变量在循环的范围而不是使用一个全局变量(使用var)定义.
    'use strict';
    for (let i = 0; i < 10; i++) {
      console.log(i); // 0, 1, 2, 3, 4 ... 9
    }
    console.log(i); // i is not defined
```

**const**
const这个声明创建一个常量,可以全局或局部的函数声明。
一个常量可以是全局的或者是局部的,常量遵循与变量相同的作用域规则。
一个常量不可以被重新赋值,并且不能被重复声明.所以,虽然可以在声明一个常量的时候不进行初始化,但这样做是没有意义的,因为这个常量的值永远会保持undefined。
一个常量不能和它所在作用域内的其他变量或函数拥有相同的名称。

```js
//good
const num = 10;
num =20;
console.log(num); // 10

//bed
const num = 10;
var num = 20;
console.log(num); // 'num' has already been declared
```

**块级作用域**
很多语言中都有块级作用域，JavaScript使用var声明变量，以function来划分作用域，大括号“{}” 却限定不了var的作用域。用var声明的变量具有变量提升（declaration hoisting）的效果。
ES6里增加了一个let，可以在{}， if， for里声明。用法同var，但作用域限定在块级，let声明的变量不存在变量提升。

```js
'use strict';
function f1() {
  var a = 1;
  let n = 2;
  if (true) {
      var a = 20;
      let n = 10;
  }
  console.log(n); // 2
  console.log(a); // 20
}
f1();
```

**包含字符串三种新方法**
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部
```js
var str = "Hello world!";
str.startsWith("world", 6) // true
str.endsWith("Hello", 5) // true
str.includes("Hello", 6) // false
```

**repeat()原字符串重复**

```js
var str = "x";
str.repeat(3) // "xxx"
var str1 = "hello";
str1.repeat(2) // "hellohello"
```

**模板字符串**
```js
let first = 'hubwiz';
let last = '汇智网';
document.write(`Hello ${first} ${last}!`);
// Hello hubwiz 汇智网!
```

**值是否整数**

```js
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false
```

**Math对象**

```js
Math.trunc(4.1) // 4
Math.trunc(-4.1) // -4
//Math.sign()：判断一个数到底是正数、负数、还是零。
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign('hubwiz'); // NaN
//Math.cbrt：计算一个数的立方根。
Math.cbrt(-1); // -1
Math.cbrt(0);  // 0
Math.cbrt(2);  // 1.2599210498948732
//Math.fround：返回一个数的单精度浮点数形式。
Math.fround(0);     // 0
Math.fround(1.337); // 1.3370000123977661
Math.fround(NaN);   // NaN
```

**将两类对象转为真正的数组**

```js
let array = Array.from({ 0: "a", 1: "b", 2: "c", length: 3 });
document.write(array);    // [ "a", "b" , "c" ]

let array = [0,1,2,3,4];
let arrNew = Array.from(array, x => x * x);
console.log(arrNew);
// 等同于
let arrNew = Array.from(array).map(x => x * x);
//0,1,4,9,16
```

**将值转换为数组**

```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

**找出第一个符合条件的数组成员和位置**

```js
let array = [1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) 
document.write(array);  // 10
```

**三个新的方法**
```js
//entries()  keys()  values()
//用于遍历数组。它们都返回一个遍历器，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
for (let index of ['a', 'b'].keys()) {
  document.write(index);
}
// 0
// 1
 
for (let elem of ['a', 'b'].values()) {
  document.write(elem);
}
// 'a'
// 'b'
 
for (let [index, elem] of ['a', 'b'].entries()) {
  document.write(index, elem);
}
// 0 "a"
// 1 "b"
```

**rest参数**
rest参数（形式为“...变量名”）可以称为不定参数，用于获取函数的多余参数，这样就不需要使用arguments对象了。
rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
```js
function add(...values) {
   let sum = 0;
   for (var val of values) {
      sum += val;
   }
   return sum;
}
add(1, 2, 3) // 6
```

**Promise的含义**

```js
//创建promise
var promise = new Promise(function(resolve, reject) {
    // 进行一些异步或耗时操作
    if ( /*如果成功 */ ) {
        resolve("Stuff worked!");
    } else {
        reject(Error("It broke"));
    }
});
//绑定处理程序
promise.then(function(result) {
    //promise成功的话会执行这里
    document.write(result); // "Stuff worked!"
}, function(err) {
    //promise失败会执行这里
    document.write(err); // Error: "It broke"
});
```

**Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。**

```js
getJSON("/posts.json").then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理前一个回调函数运行时发生的错误
  document.write('发生错误！', error);
});

//use promise
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});

//有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。
var p = Promise.resolve('Hello');
p.then(function (s){
  document.write(s)
});
// Hell
```

**export命令**
```js
//ES6允许将独立的JS文件作为模块，允许一个JavaScript脚本文件调用另一个脚本文件。
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958; 
export {firstName, lastName, year};

// main.js
import {firstName, lastName, year} from './profile';
function sfirsetHeader(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

**模块的整体输入**

```js
// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}
export function circumference(radius) {
  return 2 * Math.PI * radius;
}

//然后，main.js输入circlek.js模块。
// main.js
import { area, circumference } from 'circle';
document.write("圆面积：" + area(4));
document.write("圆周长：" + circumference(14));

//上面写法是逐一指定要输入的方法。另一种写法是整体输入
import * as circle from 'circle';
document.write("圆面积：" + circle.area(4));
document.write("圆周长：" + circle.circumference(14));

```

**module命令**
```js
//module命令可以取代import语句，达到整体输入模块的作用。
// main.js
module circle from 'circle';
document.write("圆面积：" + circle.area(4));
document.write("圆周长：" + circle.circumference(14));
```