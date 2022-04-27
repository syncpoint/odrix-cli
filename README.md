odrix-cli
=========

A simple CLI for ODRIX (ODIN@matrix)

# Usage
<!-- usage -->
```sh-session
$ npm install -g odrix-cli
$ odrix-cli COMMAND
running command...
$ odrix-cli (-v|--version|version)
odrix-cli/1.0.0 darwin-x64 node-v16.13.1
$ odrix-cli --help [COMMAND]
USAGE
  $ odrix-cli COMMAND
...
```
<!-- usagestop -->

# Known Bug

Das _matrix-js-sdk_ hat einen Bug. Nach dem Aufruf von ```stopClient()``` bleibt für beinahe 2 Minuten ein [Callback Timer](https://github.com/matrix-org/matrix-js-sdk/issues/2031) hängen, der das Beenden des NodeJS Prozesses verhindert. Das kann durch ```Control-C``` forciert werden.

# Commands

Allen Commands können Parameter übergeben werden. Falls das nicht gemacht wird, startet der interaktive Modus und die fehlenden Parameter werden abgefragt.

<!-- commands -->
* [`odrix-cli help [COMMAND]`](#odrix-cli-help-command)
* [`odrix-cli invitations`](#odrix-cli-invitations)
* [`odrix-cli invite [PROJECTID] [USERID]`](#odrix-cli-invite-projectid-userid)
* [`odrix-cli join [PROJECTID]`](#odrix-cli-join-projectid)
* [`odrix-cli listen`](#odrix-cli-listen)
* [`odrix-cli login`](#odrix-cli-login)
* [`odrix-cli post [LAYERID] [MESSAGE]`](#odrix-cli-post-layerid-message)
* [`odrix-cli projects`](#odrix-cli-projects)
* [`odrix-cli share [PROJECTNAME]`](#odrix-cli-share-projectname)
* [`odrix-cli users`](#odrix-cli-users)

## `odrix-cli help [COMMAND]`

display help for odrix-cli

```
USAGE
  $ odrix-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.18/src/commands/help.ts)_

## `odrix-cli invitations`

List all project we have been invited to join

```
USAGE
  $ odrix-cli invitations

DESCRIPTION
  List all project we have been invited to join
```

_See code: [src/commands/invitations.js](https://github.com/ThomasHalwax/odrix-cli/blob/v1.0.0/src/commands/invitations.js)_

## `odrix-cli invite [PROJECTID] [USERID]`

Invite a user to an existing project.

```
USAGE
  $ odrix-cli invite [PROJECTID] [USERID]

DESCRIPTION
  Invite a user to an existing project.
```

_See code: [src/commands/invite.js](https://github.com/ThomasHalwax/odrix-cli/blob/v1.0.0/src/commands/invite.js)_

## `odrix-cli join [PROJECTID]`

Join a shared project.

```
USAGE
  $ odrix-cli join [PROJECTID]

DESCRIPTION
  Join a shared project.
```

_See code: [src/commands/join.js](https://github.com/ThomasHalwax/odrix-cli/blob/v1.0.0/src/commands/join.js)_

## `odrix-cli listen`

Listen for messages on any joined project layer.

```
USAGE
  $ odrix-cli listen

DESCRIPTION
  Listen for messages on any joined project layer.
```

_See code: [src/commands/listen.js](https://github.com/ThomasHalwax/odrix-cli/blob/v1.0.0/src/commands/listen.js)_

## `odrix-cli login`

Will login to [Matrix] homeserver using username/password

```
USAGE
  $ odrix-cli login

DESCRIPTION
  Will login to [Matrix] homeserver using username/password

  On success the resulting data will be stored in a ".env" file in the current folder.
```

_See code: [src/commands/login.js](https://github.com/ThomasHalwax/odrix-cli/blob/v1.0.0/src/commands/login.js)_

## `odrix-cli post [LAYERID] [MESSAGE]`

Post a message to a joined project layer.

```
USAGE
  $ odrix-cli post [LAYERID] [MESSAGE]

ARGUMENTS
  LAYERID
  MESSAGE  Must be a JSON formatted message

DESCRIPTION
  Post a message to a joined project layer.
```

_See code: [src/commands/post.js](https://github.com/ThomasHalwax/odrix-cli/blob/v1.0.0/src/commands/post.js)_

## `odrix-cli projects`

List all project we have joined or shared

```
USAGE
  $ odrix-cli projects

DESCRIPTION
  List all project we have joined or shared
```

_See code: [src/commands/projects.js](https://github.com/ThomasHalwax/odrix-cli/blob/v1.0.0/src/commands/projects.js)_

## `odrix-cli share [PROJECTNAME]`

Creates a new project and shares it on the [matrix] server

```
USAGE
  $ odrix-cli share [PROJECTNAME]

DESCRIPTION
  Creates a new project and shares it on the [matrix] server
```

_See code: [src/commands/share.js](https://github.com/ThomasHalwax/odrix-cli/blob/v1.0.0/src/commands/share.js)_

## `odrix-cli users`

List all users we know (?)

```
USAGE
  $ odrix-cli users

DESCRIPTION
  List all users we know (?)
```

_See code: [src/commands/users.js](https://github.com/ThomasHalwax/odrix-cli/blob/v1.0.0/src/commands/users.js)_
<!-- commandsstop -->
