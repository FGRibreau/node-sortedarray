(function(){

  function SortedArray(values, f) {
    if(typeof values === "function"){f = values;values = null;}
    this._ = [];
    this.f = f || SortedArray.defaultComparator;

    if(values){values.forEach(this.add.bind(this));}
  }

  SortedArray.compare = function(a, b, f) {return f(a) - f(b);};

  /**
   *
   * @param {Function} f comparator(a, b) -> Number [-1 | 0 | 1]
   * a negative integer if a is less than b
   * a zero if a is equal to b
   * a positive integer if a is greater than the b
   */

  SortedArray.defaultComparator = function(a, b) {
    if (typeof a === "string" && typeof b === "string") {
      return SortedArray.compare(a, b, function (o) {
        return o.charCodeAt(0);
      });
    }

    return SortedArray.compare(a, b, function identity(o) {
      return o;
    });
  };

  SortedArray.prototype.toArray = function () {
    return this._;
  };

  SortedArray.prototype._isGreaterThan = function (a, b) {
    return this.f(a, b) > 0;
  };

  SortedArray.prototype._isLesserThan = function (a, b) {
    return this.f(a, b) < 0;
  };

  SortedArray.prototype._cursor = function(after, before, index){
    /**
     * What is `after` the inserted element
     * What is `before` the inserted element
     * At what `index` the element currently is.
     * @type {Object}
     */
    return {after:after || undefined, before:before || undefined, index:index};
  };

  SortedArray.prototype.add = function (el) {
    var l = this._.length, c;

    if (l === 0 || this._isGreaterThan(el, this._[l - 1])) {
      c = this._cursor(this._[l - 1], null, Math.max(l, 0));
      this._.push(el);
      return c;
    }

    // @todo use binary search
    var i = 0;
    while(i < l){
      if(!this._isLesserThan(this._[i], el)){// _[i] < el
        c = this._cursor(this._[i-1], this._[i], i);
        this._.splice(i, 0, el);
        return c;
      }
      i++;
    }

    //
    // Should never happen
    //
    return this._cursor(null, null, -1);
  };

  function sortedArray(values, fComparator) {
    return new SortedArray(values, fComparator);
  }
  sortedArray.SortedArray = SortedArray;


  if (typeof module !== "undefined") {
    module.exports = sortedArray;
  } else {
    this.sortedArray = sortedArray;
    this.SortedArray = SortedArray;
  }
}());
