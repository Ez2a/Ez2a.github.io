var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};


TopDownGame.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
      
    //All my text is going here......yeah....
    this.game.add.text(175, 140, "YOU ARE", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(175, 300, "SQUARE", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(250, 200, "Arrow keys to move", { font: "12px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(875, 130, "You live in square ville,", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(1075, 300, "where everyone leads happy lives.", { font: "38px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(2375, 300, "Boats arrived.", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(3275, 140, "They carried circles.", { font: "38px 'Roboto'", fill: "#FF9174", align: "center" });
    this.game.add.text(3875, 300, "And they brought their holy numbers.", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(4075, 270, "3.14159", { font: "24px 'Roboto'", fill: "#A7A7A7", align: "center" });
      this.game.add.text(4175, 170, "3.14159", { font: "24px 'Roboto'", fill: "#A7A7A7", align: "center" });
    this.game.add.text(4675, 50, "And their sharp sticks.", { font: "40px 'Roboto'", fill: "#EA7A5D", align: "center" });
    this.game.add.text(5405, 200, "The circles easily conquered squareville.", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(6405, 160, "The squares were cut...", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(6635, 300, "And reassembled.", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(7605, 300, "Escape!", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(8305, 300, "Failure.", { font: "50px 'Roboto'", fill: "#000000", align: "center" });  
    this.game.add.text(9105, 140, "YOU ARE", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(9105, 300, "CAUGHT", { font: "48px 'Roboto'", fill: "#FF6942", align: "center" });
    this.game.add.text(9505, 140, "YOU ARE", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(9505, 300, "CUT", { font: "48px 'Roboto'", fill: "#FF5225", align: "center" });
    this.game.add.text(10505, 140, "YOU ARE", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(10505, 300, "REASSEMBLED", { font: "48px 'Roboto'", fill: "#FF4D1E", align: "center" });
    this.game.add.text(11405, 100, "YOU ARE", { font: "48px 'Roboto'", fill: "#000000", align: "center" });
    this.game.add.text(11405, 320, "CHAIR", { font: "48px 'Roboto'", fill: "#A95C48", align: "center" });
  },

createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;    
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },

    
    
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    //player movement
    
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      if(this.player.body.velocity.y == 0)
      this.player.body.velocity.y -= 200;
    }
    else if(this.cursors.down.isDown) {
      if(this.player.body.velocity.y == 0)
      this.player.body.velocity.y += 200;
    }
    else {
      this.player.body.velocity.y = 0;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 200;
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 200;
    }
    if (this.player.x > 8000 && this.player.x < 11505) {
        this.game.physics.arcade.moveToXY(this.player, 11505, 220, 400, )
    }
    if (this.player.x > 9505 && this.player.x < 9906) {
        this.player.loadTexture('cut');
    }
    if (this.player.x > 10505 && this.player.x < 10906) {
        this.player.loadTexture('reassemble');
    }
    if (this.player.x > 11504) {
        this.player.loadTexture('chair');
    }
    if (this.player.x > 11505) {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
    }
  },
    collect: function() {
    this.game.state.restart();
  },
};