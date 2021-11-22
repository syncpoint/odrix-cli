const { Command } = require('@oclif/command')
const Odrix = require('syncpoint-matrix')
const readline = require('readline')

require('dotenv').config()

class ListenCommand extends Command {
  async run () {

    const odrix = new Odrix({
      baseUrl: process.env.MATRIX_BASE_URL,
      userId: process.env.MATRIX_USER_ID,
      accessToken: process.env.MATRIX_ACCESS_TOKEN
    })
    
    await odrix.start()
    await odrix.toBeReady()

    odrix.on('data', data => {
      console.dir(data, { depth: 4 })
    })
    this.log('press any key to terminate ...')

    readline.emitKeypressEvents(process.stdin)
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    
    await (new Promise(resolve => {
      process.stdin.once('keypress', () => {
        rl.close()
        return resolve()
      })
    }))

    odrix.removeAllListeners('data')
    odrix.stop()
  }
}

ListenCommand.description = `
Listen for messages on any joined project layer.
`
module.exports = ListenCommand
