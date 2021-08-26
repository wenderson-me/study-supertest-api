module.exports = {
  spec: ["test/**/*.spec.js"],
  require: 'test/utils/global.js',
  reporter: 'mochawesome',
  reporterOptions: 'json=false,reportDir=report,reportFilename=index'
}
