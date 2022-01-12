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

    /* odrix.on('data', data => {
      console.dir(data, { depth: 4 })
    }) */
    odrix.on('membership/invite', struct => console.log('#membership/invite ', struct))
    odrix.on('hierarchy/new', struct => console.log('#hierarchy/new', struct))
    this.log('press CTRL-C to terminate ...')

    readline.emitKeypressEvents(process.stdin)
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    
    await (new Promise(resolve => {
      process.stdin.setEncoding('utf-8')
      process.stdin.resume()
      process.stdin.on('data', key => {
        if ( key !== '\u0003' ) return
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
