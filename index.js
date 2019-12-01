const path = require('path')
const express = require('express')
const morgan = require('morgan')
const child = require('child_process')

const port = 3000 // need sudo
const app = express()
app.use(morgan('combined'))

const downloadAndSend = async (url) => {
  const filename = path.parse(url).base || 'targetFile'
  console.log(filename)
  const filePath = `./tmpdata/${filename}`
  await child.spawn(`wget -O ${filePath} ${req.query.url}`)
  const result = await child.spawn(`ffsend ${filePath}`)
  return result
}

app.get('/', (req, res) => {
  console.log(req.query)
  if (req.query && req.query.url) {
    downloadAndSend(req.query.url).then(res.send).catch(res.send)
  }
})

child.spawnSync(`rm -rf tmpdata`)
child.spawnSync(`mkdir -p tmpdata`)

const server = app.listen(port, () => {
  console.log(`server start on http://localhost:${port}`)
})
