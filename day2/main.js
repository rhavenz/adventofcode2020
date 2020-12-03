const path = require('path')
const fs = require('fs/promises')

const part1 = async () => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()
  const lines = input.split("\n").map(line => line.split(':'))
  
  await file.close()
  
  let result = 0;

  for(let i = 0; i < lines.length; i++) {
    const [rawRule, password] = lines[i]
    const [rule, letter] = rawRule.split(' ')
    const [min, max] = rule.split('-')
    const found = password.match(new RegExp(`${letter}`, 'g')) ?? []
    if (found.length >= min && found.length <= max) {
      result += 1
    }
  }

  return result
}

const part2 = async () => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()
  const lines = input.split("\n").map(line => line.split(':'))
  
  await file.close()
  
  let result = 0;

  for(let i = 0; i < lines.length; i++) {
    const [rawRule, password] = lines[i]
    const [rule, letter] = rawRule.split(' ')
    const [index, index_] = rule.split('-')
    if (password[index] === letter || password[index_] === letter) {
      if (password[index] !== password[index_]) {
        result += 1
      }
    }
  }

  return result
}

(async () => {
  console.log(`part1: ${await part1()}`)
  console.log(`part2: ${await part2()}`)
})()
