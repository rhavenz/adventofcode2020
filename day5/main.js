const path = require('path')
const fs = require('fs/promises')

const part1 = async () => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()
  const papers = input.split('\n')
  
  await file.close()

  return Math.max(...papers.map(paper => {
    const row = parseInt(paper.slice(0, 7)
      .replaceAll(/F/gi, '0')
      .replaceAll(/B/gi, '1'), 2);
    const col = parseInt(paper.slice(-3)
    .replaceAll(/L/gi, '0')
    .replaceAll(/R/gi, '1'), 2);

    return row * 8 + col
  }))
}

const part2 = async () => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()
  const papers = input.split('\n')
  
  await file.close()

  const mapRowToCol = papers.reduce((acc, paper) => {
    const row = parseInt(paper.slice(0, 7)
      .replaceAll(/F/gi, '0')
      .replaceAll(/B/gi, '1'), 2);
    const col = parseInt(paper.slice(-3)
    .replaceAll(/L/gi, '0')
    .replaceAll(/R/gi, '1'), 2);

    if (!acc[row]) {
      acc[row] = []
    }
    acc[row].push(row * 8 + col)

    return acc
  }, {})
  
  const seats = Object.keys(mapRowToCol)
    .slice(1, -1)
    .map(Number)
    .flatMap(id => mapRowToCol[id])
    .sort((a, b) => a - b)

  for(let i = 0; i < seats.length; i++) {
    if (i !== 0 && seats[i] - 1 !== seats[i - 1]) {
      return seats[i] - 1
    }
  }
}

(async () => {
  console.log(await part1())
  console.log(await part2())
})()