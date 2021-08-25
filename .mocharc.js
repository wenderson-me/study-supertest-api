module.exports = {
  spec: ["test/**/*.spec.js"],
  require: 'config/global.js',
  reporter: 'mochawesome',
  reporterOptions: 'json=false, reportDir=report, reportFilename=automaçãoAPI'
}