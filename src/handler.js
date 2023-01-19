'use strict'

module.exports.titanLogic = async (event) => {
    const randomNumber = parseInt(Math.random() * 100)
    console.log(`The random number is: ${randomNumber}`)
    return randomNumber
}
