const {Command, flags} = require('@oclif/command')
const { CliUx } = require('@oclif/core')
const crypto = require('crypto')
const Odrix = require('@syncpoint/odrix')

require('dotenv').config()

class ShareCommand extends Command {

  static args = [
    { name: 'projectName' }
  ]

  async run () {

    const { args } = this.parse(ShareCommand)

    const projectName = args.projectName
      ? args.projectName
      : await CliUx.ux.prompt('Name of the project to be shared')

    this.log('OK, I will create two layers for this project 🎲')

    const projectStructure = {
      id: uuidv4(),
      name: projectName,
      layers: [
        { id: crypto.randomUUID(), name: "Own Situation" },
        { id: crypto.randomUUID(), name: "FFT" },
      ]
    }

    const odrix = new Odrix({
      baseUrl: process.env.MATRIX_BASE_URL,
      userId: process.env.MATRIX_USER_ID,
      accessToken: process.env.MATRIX_ACCESS_TOKEN
    })
    
    await odrix.start()

    await odrix.shareProject(projectStructure)
    this.log('done')

    odrix.stop()
  }
}

ShareCommand.description = `
Creates a new project and shares it on the [matrix] server
`
module.exports = ShareCommand
