// const {flags} = require('@oclif/command')
const {CliUx, Command, Flags} = require('@oclif/core')
const fs = require('fs/promises')

const Odrix = require('@syncpoint/odrix')

class LoginCommand extends Command {

  static args = [
    { name: 'baseUrl' },
    { name: 'userId' },
    { name: 'password' }
  ]

  static flags = {
    persist: Flags.boolean({ default: false })
  }

  async run() {

    const { args, flags } = await this.parse(LoginCommand)

    const baseUrl = args.baseUrl ? args.baseUrl : (await CliUx.ux.prompt('[matrix] homeserver baseurl')).toLowerCase()
    const userId = args.userId ? args.userId : (await CliUx.ux.prompt('[matrix] user id')).toLowerCase()
    const password = args.password ? args.password : await CliUx.ux.prompt('Password', {type: 'hide'})

    this.log(`Trying to authenticate ${userId} via ${baseUrl}`)
    const {access_token: accessToken} = await Odrix.login(baseUrl, userId, password)

    this.log('You have been authenticated.')
    const credentials = `MATRIX_BASE_URL=${baseUrl}\r\nMATRIX_USER_ID=${userId}\r\nMATRIX_ACCESS_TOKEN=${accessToken}`
    this.log(credentials)
/*     const shallPersist = (await CliUx.ux.prompt('Do you want me to persist the user ID and access token? (Will create a .env file) Y/N')).toLowerCase()
    if (shallPersist !== 'y') return */
    if (! flags.persist) return
    await fs.writeFile(`./.env.${userId}`, credentials, 'utf-8')
  }
}

LoginCommand.description = `
Will login to [Matrix] homeserver using username/password and acquire an access token.

If --persist is given, the resulting data will be stored in a ".env.$userId" file in the current folder.
`
module.exports = LoginCommand
