const path = require('path')
const fs = require('fs/promises')

const part1 = async () => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()
  const numbers = input.split("\n").map(Number)
  
  let found = false

  for(let i = 0; i < numbers.length; i++) {
    const a = numbers[i]
    for(let y = 0; y < numbers.length; y++) {
      if (i === y) {
        continue
      }
      const b = numbers[y]
      if (a + b === 2020) {
        found = a * b
        break
      }
    }
    if (found) {
      break
    }
  }
  return found
}

const part2 = async () => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()
  const numbers = input.split("\n").map(Number)
  
  let found = false

  for(let i = 0; i < numbers.length; i++) {
    const a = numbers[i]
    for(let y = 0; y < numbers.length; y++) {
      if (i === y) {
        continue
      }
      const b = numbers[y]
      for(let z = 0; z < numbers.length; z++) {
        if (z === y || z === i) {
          continue
        }
        const c = numbers[z]
        if (a + b + c === 2020) {
          found = a * b * c
          break
        }
      }
      if (found) {
        break
      }
    }
    if (found) {
      break
    }
  }
  return found
}

(async () => {
  console.log(`part1: ${await part1()}`)
  console.log(`part2: ${await part2()}`)
})()
