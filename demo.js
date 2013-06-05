var createGame = require('voxel-engine');
var createTerrain = require('voxel-perlin-terrain');

var game = createGame({
  chunkDistance: 2,
  generateVoxelChunk: createTerrain({scaleFactor:6}),
  materials: ['brick', ['grass', 'dirt', 'grass_dirt'], 'dirt'],
  texturePath: 'textures/'
});
var container = document.body;
game.appendTo(container);

// create a player
var createPlayer = require('voxel-player')(game);
var player = createPlayer('textures/shama.png');
player.yaw.position.set(0, -40, 0);
player.possess();

// Create a rabbit
var critterCreator = require('voxel-critter')(game);
game.once('tick', function() {
  var rabbit = new Image();
  rabbit.onload = function() {
    var rabbits = [];
    for (var i = 0; i < 10; i++) {
      var r = critterCreator(rabbit);
      r.position.x = player.yaw.position.x;
      r.position.y = player.yaw.position.y;
      r.position.z = player.yaw.position.z - 10;
      r.on('block', function() { r.move(0, 0.02, 0.02); });
      rabbits.push(r);
    }
    game.setInterval(function () {
      for (var i = 0; i < rabbits.length; i++) {
        rabbits[i].rotation.y += Math.random() * Math.PI / 2 - Math.PI / 4;
        rabbits[i].move(0, 0, 0.05 * Math.random());
      }
    }, 1000);
  };
  rabbit.src = './rabbit.png';
});

// Enabled SSAO
require('./')(game);
