const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const faker = require('faker');

app.get('/', (req, res) => {
  res.json({
		name:faker.name.findName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		account:faker.finance.routingNumber()
	})
})

app.get("/a", (req, res) =>{
	res.sendFile(path.join(__dirname,"a.zip"))
})

app.get("/b", (req, res) =>{
	res.sendFile(path.join(__dirname,"b.zip"))
})

app.listen(port, () => {
  console.log(`Local server PCAP FOR07 listening at http://localhost:${port}`)
})