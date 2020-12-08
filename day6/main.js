const path = require('path')
const fs = require('fs/promises')

const part1 = async () => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()

  await file.close()

  return input.split('\n\n').reduce((acc, group) => {
    return acc + group.split('\n').join("").split('').filter((value, index, arr) => {
      if (arr.indexOf(value) === index) {
        return true
      }
      return false
    }).length
  }, 0)
}

const part2 = async () => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()

  await file.close()

  return input.split('\n\n').reduce((acc, group) => {
    const persons = group.split('\n')
    return acc + persons.join("").split('').filter((value, index, arr) => {
      let i = index
      let count = 0
      while (i !== -1) {
        count++
        i = arr.indexOf(value, i+1)
      }
      if (count === persons.length) {
        return true
      }
      return false
    }).length
  }, 0)
}

(async () => {
  console.log(await part1())
  console.log(await part2())
})()