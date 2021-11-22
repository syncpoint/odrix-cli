const {Command, flags} = require('@oclif/command')
const { cli } = require('cli-ux')
const { v4: uuidv4 } = require('uuid')
const Odrix = require('syncpoint-matrix')

require('dotenv').config()

class ShareCommand extends Command {

  static args = [
    { name: 'projectName' }
  ]

  async run () {

    const { args } = this.parse(ShareCommand)

    const projectName = args.projectName
      ? args.projectName
      : await cli.prompt('Name of the project to be shared')

    this.log('OK, I will create two layers for this project 🎲')

    const projectStructure = {
      id: uuidv4(),
      name: projectName,
      layers: [
        { id: uuidv4(), name: "Own Situation" },
        { id: uuidv4(), name: "FFT" },
      ]
    }

    const odrix = new Odrix({
      baseUrl: process.env.MATRIX_BASE_URL,
      userId: process.env.MATRIX_USER_ID,
      accessToken: process.env.MATRIX_ACCESS_TOKEN
    })
    
    await odrix.start()
    await odrix.toBeReady()

    await odrix.shareProject(projectStructure)
    this.log('done')

    odrix.stop()
  }
}

ShareCommand.description = `
Creates a new project and shares it on the [matrix] server
`
module.exports = ShareCommand
