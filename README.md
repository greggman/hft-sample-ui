# hft-sample-ui

This is a sample UI library for HappyFunTimes.

It is intended only be a sample. It mostly deals with the
controllers displaying things like the user's name input,
and the "disconnected" message.

It also includes code for displaying virtual dpads
and a few other things.

It's *a SAMPLE*. You can use this as an example
to build your own.

### Handling Player Names

The CommonUI allows the player to choose a name. To deal with this
there's a `PlayerNameManager` you can use in the game. For example

    var GameServer = hft.GameServer;
    var PlayerNameManager = sampleUI.PlayerNameManager;

    var server = new GameServer();
    server.addEventListener('playerconnect', function(netPlayer, name) {
      // when a player connects make a new player object
      players.push(new Player(netPlayer, name));
    });

    class Player {
      constructor(netPlayer, name) {
        this.netPlayer = netPlayer;

        netPlayer.addEventListener('disconnect', Player.prototype.disconnect.bind(this));

        // create a PlayerNameManager
        this.playerNameManager = new PlayerNameManager(netPlayer);

        // The player name manager emits a `setName` message then the player changes their name
        this.playerNameManager.on('setName', Player.prototype.handleNameMsg.bind(this));
      }
      handleNameMsg(name) {
        this.name = name;
      }
    }

There is also a `'busy'` message you can check for sent while the player is editing their
name. Maybe you'd like to pull them out of the game while they are entering their name

    class Player {
      constructor(netPlayer, name) {
        this.netPlayer = netPlayer;

        netPlayer.addEventListener('disconnect', Player.prototype.disconnect.bind(this));

        // create a PlayerNameManager
        this.playerNameManager = new PlayerNameManager(netPlayer);

        // The player name manager emits a `setName` message then the player changes their name
        this.playerNameManager.on('setName', Player.prototype.handleNameMsg.bind(this));
        this.playerNameManager.on('busy', Player.prototype.handleBusyMsg.bind(this));
      }
      handleNameMsg(name) {
        this.name = name;
      }
      handleBusyMsg(busy) {
        this.busy = busy;  // true if the player is editing their name
      }
    }

It's up to you to decide if you care about this messages. You can also just reference
the `PlayerNameManager.name` and `PlayerNameManager.busy` properties to get the current
values of each.


