import { Command } from '@oclif/core';
import * as fs from 'fs';
import { exec } from 'shelljs';

export default class Global extends Command {
  static description = 'setup global gitignore';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  public async run(): Promise<void> {
    this.setupGlobalGitignore();
  }

  private setupGlobalGitignore() {
    const gitignore = `${process.env.HOME}/.gitignore_global`;

    if (!fs.existsSync(gitignore)) {
      fs.writeFileSync(gitignore, '*.seatup\n');
      exec(`git config --global core.excludesfile ${gitignore}`);
      return;
    }

    const content = fs.readFileSync(gitignore, 'utf-8');
    if (!content.includes('*.seatup')) {
      fs.writeFileSync(gitignore, `${content}\n*.seatup`);
    }
  }
}
