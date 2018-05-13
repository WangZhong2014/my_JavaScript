## 1.检查字符串结尾
题目要求：检查字符串结尾
判断一个字符串(str)是否以指定的字符串(target)结尾。 如果是，返回true;如果不是，返回false。
```js

function confirmEnding(str,target){
    return str.slice(-target.length) === target
};

function confirmEnding(str,target) {
  return R.endWith(target,str);
}

```

## 2.找出多个数组中的最大数
下面的大数组中包含了4个小数组，分别找到每个小数组中的最大值，然后把它们串联起来，形成一个新数组。

提示：你可以用for循环来迭代数组，并通过arr[i]的方式来访问数组的每个元素。
```js
function largestOfFour(arr) {
  // 请把你的代码写在这里
  return arr;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

function largestOfFour(arr) {
    let dir = [];
    let diff = function diff(a,b) {
        return b-a
    };

    arr.forEach(item=>{
        R.sort(diff,item)
        dir.push(item[0]);    
    });
    return dir;
  }
  
function largestOfFour(arr) {
     return R.map(R.apply(Math.max),arr);
  };
  
let b =   largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
  console.log(b);
```

### 3. 计算一个整数的阶乘
如果用字母n来代表一个整数，阶乘代表着所有小于或等于n的整数的乘积。

阶乘通常简写成 n!
```js
const R = require("../犀牛书学习笔记/node_modules/ramda");

function factorialize(num){

   return R.product(R.range(1,num+1));
};

console.log(factorialize(5));
```

### 4. 截断字符串
如果字符串的长度比指定的参数num长，则把多余的部分用...来表示。

切记，插入到字符串尾部的三个点号也会计入字符串的长度。

但是，如果指定的参数num小于或等于3，则添加的三个点号不会计入字符串的长度。
```js
const R = require('../犀牛书学习笔记/node_modules/ramda');

function truncate(str,num){
    R.cond([
   [R.lte(str.length),R.always(str)],
   [R.gte(3),(num)=>str = str.slice(0,num)+'...'],
   [R.lt(3),(num)=>str = str.slice(0,num-3)+'...'],
])(num);

   return str;
};

console.log(truncate("A-tisket a-tasket A green and yellow basket", 11));
```

### 5.回文
如果给定的字符串是回文，返回true，反之，返回false。

如果一个字符串忽略标点符号、大小写和空格，正着读和反着读一模一样，那么这个字符串就是palindrome(回文)。

注意你需要去掉字符串多余的标点符号和空格，然后把字符串转化成小写来验证此字符串是否为回文。

函数参数的值可以为"racecar"，"RaceCar"和"race CAR"。
```js
function palindrome(str) {
   str = R.toLower(str.match(/[a-zA-Z0-9]+/g));
   rts = R.reverse(str);
   c
   return rts === str
};

// console.log(palindrome('A man, a plan, a canal. Panama'));
// console.log(palindrome('1 eye for of 1 eye.'));
console.log(palindrome('0_0 (: /-\ :) 0-0'));

// 另一种方法

function palindrome(str) {
   str = R.toLower(str).match(/[a-zA-Z0-9]+/gi);
   rts = R.reverse(str);
   return R.equals(str,rts);
};

// console.log(palindrome('A man, a plan, a canal. Panama'));
// console.log(palindrome('1 eye for of 1 eye.'));
console.log(palindrome('0_0 (: /-\ :) 0-0'));
```

## 摧毁数组
金克斯的迫击炮！

实现一个摧毁(destroyer)函数，第一个参数是待摧毁的数组，其余的参数是待摧毁的值。
```js
function destroyer(arr) {
    // 请把你的代码写在这里
    args = R.drop(1,arguments);
    return R.without(args,arr);
  };
  
var a=   destroyer([3, 5, 1, 2, 2], 2, 3, 5);
console.log(a);

// ...args可以传参
function destroyer(arr, ...args) {
    console.log(args);
    return R.without(args, arr);
}

var a = destroyer(["tree", "hamburger", 53], "tree", 53);
console.log(a);
```


### 截断数组
返回一个数组被截断n个元素后还剩余的元素，截断从索引0开始。
```js

function slasher(arr, howMany) {
    return R.drop(howMany,arr);
  };

slasher([1, 2, 3], 2);
```

### 猴子分香蕉
猴子吃香蕉可是掰成好几段来吃哦）

把一个数组arr按照指定的数组大小size分割成若干个数组块。

例如:chunk([1,2,3,4],2)=[[1,2],[3,4]];
```js
chunk([1,2,3,4,5],2)=[[1,2],[3,4],[5]];

function chunk(arr, size) {
  // 请把你的代码写在这里
  return R.splitEvery(size,arr);
}

chunk(["a", "b", "c", "d"], 2);

function chunk(arr, size) {
    var result = [];
    var idx = 0;
    while (idx < arr.length) {
      result.push(arr.slice(idx, idx += size));
    }
    return result;
  };
  
  chunk(["a", "b", "c", "d"], 3);
```


#### 题目要求：赌场21点游戏
在赌场21点游戏中，玩家可以通过计算牌桌上已经发放的卡牌的高低值来让自己在游戏中保持优势，这就叫21点算法。

根据下面的表格，每张卡牌都分配了一个值。如果卡牌的值大于0，那么玩家应该追加赌注。反之，追加少许赌注甚至不追加赌注。

| Count | Change | Cards |
|-|-|
|+1	|2, 3, 4, 5, 6|
|0	|7, 8, 9|
|-1	|10, 'J', 'Q', 'K', 'A'|

你需要写一个函数，实现21点算法，它根据参数 card的值来递增或递减变量count，函数返回一个由当前count和 "Bet"(count>0)或"Hold"(count<=0) 拼接的字符串。注意count和"Bet" 或 "Hold"应该用空格分开。

```js

function cc(card) {
    let count = 0;
    const rank = {
        '2':1,
        '3':1,
        '4':1,
        '5':1,
        '6':1,
        '7':0,
        '8':0,
        '9':0,
        '10':-1, 
        'J':-1, 
        'Q':-1,
        'K':-1,
        'A':-1
    };
    let str = '';

    count = R.reduce(R.add,0,R.props(card,rank));
    R.cond([
        [R.lt(0), count=> str = `${count} Bet`],
        [R.gte(0),count=> str = `${count} Hold`]
    ])(count);
    return str;
};

```

### 过滤数组假值
要求：删除数组中的所有假值。

在JavaScript中，假值有false、null、0、""、undefined 和 NaN。
```js
function bouncer(arr) {

const isFalsites = [NaN,0,false,'',null,undefined];
return R.difference(arr,isFalsites);
};

console.log(bouncer([7, "ate", "", false, 9]));
```

### 凯撒密码

（让上帝的归上帝，凯撒的归凯撒）

下面我们来介绍风靡全球的凯撒密码Caesar cipher，又叫移位密码。

移位密码也就是密码中的字母会按照指定的数量来做移位。

一个常见的案例就是ROT13密码，字母会移位13个位置。由'A' ↔ 'N', 'B' ↔ 'O'，以此类推。

写一个ROT13函数，实现输入加密字符串，输出解密字符串。

所有的字母都是大写，不要转化任何非字母形式的字符(例如：空格，标点符号)，遇到这些特殊字符，跳过它们。

```js

function rot13(str) { 
    return str.replace((/[A-Z]/g),(element)=>{
        let b = element.charCodeAt(0);
        let item;
        R.cond([
            [R.gte(77),(b)=> item = String.fromCharCode(b+13)],
            [R.lt(77),(b)=> item = String.fromCharCode(b-13)],
        ])(b);
        return element = item;
    });
};

var a= rot13("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK.");  // 你可以修改这一行来测试你的代码
console.log(a);

---
//大师兄写的：

function rot13(str) {
  str = str.split('');
  str = str.map(function (item) {
    var charCode = item.charCodeAt(item);
    if (charCode < 65 || charCode > 90) return item;
    return String.fromCharCode((charCode % 78) >= 65 ? (charCode + 13) : ((charCode % 78) + 65));
  });
  str = str.join('');

```

### 检查对象属性是否存在
有时检查一个对象属性是否存在是非常有用的，我们可以用.hasOwnProperty(propname)方法来检查对象是否有该属性。如果有返回true，反之返回 false。

举例
```js
var myObj = {
  top: "hat",
  bottom: "pants"
};
myObj.hasOwnProperty("top");    // true
myObj.hasOwnProperty("middle"); // false
```
任务
修改函数checkObj检查myObj是否有checkProp属性，如果属性存在，返回属性对应的值，如果不存在，返回 "Not Found"。

注意：如果你需要通过变量来访问对象的属性值，请用中括号操作符，点操作符不支持变量。
```js
  function checkObj(checkProp) {
    return R.has(checkProp,myObj);
  };
  
```

### 循环
```js
for (i=9;i>0;i--) {
    if(i % 2 === 0) {
        continue
    } else { 
        myArray.push(i);
    };
};
console.log(myArray);

myArray = R.range(1,6);
isOld = (x) => x % 2 !== 0;
myArray1 = R.filter(isOld,R.range(1,10));
myArray2 = R.reverse(myArray1);
total = R.sum(myArray);
console.log(myArray,myArray1,myArray2,total);
```
### 循环的嵌套
如果你有一个二维数组，可以使用相同的逻辑，先遍历外面的数组，再遍历里面的子数组。下面是一个例子：
```js
var arr = [
  [1,2], [3,4], [5,6]
];
for (var i=0; i < arr.length; i++) {
  for (var j=0; j < arr[i].length; j++) {
    console.log(arr[i][j]);
  }
}
```

一次输出 arr 中的每个子元素。提示，对于内部循环，我们可以通过 arr[i] 的 .length 来获得子数组的长度，因为 arr[i] 的本身就是一个数组。

任务
修改函数 multiplyAll，获得 arr 内部数组的每个数字相乘的结果 product。
```js
  function multiplyAll(arr) {
    return R.product(R.flatten(arr));
};
```

### 检索通讯录
我们有一个对象数组，里面存储着通讯录。

函数 lookUp 有两个预定义参数：firstName值和prop属性 。

函数将会检查通讯录中是否存在一个与传入的 firstName 相同的联系人。如果存在，那么还需要检查对应的联系人中是否存在 prop属性。

如果它们都存在，函数返回prop属性对应的值。

如果firstName 值不存在，返回 "No such contact"。

如果prop 属性不存在，返回 "No such property"。
```js
//初始化变量
var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["Javascript", "Gaming", "Foxes"]
    }
];


function lookUp(firstName, prop){
    let obj;
    contacts.forEach(item=>{
        if(firstName === R.prop('firstName',item)) {
            obj = item;
        };
    });

    if (!obj) {
        return "No such contact";
    };

    if (R.prop(prop,obj)) {
        return obj[prop]
    } else {
        return "No property";
    };

};
    
    
console.log(lookUp("Sherlock", "likes"));

```

### 更新一组对象中的特定属性值
把如下 array 中每个对象元素的 path 属性，处理成不包含空元素的数组
```js
let array = [
    { trid: 1, trname: "餐厅服务员", parent_id: 0, path: ",1," },
    { trid: 2, trname: "公共营养舒", parent_id: 0, path: ",2," },
    { trid: 315, trname: "初级", parent_id: 314, path: ",314,415," },
    { trid: 1, trname: "初级", parent_id: 0, path: ",1,5" },
]
array.map(obj=>{
    obj.path = R.split(',',obj.path);
    obj.path = R.reject(R.isEmpty,obj.path);
});
console.log(array);
```


### 句中单词首字母大写
确保字符串的每个单词首字母都大写，其余部分小写。

像'the'和'of'这样的连接符同理。
```js
function titleCase(str) {
    return str.replace(/\b[\w\']+\b/g,word=>{
        return word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase()
    })
};

titleCase("I'm a little tea pot");
```

### 重复输出字符串
（重要的事情说3遍）

重复一个指定的字符串 num次，如果num是一个负数则返回一个空字符串。
```js
function repeat(str, num) {
    if (num > 0) {
      return str.repeat(num);
    }
    return ``;
};

console.log(repeat('abc',-2));

```

### 比较字符串
（蛤蟆可以吃队友，也可以吃对手）

如果数组第一个字符串元素包含了第二个字符串元素的所有字符，函数返回true。

举例，["hello", "Hello"]应该返回true，因为在忽略大小写的情况下，第二个字符串的所有字符都可以在第一个字符串找到。

["hello", "hey"]应该返回false，因为字符串"hello"并不包含字符"y"。

["Alien", "line"]应该返回true，因为"line"中所有字符都可以在"Alien"找到。
```js
function mutation(arr) {
    arr1 = R.splitEvery(1,R.toLower(arr[0]));
    arr2 = R.splitEvery(1,R.toLower(arr[1]));
    arrDiff = R.difference(arr2,arr1);
    if(arrDiff === []){
        return false;
    } else{
        return true;
    }
};

function mutation(arr) {
  const newArr = R.map(R.toLower, arr); 
  var hasLetter = x => R.contains(x, R.head(newArr));
  return R.all(hasLetter,R.splitEvery(1, R.last(newArr)));
}
```

### 数组排序并找出元素索引
```js
function where(arr, num) {
    var diff = (x,y) => x-y;
    arr.push(num);
    arr = R.sort(diff,arr);
  return R.indexOf(num,arr); 
};

console.log(where([5, 3, 20, 3], 5));
```

### 剔除字符串中所有元音字母
```js

function disemvowel(str) {
   return str.replace(/[aeiouAEIOU]/g,'');

};
console.log(disemvowel("This website is for losers LOL!"));
```

### 找到句中积分最高的单词
Given a string of words, you need to find the highest scoring word.

Each letter of a word scores points according to it's position in the alphabet: a = 1, b = 2, c = 3 etc.

You need to return the highest scoring word as a string.

按照字母表顺序，每个字母对应相应分值，比如 a=1，给每个单词计算积分，返回句中得分最高的单词

If two words score the same, return the word that appears earliest in the original string.

All letters will be lowercase and all inputs will be valid.
```js

function high(x) {
    let words = x.split(' ');
    let wordtoNum = (word)=>{
        let sum = 0;
        let letter = word.split('');

        letter.forEach(x=>{
           sum += x.charCodeAt();
        });

        return sum;
    };

   let wordNums = R.map(wordtoNum,wordArr); 
   let index = wordNums.indexOf((Math.max(...wordNums)));
   return words[index];
};
```

### 找到数组中重复次数为奇数的数字
Given an array, find the int that appears an odd number of times.

找到数组中重复次数为基数的那个数字。

There will always be only one integer that appears an odd number of times.

```js
function findOdd(A) {
    let count= 1;
    let len = A.length;
    let diff = (x,y) => x-y;

    A = R.sort(diff,A);

    for (i=0;i<len;i++){
        if(A[i] === A[i+1]) {
            count +=1;
        } else {
            if(count %2 === 1) {
                return A[i];
            } else {
                count = 1;
            };
        };
    };
};

var findOdd = R.compose(
    R.add(0),
    R.head(),
    R.keys(),
    R.filter(isOdd, R.__),
    R.countBy(Math.floor)
  );

  const findOdd = (xs) => xs.reduce((a, b) => a ^ b);

```


### 返回字符串中有多少个字母出现重复

Count the number of Duplicates
Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits.

注意 case-insensitive 应该理解为 忽略大小写
```js
Example
"abcde" -> 0 # no characters repeats more than once
"aabbcde" -> 2 # 'a' and 'b'
"aabBcde" -> 2 # 'a' occurs twice and 'b' twice (bandB)
"indivisibility" -> 1 # 'i' occurs six times
"Indivisibilities" -> 2 # 'i' occurs seven times and 's' occurs twice
"aA11" -> 2 # 'a' and '1'
"ABBA" -> 2 # 'A' and 'B' each occur twice


var duplicateCount = R.compose(
    R.length,
    R.keys,
    R.filter(R.lt(1),R.__),
    R.countBy(R.toLower),
    R.splitEvery(1)
);
```

### 判断一个句子是否是 Pangram
Count the number of Duplicates
A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).

忽略大小写和标点符号，如果构成一个句子的字母涵盖了26个英文字母的所有，则称之为 pangram，返回 true，否则返回 false

Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.

```js

const words = 'abcdefghijklmnopgrstuvwxwz'.split('');

var alert = R.ifElse(
    R.equals([]),
    R.always(true),
    R.always(false)
);

var isPangram =R.compose(
          alert,
          R.difference(words),
          R.split(''),
          R.toLower
);

console.log(isPangram('The quick brown fox jumps over the lazy dog.'));
```

### 根据指定参数返回一个矩阵式数组

Multiplication Tables
Create a function that accepts dimensions, of Rows x Columns, as parameters in order to create a multiplication table sized according to the given dimensions. **The return value of the function must be an array, and the numbers must be Fixnums, NOT strings.

Example:

multiplication_table(3,3)

1 2 3
2 4 6
3 6 9
-->[[1,2,3],[2,4,6],[3,6,9]]

Each value on the table should be equal to the value of multiplying the number in its first row times the number in its first column.

```js
var multiplicationTable = (row , column) => {
    let BigArr = R.repeat(R.range(1,row+1),column);

    let arr = BigArr.map((arr,i)=>{
        return arr.map(item => item * (i+1))
    });
    console.log(arr);
    return arr;
};

multiplicationTable(2,2);
```
### 对数组内部重复元素构建子数组
数组[3, 2, 6, 2, 1, 3]重构为[[3, 3], [2, 2], [6], [1]]

Sam is an avid collector of numbers. Every time he finds a new number he throws it on the top of his number-pile. Help Sam organise his collection so he can take it to the International Number Collectors Conference in Cologne.

Given an array of numbers, your function should return an array of arrays, where each subarray contains all the duplicates of a particular number. Subarrays should be in the same order as the first occurence of the number they contain: (确保拿到的结果数字出现顺序和原数组中单一元素首次出现顺序一致)

Assume the input is always going to be an array of numbers. If the input is an empty array, an empty array should be returned.
```js

var group = (arr) => {
    let array = R.uniq(arr);
    let repeat1  = R.countBy(Math.floor)(arr);
    return array.map(item=>{
        return R.repeat(item,repeat1[item])
    });
};

console.log(group([3, 2, 6, 2, 1, 3]));
```


### 综合CharCode与指定字符串调整规律破译密码
You are given a secret message you need to decipher. Here are the things you need to know to decipher it:

For each word:

字符串第二个字母和最后一个字母互换
字符串首个字母根据 character code 转换
the second and the last letter is switched (e.g. Hello becomes Holle) the first letter is replaced by its character code (e.g. H becomes 72) Note: there are no special characters used, only letters and spaces
```js

function decipherThis(str) {
    str = str.replace(/[0-9]+/g,item=>String.fromCharCode(item));
    return str.replace(/\b\w+\b/g, word => {
        if(word.length === 1) {return word};

        word = word.split('');
        a = word[1];
        word[1] = word[word.length -1];
        word[word.length -1] = a;
        newword = word.reduce((x,y)=>x+y,'');
        return newword;
    });
};
console.log(decipherThis('82yade 115te 103o'));
```

### 编辑字符串
改变每个字母大小写并颠倒单词顺序
Given a string, return a new string that has transformed based on the input:

Change case of every character, ie. lower case to upper case, upper case to lower case. Reverse the order of words from the input.

改变每个字符的大小写；颠倒输入字符串的顺序

For example:
stringTransformer('Example Input')/string_transformer("Example Input") (depending on the language you are completing the Kata in) should return 'iNPUT eXAMPLE'

You may assume the input only contain English alphabet and spaces.
```js

function stringTransformer(str) {
  return str.split(' ')
         .reverse()
         .join(' ')
         .replace(/[\w]+)/g,word=> {
             if(word === word.toLowerCase()) {
                 return word.toUpperCase()
          } else {
             return word.toLowerCase()
          }
         }
        )
  };

```

### 编辑数字

在每个奇数前后增加 dash 符号，但首尾除外
Given a number, return a string with dash'-'marks before and after each odd integer, but do not begin or end the string with a dash mark.
```js
function dashatize(num) {
    if(!num) {
        return num + ''
    };
    return Math.abs(num)
            .toString()
            .match(/[02468]+|[13579]/g)
            .join('-')
};

function dashatize(num) {
 return (!num)
    ? num + ''
    : String(num)
         .match(/[02468]+|[13579]/g)
         .join('-')
};


```


### 实现一个生成likes的列表。

Implement a function likes :: [String] -> String, which must take in input array, containing the names of people who like an item. It must return the display text as shown in the examples:

```js
likes [] // must be "no one likes this"
likes ["Peter"] // must be "Peter likes this"
likes ["Jacob", "Alex"] // must be "Jacob and Alex like this"
likes ["Max", "John", "Mark"] // must be "Max, John and Mark like this"
likes ["Alex", "Jacob", "Mark", "Max"] // must be "Alex, Jacob and 2 others like this"

function likes(names) {
    return R.cond([
        [R.equals(0),R.always('no one likes this')],
        [R.equals(1),R.always(`${names[0]} likes this`)],
        [R.equals(2),R.always(`${names[0]} and ${names[1]} like this`)],
        [R.equals(3),R.always(`${names[0]},${names[1]} and ${names[2]} like this`)],
        [R.lt(3),R.always(`${names[0]},${names[1]} and ${names.length-2} like this`)]
    ])(names.length)
};

function likes(names) {
  return {
    0: 'no one likes this',
    1: `${names[0]} likes this`, 
    2: `${names[0]} and ${names[1]} like this`, 
    3: `${names[0]}, ${names[1]} and ${names[2]} like this`, 
    4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`, 
  }[Math.min(4, names.length)]
}
```

### 按升序重排数组内奇数

数组内偶数位置不变，奇数按照升序重排
You have an array of numbers. Your task is to sort ascending odd numbers but even numbers must be on their places.

Zero isn't an odd number and you don't need to move it. If you have an empty array, you need to return it.

Example：

sortArray([5, 3, 2, 8, 1, 4]) == [1, 3, 2, 8, 5, 4]
定义一个sortArray的函数，实现偶数的位置不变，奇数按升序重排。
```js

var isOdd = (x)=> x % 2 === 1;
var diff = (a,b)=>a - b;

var sortArray = (arr) =>{
    odd = R.filter(isOdd,arr)
    .sort(diff);
    arr.forEach((item,i) => {
        if (item % 2 === 0){
            odd.splice(i,0,item);
        };
    });

    return odd;
};

```

### 
```js

function autocomplete(input, dictionary){
  let result = [];
  input = input.match(/[a-z]+/gi).join('').toLowerCase();
  
  dictionary.forEach( x => {
    let len = input.length;
    x.slice(0,len).toLowerCase() === input
    ? result.push(x)
    : '';
  });

  return result.slice(0,5);
};

function autocomplete(input, dictionary){
  var r = new RegExp('^' + input.replace(/[^a-z]/gi,''), 'i');
  return dictionary.filter(function(w){ return r.test(w); }).slice(0, 5);
}

```


**Implement a function that adds two numbers together and returns their sum in binary. The conversion can be done before, or after the addition.**

The binary number returned should be a string.


```js
function addBinary(a,b) {
return (a+b).toString(2);
}
```

### 
```js
function getMiddle(s){
  let len = s.length;
  return len % 2 === 1
  ? s.substr( (len - 1) / 2 , 1)
  : s.substr( len / 2 - 1, 2)
}
```


### 返回令左右两边求和相等的元素索引
返回满足要求的元素索引
You are going to be given an array of integers. Your job is to take that array and find an index N where the sum of the integers to the left of N is equal to the sum of the integers to the right of N. If there is no index that would make this happen, return -1.

在全部都是整数的数组中，找到索引为 N 的元素，可以令左边的所有元素求和等于右边剩余元素求和。如果没有这样的元素，返回-1

For example:
Let's say you are given the array {1,2,3,4,3,2,1}: Your function will return the index 3, because at the 3rd position of the array, the sum of left side of the index ({1,2,3}) and the sum of the right side of the index ({3,2,1}) both equal 6.

Let's look at another one.
You are given the array {1,100,50,-51,1,1}: Your function will return the index 1, because at the 1st position of the array, the sum of left side of the index ({1}) and the sum of the right side of the index ({50,-51,1,1}) both equal 1.

Last one:
You are given the array {20,10,-80,10,10,15,35} At index 0 the left side is {} The right side is {10,-80,10,10,15,35} They both are equal to 0 when added. (Empty arrays are equal to 0 in this problem) Index 0 is the place where the left side and right side are equal.

Note: Please remember that in most programming/scripting languages the index of an array starts at 0.
Input:
An integer array of length 0 < arr < 1000. The numbers in the array can be any integer positive or negative.

Output:
The lowest index N where the side to the left of N is equal to the side to the right of N. If you do not find an index that fits these rules, then you will return -1.

Note:
If you are given an array with multiple answers, return the lowest correct index. An empty array should be treated like a 0 in this problem.

测试方案：
findEvenIndex([1,2,3,4,3,2,1])返回 3
findEvenIndex([1,100,50,-51,1,1])返回1
findEvenIndex([1,2,3,4,5,6])返回-1

```js
const sum = (a, from, to) => a.slice(from, to).reduce((a, b) => a + b, 0)
const findEvenIndex = a => a.findIndex((el, i) => sum(a, 0, i) === sum(a, i + 1));
