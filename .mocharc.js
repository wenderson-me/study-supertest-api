module.exports = {
  spec: ["test/**/*.spec.js"],
  require: 'utils/global.js',
  reporter: 'mochawesome',
  reporterOptions: 'json=false, reportDir=report, reportFilename=study-supertest-api'
}
