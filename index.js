var pp = require('voxel-pp');

function SSAO(game) {
  if (!(this instanceof SSAO)) return new SSAO(game);
  this.game = game;
  var THREE = game.THREE;
  var composer = this.composer = pp(game);
        
  var depthShader = THREE.ShaderLib['depthRGBA'];
  var depthUniforms = THREE.UniformsUtils.clone(depthShader.uniforms);
  var depthMaterial = new THREE.ShaderMaterial({
    fragmentShader: depthShader.fragmentShader,
    vertexShader: depthShader.vertexShader,
    uniforms: depthUniforms
  });
  depthMaterial.blending = THREE.NoBlending;

  composer.addPass('RenderPass', game.scene, game.view.camera);

  var depthTarget = new THREE.WebGLRenderTarget(game.width, game.height, {
    minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat
  });

  composer.use(require('./shaders/ssao')(THREE));
  var effect = composer.passes[composer.passes.length - 1];
  effect.uniforms['tDepth'].value = depthTarget;
  effect.uniforms['size'].value.set(game.width, game.height);
  effect.uniforms['cameraNear'].value = game.view.camera.near;
  effect.uniforms['cameraFar'].value = game.view.camera.far;
  effect.renderToScreen = true;

  game.on('tick', function() {
    game.scene.overrideMaterial = depthMaterial;
    game.view.renderer.render(game.scene, game.view.camera, depthTarget);
    game.scene.overrideMaterial = null;
  });
}
module.exports = SSAO;

