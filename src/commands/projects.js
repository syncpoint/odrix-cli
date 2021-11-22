const { Command } = require('@oclif/command')
const Odrix = require('syncpoint-matrix')

require('dotenv').config()

class ProjectsCommand extends Command {
  
  async run () {
    const odrix = new Odrix({
      baseUrl: process.env.MATRIX_BASE_URL,
      userId: process.env.MATRIX_USER_ID,
      accessToken: process.env.MATRIX_ACCESS_TOKEN
    })
    
    await odrix.start()
    await odrix.toBeReady()
    const projects = await odrix.projects()
    if (projects.length === 0) {
      console.log('You have neither joined nor shared any projects.')
    } else {
      console.dir(projects, { depth: 4 })
    }
    odrix.stop()
  }
}

ProjectsCommand.description = `
List all project we have joined or shared
`
module.exports = ProjectsCommand