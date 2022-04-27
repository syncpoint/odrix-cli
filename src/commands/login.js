const {Command, flags} = require('@oclif/command')
const { CliUx } = require('@oclif/core')
const fs = require('fs/promises')

const Odrix = require('syncpoint-matrix')

class LoginCommand extends Command {
  async run () {
    const baseUrl = (await CliUx.ux.prompt('[matrix] homeserver baseurl')).toLowerCase()
    const userId = (await CliUx.ux.prompt('[matrix] user id')).toLowerCase()
    const password = await CliUx.ux.prompt('Password', { type: 'hide' })
    
    this.log(`Trying to authenticate ${userId} via ${baseUrl}`)
    const { access_token: accessToken } = await Odrix.login(baseUrl, userId, password)

    this.log(`You have been authenticated.`)
    this.log(`Your access token is ${accessToken}`)
    const shallPersist = (await CliUx.ux.prompt('Do you want me to persist the user ID and access token? (Will create a .env file) Y/N')).toLowerCase()
    if (shallPersist !== 'y') return

    await fs.writeFile('./.env', `MATRIX_BASE_URL=${baseUrl}\r\nMATRIX_USER_ID=${userId}\r\nMATRIX_ACCESS_TOKEN=${accessToken}`, 'utf-8')
    this.log('done')
  }
}

LoginCommand.description = `
Will login to [Matrix] homeserver using username/password

On success the resulting data will be stored in a ".env" file in the current folder.
`
module.exports = LoginCommand
