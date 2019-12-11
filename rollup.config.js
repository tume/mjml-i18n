import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
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
    // CommonJS (for Node)
    {
      input: 'src/index.js',
      external: [],
      output: [
        {
          banner,
          name: libraryName,
          file: `dist/${libraryName}.cjs.js`,
          format: 'cjs'
        }
      ],
      plugins: [
        resolve({ browser: false, modulesOnly: true }),
        commonjs({ include: 'node_modules/**' }),
        babel({
          exclude: ['node_modules/**']
        }),
        terser({
          output: {
            comments: /^!/
          }
        })
      ]
    }
  ]

  return configs
}
