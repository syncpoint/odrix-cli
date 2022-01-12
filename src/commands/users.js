const { Command } = require('@oclif/command')
const Odrix = require('syncpoint-matrix')

require('dotenv').config()

class UsersCommand extends Command {
  
  async run () {
    const odrix = new Odrix({
      baseUrl: process.env.MATRIX_BASE_URL,
      userId: process.env.MATRIX_USER_ID,
      accessToken: process.env.MATRIX_ACCESS_TOKEN
    })
    
    await odrix.start()
    const users = await odrix.users()
    if (users.length === 0) {
      console.log('Poor one! You do not know anyone!')
    } else {
      console.dir(users, { depth: 4 })
    }
    odrix.stop()
  }
}

UsersCommand.description = `
List all users we know (?)
`
module.exports = UsersCommand