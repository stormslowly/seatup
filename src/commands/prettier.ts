import {Command, Flags} from '@oclif/core'
import {pkgUpSync} from 'pkg-up'
import {exitWithError, verboseExecSync, writeNextToPackageJson} from '../utils'

export default class Prettier extends Command {
  static description = 'setup prettier basic config'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    client: Flags.string({char: 'c', description: 'npm client to use', default: 'pnpm'}),
    skip: Flags.boolean({description: 'skip package install', default: false}),
  }

  static args = {}

  public async run(): Promise<void> {
    const {flags} = await this.parse(Prettier)

    const pkgPath = pkgUpSync()
    if (pkgPath) {

      verboseExecSync(flags.client, ['install', 'prettier', 'prettier-plugin-organize-imports',
        'prettier-plugin-packagejson', '--save-dev',
      ])

      writeNextToPackageJson(pkgPath, '.prettierrc.js', `
module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: "all",
  proseWrap: "never",
  overrides: [{ files: ".prettierrc", options: { parser: "json" } }],
  plugins: [
    require.resolve("prettier-plugin-packagejson"),
    require.resolve("prettier-plugin-organize-imports"),
  ],
};
`)
      writeNextToPackageJson(pkgPath, '.prettierignore', `
node_modules
dist
`,
      )

    } else {
      exitWithError('cant find package.json from current directory')
    }

  }
}
