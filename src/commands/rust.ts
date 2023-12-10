import {Args, Command, Flags} from '@oclif/core'
import * as path from 'path';
import {verboseExecSync} from '../utils';
import {cpSync} from 'fs';
import {TPL_ROOT_PATH} from '../utils/contants';

export default class Rust extends Command {
    static description = 'setup rust boilerplate'

    static examples = [
        '<%= config.bin %> <%= command.id %> swc',
    ]

    static args = {
        template: Args.string({
            required: true,
            options: ['swc'],
            description: 'specify which templates to use',
        }),
        path: Args.string({required: false}),
    }

    public async run(): Promise<void> {
        const {args} = await this.parse(Rust)

        if (!args.template) {
            console.error('no template name specified')
        }

        const cwd = process.cwd();

        const toPath = path.resolve(cwd, args.path ?? '.');

        verboseExecSync('cargo', ['init', toPath]);

        cpSync(
            path.join(TPL_ROOT_PATH, 'rust', args.template)
            , toPath,
            {
                recursive: true,
            },
        );

        // const name = flags.name ?? 'world'
        // this.log(`hello ${name} from /Users/pshu/git/seatup-2/src/commands/rust.ts`)
        // if (args.file && flags.force) {
        //     this.log(`you input --force and --file: ${args.file}`)
        // }
    }
}
