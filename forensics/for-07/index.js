const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const FLAG = "codemianCTF{Y0U_arE_A_trU3_Pr0}"

const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

function encrypt(toEncrypt, relativeOrAbsolutePathToPublicKey) {
  const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey)
  const publicKey = fs.readFileSync(absolutePath, 'utf8')
  const buffer = Buffer.from(toEncrypt, 'utf8')
  const encrypted = crypto.publicEncrypt(publicKey, buffer)
  return encrypted.toString('base64')
}

app.get("/", (req, res) => {
	encryptedFlag = encrypt(FLAG, path.join(__dirname, "./keys/for07.key.pub"))
  res.send(encryptedFlag);
});

app.listen(port, () => {
  console.log(`FOR07 server listening at http://localhost:${port}`);
});
