const path = require('path')
const fs = require('fs/promises')

const part1 = async (slope = [3, 1]) => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()
  const passports = input.split("\n\n")
    .map(passport => passport.split("\n")
    .join(" ")
    .split(" ")
    .map(rawProperty => rawProperty.split(":")[0]))
  
  await file.close()

  result = 0

  for(let i = 0; i < passports.length; i++) {
    if (['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(prop => passports[i].indexOf(prop) !== -1)) {
      result += 1
    }
  }

  return result
}

const part2 = async (slope = [3, 1]) => {
  const file = await fs.open(path.join(__dirname, 'input'), 'r')
  const buffer = await file.readFile()
  const input = buffer.toString()
  const passports = input.split("\n\n")
    .map(passport => passport.split("\n")
    .join(" ")
    .split(" ")
    .map(rawProp => rawProp.split(':'))
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1]
      return acc
    }, {}))
  
  await file.close()

  result = 0

  for(let i = 0; i < passports.length; i++) {
    if (['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(prop => Object.keys(passports[i]).indexOf(prop) !== -1)) {
      if (parseInt(passports[i].byr) < 1920 || parseInt(passports[i].byr) > 2002) {
        continue
      }
      if (parseInt(passports[i].iyr) < 2010 || parseInt(passports[i].iyr) > 2020) {
        continue
      }
      if (parseInt(passports[i].eyr) < 2020 || parseInt(passports[i].eyr) > 2030) {
        continue
      }
      if (!/^[0-9]+(cm|in)$/.test(passports[i].hgt)) {
        continue
      }
      if (passports[i].hgt.includes('cm') && (parseInt(passports[i].hgt) < 150 || parseInt(passports[i].hgt) > 193)) {
        continue
      }
      if (passports[i].hgt.includes('in') && (parseInt(passports[i].hgt) < 59 || parseInt(passports[i].hgt) > 76)) {
        continue
      }
      if (!/^#[0-9a-f]{6}$/.test(passports[i].hcl)) {
        continue
      }
      if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passports[i].ecl)) {
        continue
      }      
      if (!/^[0-9]{9}$/.test(passports[i].pid)) {
        continue
      }
      result += 1
    }
  }

  return result
}

(async () => {
  console.log(`part1: ${await part1()}`)
  console.log(`part2: ${await part2()}`)
})()