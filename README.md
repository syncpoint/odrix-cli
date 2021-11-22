odrix-cli
=========

A simple CLI for ODRIX (ODIN@matrix)

# Usage
<!-- usage -->
```sh-session
$ git clone git@github.com:syncpoint/odrix-cli.git
$ npm install 
$ odrix-cli help
A simple CLI interface for ODRIX (ODIN@Matrix)

VERSION
  odrix-cli/0.0.0 darwin-x64 node-v14.18.1

USAGE
  $ odrix-cli [COMMAND]

COMMANDS
  help             display help for odrix-cli
  invite
  invitations
  join
  listen
  login
  post
  projects
  share
  users
```
<!-- usagestop -->

# Known Bug

Das _matrix-js-sdk_ hat einen Bug. Nach dem Aufruf von ```stopClient()``` bleibt für beinahe 2 Minuten ein [Callback Timer](https://github.com/matrix-org/matrix-js-sdk/issues/2031) hängen, der das Beenden des NodeJS Prozesses verhindert. Das kann durch ```Control-C``` forciert werden.

# Commands

Allen Commands können Parameter übergeben werden. Falls das nicht gemacht wird, startet der interaktive Modus und die fehlenden Parameter werden abgefragt.

<!-- commands -->

## `odrix-cli login`
Wir brauchen zunächst Zugangsdaten zu einem [matrix] Homeserver, egal ob z.B. ein öffentlicher Server wie _matrix.org_ oder eine lokal (über Docker gestartete) Instanz von [Synapse](https://hub.docker.com/r/matrixdotorg/synapse).

Für alle weiteren Schritte ist das (einmalige) Ausführen von _login_ erforderlich! Dabei werden die URL des HomeServers, der Benutzername und das Passwort abgefragt. Nach dem erfolgreichen Login wird eine lokale Datei (_.env_) erzeugt, die neben der URL und dem Benutzernamen ein _ACCESS\_TOKEN_ enthält, das für die weiteren Commands anstelle des Passworts verwendet wird.

````shell
❯ bin/run login
[matrix] homeserver baseurl: http://thomass-macbook-pro.local:8008
[matrix] user id: @s2:thomass-macbook-pro.local
Password: ******************
You have been authenticated.
Your access token is syt_czI_alZZWSiWAOPtihxWbIGm_1drXim
Do you want me to persist the user ID and access token? (Will create a .env file) Y/N: y
done
````

## `odrix-cli share`

Dieses Command erzeugt ein neues Projekt mit zwei Layern und erstellt die entsprechende [matrix] Struktur (Projekt => SPACE, Layer => Room).

````shell
bin/run share "he whose name must not be spoken"
OK, I will create two layers for this project 🎲
done
````

## `odrix-cli projects`

Zeigt alle Projekte an, die
  * vom aktuellen Benutzer bereitgestellt wurden (siehe [share](#odrix-cli-share))
  * zu denen der aktuelle Benutzer eingeladen wurde (siehe [invite](#odrix-cli-invite)) und diese Einlagung auch akzeptiert hat (siehe [join](#odrix-cli-join))

````shell
bin/run projects
[
  {
    id: '92767478-ea40-4c03-a294-040fb20d7b99',
    name: 'he whose name must not be spoken',
    layers: [
      {
        id: '25d82372-a653-4da3-994f-6d9b17fcaabf',
        name: 'Own Situation'
      },
      { id: '618ab9bc-ae58-47e5-82c6-c02a406d7b19', name: 'FFT' }
    ]
  }
]
````

## `odrix-cli users`

Bevor wir jemanden einladen an unserem Projekt teilzunehmen, müssen wir erst mal die [matrix] User ID kennen. Die sehen so aus: ```@USER_ID:HOME_SERVER```. Also z.B. ```@thomas:thomass-macbook-pro.local```. Mit `odrix-cli users` können die Benutzer eines Home Servers aufgelistet werden. Das ist allerdings nur bei einer überschaubaren Menge an Benutzern sinnvoll. Bei großen Server wie z.B. _matrix.org_ wird nur ein kleiner Teil der Benutzer geliefert.

````shell
bin/run users
[
  {
    userId: '@s2:thomass-macbook-pro.local',
    displayName: 'FFG-2',
    currentlyActive: true,
    presence: 'online'
  },
  {
    userId: '@thomas:thomass-macbook-pro.local',
    displayName: 'thomas',
    currentlyActive: false,
    presence: 'offline'
  }
]
````

## `odrix-cli invite`

OK, jetzt laden wir _@s2:thomass-macbook-pro.local_ zu unserem projekt ein:

````shell
bin/run invite 92767478-ea40-4c03-a294-040fb20d7b99 @s2:thomass-macbook-pro.local
done
````

## `odrix-cli invitations`

Damit unser Benutzer _@s2:thomass-macbook-pro.local_ prüfen kann, ob er zu Projekten eingeladen wurde, kann seine _Invitations_ abrufen.
__Achtung__: Dieses Command muss natürlich im Kontext des eingeladenen Benutzers aufgerufen werden.

````shell
bin/run invitations
[
  {
    id: '92767478-ea40-4c03-a294-040fb20d7b99',
    name: 'he whose name must not be spoken',
    layers: []
  }
]
````

Die Liste der Layers ist hier noch leer, da die EInladung noch nicht angenommen wurde.

## `odrix-cli join`

Der eingeladene Benutzer kann nun die Einladung annehmen und dem Projekt beitreten (join):

````shell
bin/run join 92767478-ea40-4c03-a294-040fb20d7b99
done
````

## `odrix-cli listen` und `odrix-cli post`

Nachdem jetzt das Geplänkel vorbei ist, können wir endlich Nachrichten austauschen. Dazu brauchen wir zwei Benutzer und zwei Instanzen der _odrix-cli_. Eine Instanz lauscht auf neue Nachricten, die andere Instanz erzeugt diese:

### Benutzer @s2:thomass-macbook-pro.local

_@s2_ ist der Nachrichtenempfänger und startet sein CLI im _listen_ Modus:

````shell
bin/run listen
press any key to terminate ...
````

### Benutzer @thomas:thomass-macbook-pro.local

_@thomas_ sendet eine Nachricht, die als JSON formatiert sein muss. __Achtung__: Meldungen können nicht an die Projekt-ID gesendet werden sundern nur an eine __Layer-ID__.

````shell
bin/run post 618ab9bc-ae58-47e5-82c6-c02a406d7b19 '{ "id": "@thomas", "lat": "47.725717", "lon": "13.075570"}'
done
````

Gleichzeitig taucht beim Benutzer _@s2_ diese Meldung auf:

````json
{
  project: {
    id: '92767478-ea40-4c03-a294-040fb20d7b99',
    name: 'he whose name must not be spoken'
  },
  layer: { id: '618ab9bc-ae58-47e5-82c6-c02a406d7b19', name: 'FFT' },
  body: { id: '@thomas', lat: '47.725717', lon: '13.075570' }
}

````

<!-- commandsstop -->
