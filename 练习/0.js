const R = require('../犀牛书阅读笔记/node_modules/ramda');

var maxSequence = (arr) => {
  let list = [];
  let len = R.range(1,arr.length+1);
  len.forEach(item => {
  list = list.concat(R.aperture(item,arr).map(x=>R.sum(x)));
  });
  let result = R.apply(Math.max,list);
  if(result > 0) {
    return result;
  } else {
    return 0
   };
};


