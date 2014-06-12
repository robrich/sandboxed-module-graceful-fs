This is an example project showing how v 1.0.0 of [`sandboxed-module`](https://github.com/felixge/node-sandboxed-module) and v.3.0.2 of [`graceful-fs`](https://github.com/isaacs/node-graceful-fs) collide.

Note that the tests fail with `ENOENT, no such file or directory 'path/to/this/project/constants'` on [line 262 of sandboxed_module.js](https://github.com/felixge/node-sandboxed-module/blob/master/lib/sandboxed_module.js#L262)

Causes:

- `graceful-fs`: on [line 2 of polyfil.js](https://github.com/isaacs/node-graceful-fs/blob/master/polyfills.js#L2): `require('constants')`
- `graceful-fs`: does not include `constants` in [package.json dependencies](https://github.com/isaacs/node-graceful-fs/blob/master/package.json)
- `sandboxed-module`: loads all [filenames](https://github.com/felixge/node-sandboxed-module/blob/master/lib/sandboxed_module.js#L262) resolved previously
- `sandboxed-module`: resolves [dependency filenames](https://github.com/felixge/node-sandboxed-module/blob/master/lib/sandboxed_module.js#L83), but does not validate the file exists

Result:

`ENOENT, no such file or directory '/path/to/this/project/constants'` on [line 262 of sandboxed_module.js](https://github.com/felixge/node-sandboxed-module/blob/master/lib/sandboxed_module.js#L262)

Note that `sandboxed-module` v 0.3.0 doesn't error in this way.
Note that `graceful-fs` has required the missing `constants` package since
[the](https://github.com/isaacs/node-graceful-fs/blob/b1260e951966623a78841dee6fe6694e55ce2d98/graceful-fs.js#L12) [beginning](https://github.com/isaacs/node-graceful-fs/blob/b1260e951966623a78841dee6fe6694e55ce2d98/package.json#L14).
