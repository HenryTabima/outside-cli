'use strict'

const ora = require('ora')
const getWeather = require('../utils/weather')
const getLocation = require('../utils/location')
const error = require('../utils/error')

module.exports = async (args) => {
  const spinner = ora().start()

  try {
    const location = args.location || args.l || await getLocation()
    const weather = await getWeather(location)

    spinner.stop()

    console.log(`Current conditions in ${location}:`)
    console.log(`\t${weather.condition.temp}°F - ${weather.condition.text}`)
  } catch (err) {
    spinner.stop()
    error(err.response.data.message, true)
  }
}
