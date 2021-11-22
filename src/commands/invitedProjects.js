const { Command } = require('@oclif/command')
const Odrix = require('syncpoint-matrix')

require('dotenv').config()

class InvitedProjectsCommand extends Command {
  
  async run () {
    const odrix = new Odrix({
      baseUrl: process.env.MATRIX_BASE_URL,
      userId: process.env.MATRIX_USER_ID,
      accessToken: process.env.MATRIX_ACCESS_TOKEN
    })
    
    await odrix.start()
    await odrix.toBeReady()
    const projects = await odrix.invitedProjects()
    if (projects.length === 0) {
      console.log('Sorry, but you are not invited to join any projects.')
    } else {
      console.dir(projects, { depth: 4 })
    }
    
    odrix.stop()
  }
}

InvitedProjectsCommand.description = `
List all project we have been invited to join
`
module.exports = InvitedProjectsCommand