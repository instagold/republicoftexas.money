import ripple from 'ripple-lib'
import path from 'path'
import fs from 'fs'
import csv from 'csv'

let wallets = []

let file = fs.readFileSync(path.join(__dirname, '/../counties.csv'))

let counties = new Set()

csv.parse(file, function(err, data) {

  data.forEach(item => {
    counties.add(item[0])
  })

  counties.forEach(county => {
    let wallet = ripple.Wallet.generate()
    wallets[county.toLowerCase()] = wallet
  })

  let output = fs.openSync(path.join(__dirname, '/counties.json'), 'r+')

  console.log(JSON.stringify(wallets))
  fs.writeFileSync(path.join(__dirname, '/counties.json'), wallets)
})

