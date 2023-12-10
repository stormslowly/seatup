import { Args, Command } from '@oclif/core';
import { cpSync } from 'fs';
import * as path from 'path';
import { verboseExecSync } from '../utils';
import { TPL_ROOT_PATH } from '../utils/contants';

export default class Rust extends Command {
  static description = 'setup rust boilerplate';

  static examples = ['<%= config.bin %> <%= command.id %> swc'];

  static args = {
    template: Args.string({
      required: true,
      options: ['swc'],
      description: 'specify which templates to use',
    }),
    path: Args.string({ required: false }),
  };

  public async run(): Promise<void> {
    const { args } = await this.parse(Rust);

    if (!args.template) {
      console.error('no template name specified');
    }

    const cwd = process.cwd();

    const toPath = path.resolve(cwd, args.path ?? '.');

    verboseExecSync('cargo', ['init', toPath]);

    cpSync(path.join(TPL_ROOT_PATH, 'rust', args.template), toPath, {
      recursive: true,
    });
  }
}
