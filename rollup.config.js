import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const libraryName = 'mjml-i18n'

const banner = `/*!
 * ${pkg.name}
 * ${pkg.description}
 *
 * @version v${pkg.version}
 * @author ${pkg.author}
 * @homepage ${pkg.homepage}
 * @repository ${pkg.repository.url}
 * @license ${pkg.license}
 */`

export default commandLineArgs => {
  const configs = [
    // CommonJS (for Node) and ES module (for bundlers) build
    {
      input: 'src/index.js',
      external: [], // indicate which modules should be treated as external
      output: [
        {
          banner,
          file: pkg.main,
          format: 'cjs'
        }
        // {
        //   banner,
        //   file: pkg.module,
        //   format: 'es'
        // }
      ],
      plugins: [
        resolve({ browser: false, modulesOnly: true }), // teach Rollup how to find external modules
        commonjs({ include: 'node_modules/**' }), // so Rollup can convert external modules to an ES module

        // jsonParse(),
        babel({
          exclude: ['node_modules/**']
        })
      ]
    }
  ]

  // if (commandLineArgs.environment === 'BUILD:production') {
  //   // UMD Production
  //   configs.push({
  //     input: 'src/index.js',
  //     output: {
  //       banner,
  //       name: libraryName,
  //       file: `dist/${libraryName}.umd.min.js`,
  //       format: 'umd'
  //     },
  //     plugins: [
  //       // Uncomment the following 2 lines if your library has external dependencies
  //       resolve(), // teach Rollup how to find external modules
  //       commonjs(), // so Rollup can convert external modules to an ES module
  //       babel({
  //         presets: [['@babel/env', { modules: false }]],
  //         exclude: ['node_modules/**']
  //       }),
  //       terser({
  //         output: {
  //           comments: /^!/
  //         }
  //       })
  //     ]
  //   })
  // }

  return configs
}
