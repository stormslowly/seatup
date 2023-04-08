import { Command } from '@oclif/core';
import { assert, NpmProjectUtil, pkgUpSync } from '../utils';

abstract class BaseCommand extends Command {
  protected getProjectUtil(): NpmProjectUtil {
    const pkgPath = pkgUpSync();
    assert(pkgPath, 'cant find package.json from current directory');

    const projectUtil = new NpmProjectUtil(pkgPath);

    return projectUtil;
  }
}

export default class Jest extends BaseCommand {
  static description = 'setup jest with @umijs/test(using esbuild)';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {};

  public async run(): Promise<void> {
    const utils = this.getProjectUtil();

    utils
      .addDevDeps('jest', '^29')
      .addDevDeps('@types/jest', '^29')
      .addDevDeps('@umijs/test', '^4')
      .addDevDeps('ts-node', '*')
      .addScript('test', 'TS_NODE_TRANSPILE_ONLY=yes jest')
      .writeFileToRoot(
        'jest.config.ts',
        `
import { Config, createConfig } from '@umijs/test';

export default () => {
  return {
    ...createConfig({
      target: 'browser',
      jsTransformer: 'esbuild',
      // config opts for esbuild , it will pass to esbuild directly
      jsTransformerOpts: { jsx: 'automatic' },
    })
  } as Config.InitialOptions; 
}
`,
      );
  }
}
