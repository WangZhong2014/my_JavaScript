const R = require('../犀牛书学习笔记/node_modules/ramda');

function longestConsec(strarr, k) {
  let arr = R.aperture(k,strarr).map(x=>x.join(''));
  console.log(arr);

};

longestConsec(["zone", "abigail", "theta", "form", "libe", "zas"], 2)