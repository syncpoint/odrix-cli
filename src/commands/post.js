const { Command } = require('@oclif/command')
const { cli } = require('cli-ux')
const Odrix = require('syncpoint-matrix')

require('dotenv').config()

class PostCommand extends Command {

  static args = [
    { name: 'layerId' },
    { name: 'message', description: 'Must be a JSON formatted message' },
  ]

  async run () {

    const { args } = this.parse(PostCommand)

    const layerId = args.layerId 
      ? args.layerId
      : await cli.prompt('ID (uuid) of the LAYER (not the project) you want to post')

    let message = args.message 
      ? args.message
      : await cli.prompt('message')

    try {
      message = JSON.parse(message)
    } catch (error) {
      this.error('No valid JSON!', { exit: true })
    }

    const odrix = new Odrix({
      baseUrl: process.env.MATRIX_BASE_URL,
      userId: process.env.MATRIX_USER_ID,
      accessToken: process.env.MATRIX_ACCESS_TOKEN
    })
    
    await odrix.start()
    await odrix.toBeReady()

    await odrix.post(layerId, message)
    this.log('done')

    odrix.stop()
  }
}

PostCommand.description = `
Post a message to a joined project layer.
`
module.exports = PostCommand
