const path = require('path')
const fs = require('fs/promises')

const part1 = async (slope = [3, 1]) => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()
  const lines = input.split("\n")
  
  await file.close()

  result = 0

  for(let x = 0, y = 0; y<lines.length; x+=slope[0], y+=slope[1]) {
    if (lines[y][x % lines[y].length] === '#') {
      result++
    }
  }

  return result
}

const part2 = async () => {
  return (await Promise.all([
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ].map(part1))).reduce((acc, curr) => acc * curr)
}

(async () => {
  console.log(`part1: ${await part1()}`)
  console.log(`part2: ${await part2()}`)
})()