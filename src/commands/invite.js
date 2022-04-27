const { Command } = require('@oclif/command')
const { CliUx } = require('@oclif/core')
const Odrix = require('syncpoint-matrix')

require('dotenv').config()

class InviteCommand extends Command {

  static args = [
    { name: 'projectId' },
    { name: 'userId' },
  ]

  async run () {

    const { args } = this.parse(InviteCommand)

    const projectId = args.projectId
      ? args.projectId
      : await CliUx.ux.prompt('ID (uuid) of the project to be shared')

    const userId = args.userId 
      ? args.userId.toLowerCase()
      : (await CliUx.ux.prompt('Whom (user Id) do you want to invite')).toLowerCase()

    const odrix = new Odrix({
      baseUrl: process.env.MATRIX_BASE_URL,
      userId: process.env.MATRIX_USER_ID,
      accessToken: process.env.MATRIX_ACCESS_TOKEN
    })
    
    await odrix.start()

    await odrix.invite({ id: projectId }, userId)
    this.log('done')

    odrix.stop()
  }
}

InviteCommand.description = `
Invite a user to an existing project.
`
module.exports = InviteCommand
