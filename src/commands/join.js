const { Command } = require('@oclif/command')
const { cli } = require('cli-ux')
const Odrix = require('syncpoint-matrix')

require('dotenv').config()

class JoinCommand extends Command {

  static args = [
    { name: 'projectId' }
  ]

  async run () {

    const { args } = this.parse(JoinCommand)

    const projectId = args.projectId 
      ? args.projectId
      : await cli.prompt('ID (uuid) of the project you want to join')

    const odrix = new Odrix({
      baseUrl: process.env.MATRIX_BASE_URL,
      userId: process.env.MATRIX_USER_ID,
      accessToken: process.env.MATRIX_ACCESS_TOKEN
    })
    
    await odrix.start()
    await odrix.toBeReady()

    await odrix.join(projectId)
    this.log('done')

    odrix.stop()
  }
}

JoinCommand.description = `
Join a shared project.
`
module.exports = JoinCommand
