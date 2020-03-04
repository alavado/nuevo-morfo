module.exports = {
  isDev: function () { return require('ip').address() !== '45.55.54.91' }
}