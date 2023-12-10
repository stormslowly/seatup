import { Command } from '@oclif/core';
import { assert, NpmProjectUtil, pkgUpSync } from '../utils';

export default class Prettier extends Command {
  static description = 'setup prettier basic config';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  public async run(): Promise<void> {
    const pkgPath = pkgUpSync();
    assert(pkgPath, 'cant find package.json from current directory');

    const projectUtil = new NpmProjectUtil(pkgPath);

    projectUtil
      .addDevDeps('prettier', '^3.1.0')
      .addDevDeps('prettier-plugin-organize-imports', '^3.2.2')
      .addDevDeps('prettier-plugin-packagejson', '^2.4.2')
      .writeFileToRoot(
        '.prettierrc.js',
        `
module.exports = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: "all",
  proseWrap: "never",
  overrides: [{ files: ".prettierrc", options: { parser: "json" } }],
  plugins: [
    require.resolve("prettier-plugin-packagejson"),
    require.resolve("prettier-plugin-organize-imports"),
  ],
};
`.trimStart(),
      )
      .writeFileToRoot(
        '.prettierignore',
        `
node_modules
dist
`.trimStart(),
      );
  }
}
