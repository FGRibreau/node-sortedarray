var sortedArray = require('./sortedarray');
var SortedArray = sortedArray.SortedArray;

var arr         = null;
var fComparator = SortedArray.defaultComparator;
var f           = function TestComparator(a, b){
  return fComparator(a, b);
};
module.exports = {
  setUp:function (done) {
    arr = sortedArray(f);
    done();
  },
  tearDown:function (done) {
    arr = null;
    done();
  },

  'constructor':function (t) {
    t.equal(typeof sortedArray, 'function');
    t.equal(typeof SortedArray, 'function');
    t.done();
  },

  'constructor should support values': function(t){
    t.deepEqual(sortedArray([12, 2, 30, 5, 10]).toArray(), [2, 5, 10, 12, 30]);
    t.done();
  },

  '.toArray':function (t) {
    t.deepEqual(arr.toArray(), []);
    t.done();
  },

  '.add':function (t) {
    arr.add('d');
    t.deepEqual(arr.toArray(), ['d']);

    arr.add('a');
    t.deepEqual(arr.toArray(), ['a', 'd']);

    arr.add('f');
    t.deepEqual(arr.toArray(), ['a', 'd' ,'f']);
    t.done();
  },

  '.add (same element)':function (t) {
    arr.add('a');
    arr.add('a');
    t.deepEqual(arr.toArray(), ['a', 'a']);
    arr.add('x');
    t.deepEqual(arr.toArray(), ['a', 'a','x']);
    arr.add('x');
    t.deepEqual(arr.toArray(), ['a', 'a','x','x']);
    arr.add('z');
    t.deepEqual(arr.toArray(), ['a', 'a','x','x','z']);
    t.done();
  },

  '.add (with our own comparator)': function(t){
    fComparator = function(a, b){return a - b;};
    t.deepEqual(arr.add(1), {after:undefined, before:undefined, index:0});
    // [1]
    t.deepEqual(arr.add(2), {after:1, before:undefined, index:1});
    // [1,2]
    t.deepEqual(arr.add(10), {after:2, before:undefined, index:2});
    // [1, 2, 10]
    t.deepEqual(arr.add(9), {after:2, before:10, index:2});
    // [1, 2, 9, 10]
    t.deepEqual(arr.add(11), {after:10, before:undefined, index:4});
    // [1, 2, 9, 10, 11]
    t.deepEqual(arr.add(-1), {after:undefined, before:1, index:0});
    // [-1, 1, 2, 9, 10, 11]
    t.done();
  }
};
