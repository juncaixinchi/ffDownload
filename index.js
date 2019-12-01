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
  const compo = path.parse(encodeURI(url))
  const filename = compo.ext ? compo.base : 'targetFile'
  const filePath = `./tmpdata/${filename}`
  await exec(`wget -O ${filePath} '${encodeURI(url)}'`)
  const { stdout, stderr } = await exec(`ffsend -q upload ${filePath}`)
  if (stderr) throw stderr
  console.log(stdout)
  return stdout.trim()
}

app.get('/', (req, res) => {
  if (req && req.query && req.query.url) {
    console.log('will download', req.query.url)
    downloadAndSend(req.query.url)
      .then(r => res.redirect(r))
      .catch(e => res.send(e.toString()))
  }
})

child.execSync('rm -rf ./tmpdata')
child.execSync('mkdir -p ./tmpdata')

const server = app.listen(port, () => {
  console.log(`server start on http://localhost:${port}`)
})
