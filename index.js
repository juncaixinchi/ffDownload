const path = require('path')
const express = require('express')
const morgan = require('morgan')
const child = require('child_process')
const util = require('util')

const exec = util.promisify(child.exec)

const port = 3000

const app = express()
app.use(morgan('combined'))

const downloadAndSend = async (url) => {
  const filename = path.parse(url).base || 'targetFile'
  console.log(filename)
  const filePath = `./tmpdata/${filename}`
  await exec(`wget -O ${filePath} ${url}`)
  const result = await exec(`ffsend ${filePath}`).toString()
  return result
}

app.get('/', (req, res) => {
  if (req && req.query && req.query.url) {
    console.log('will download', req.query.url)
    downloadAndSend(req.query.url).then(r => res.send(r)).catch(e => res.send(e.toString()))
  }
})

child.execSync('rm -rf ./tmpdata')
child.execSync('mkdir -p ./tmpdata')

const server = app.listen(port, () => {
  console.log(`server start on http://localhost:${port}`)
})
