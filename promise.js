//
// This module just need to expose a Promise interface of `terminate` using the
// built-in `promisify` utility (see https://nodejs.org/api/util.html#util_util_promisify_original).
// As the callback version follows the 'error-first' pattern, the Promise version
// doesn't need to be tested. Is guaranteed that it will work as intended.
//
var util = require('util');
var terminate = require('../terminate');

module.exports = util.promisify(terminate);
