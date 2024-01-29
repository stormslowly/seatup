import { Command, Flags } from '@oclif/core';
import * as fs from 'fs';
import * as path from 'path';

const MIRROR_CONFIG = 'registry=https://registry.npmmirror.com';
export default class Cnpm extends Command {
  static description = 'config NPM registry to China mirror';

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --recover',
  ];

  static flags = {
    recover: Flags.boolean({
      char: 'r',
      description: 'recover npm config from backup file',
    }),
  };

  private setNpmrc(configContent: string) {
    if (
      configContent.includes('registry=') &&
      !configContent.includes(MIRROR_CONFIG)
    ) {
      configContent = configContent.replace(/registry=.+/, MIRROR_CONFIG);
    } else {
      configContent += `\r${MIRROR_CONFIG}`;
    }

    return configContent;
  }

  private recoverConfig(file: string) {
    const backup = `${file}.seatup`;

    if (fs.existsSync(backup)) {
      const configContent = fs.readFileSync(backup, 'utf-8');
      fs.writeFileSync(file, configContent);
      fs.unlinkSync(backup);
      return;
    }

    if (fs.existsSync(file)) {
      const configContent = fs.readFileSync(file, 'utf-8');
      if (
        configContent.includes('registry=') &&
        configContent.includes(MIRROR_CONFIG)
      ) {
        fs.writeFileSync(file, configContent.replace(/registry=.+/, ''));
      }
    }
  }

  private addConfig(file: string) {
    let content = '';
    if (fs.existsSync(file)) {
      content = fs.readFileSync(file, 'utf-8');
    }

    fs.writeFileSync(`${file}.seatup`, content);
    fs.writeFileSync(file, this.setNpmrc(content));
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Cnpm);

    const recover = flags.recover;

    const npmrcFile = path.join(process.cwd(), '.npmrc');

    if (recover) {
      this.recoverConfig(npmrcFile);
      return;
    }

    this.addConfig(npmrcFile);
  }
}
