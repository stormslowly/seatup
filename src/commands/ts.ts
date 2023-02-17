import { Command } from '@oclif/core';
import { assert, NpmProjectUtil, pkgUpSync } from '../utils';

export default class Ts extends Command {
  static description = 'setup basic tsconfig and its utils';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static aliases = ['typescript', 'tsc'];
  public async run(): Promise<void> {
    const pkgPath = pkgUpSync();
    assert(pkgPath, 'No package.json Not found');

    const projectUtil = new NpmProjectUtil(pkgPath);

    projectUtil
      .addDevDeps('typescript', '^4.9.0')
      .addDevDeps('tsx', 'latest')
      .addDevDeps('@types/node', '^18.0.0')
      .ensureDir('src')
      .copyTpl('ts/tsconfig.json.tpl', 'tsconfig.json');
  }
}
