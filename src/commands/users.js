const { Command } = require('@oclif/command')
const Odrix = require('@syncpoint/odrix')

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
      this.log('Poor one! You do not know anyone!')
    } else {
      this.log(users)
    }
    odrix.stop()
  }
}

UsersCommand.description = `
List all users we know (?)
`
module.exports = UsersCommand