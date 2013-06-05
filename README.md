# voxel-ssao

This is an experiment to implement screen space ambient occlusion into voxel.js. It works but it's slow and doesn't look as good as it should.

**So use sparingly.**

Thanks to [alteredq](http://alteredqualia.com/) for the SSAO shader and three.js. Also thanks to [hughsk](https://github.com/hughsk) for making post-processing easier in voxel.js with [voxel-pp](https://github.com/hughsk/voxel-pp).

# example

[View this example](http://shama.github.io/voxel-ssao)

```js
// Add this to your game and whamo!
require('voxel-ssao')(game)
```

# install

With [npm](https://npmjs.org) do:

```
npm install voxel-ssao
```

Use [browserify](http://browserify.org) to `require('voxel-ssao')`.

## release history
* 0.1.0 - initial release

## license
Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
