import { sync as execaSync } from 'execa';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { sync as mkdir } from 'make-dir';
import { dirname, join } from 'path';
import { sync as pkgUpSync } from 'pkg-up';
import { TPL_ROOT_PATH } from './contants';

export { pkgUpSync };

export function verboseExecSync(file: string, args?: readonly string[]): void {
  execaSync(file, args, {
    stdout: 'inherit',
  });
}

export function exitWithError(errorMessage: string): never {
  console.error(errorMessage);
  // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
  process.exit(-1);
}

export function writeNextToPackageJson(
  pkgPath: string,
  fileName: string,
  content: string,
): void {
  const toFile = join(dirname(pkgPath), fileName);

  writeFileSync(toFile, content);
}

export class NpmProjectUtil {
  private projectPath: string;
  private pkgJSON: any;
  constructor(readonly pkgPath: string) {
    this.projectPath = dirname(pkgPath);
    this.pkgJSON = require(pkgPath);
  }

  writeFileToRoot(f: string, content: string): void {
    writeFileSync(join(this.projectPath, f), content);
  }

  copyTpl(tplPath: string, to: string): void {
    const tpl = readFileSync(join(TPL_ROOT_PATH, tplPath), 'utf-8');

    this.writeFileToRoot(to, tpl);
  }
  ensureFile(f: string, content: string): void {
    const p = join(this.projectPath, f);
    if (existsSync(p)) {
      return;
    }

    this.ensureDir(dirname(p));
    writeFileSync(p, content);
  }
  ensureDir(dir: string): this {
    mkdir(join(this.projectPath, dir));
    return this;
  }

  addDevDeps(dep: string, version: string): this {
    this.pkgJSON.devDependencies = {
      ...this.pkgJSON.devDependencies,
      [dep]: version,
    };
    this.updatePkg();
    return this;
  }
  private updatePkg(): void {
    writeFileSync(this.pkgPath, JSON.stringify(this.pkgJSON, null, 2));
  }
}

export function assert(expr: unknown, message: string): asserts expr {
  if (!expr) {
    console.error(message);
    // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
    process.exit(0);
  }
}
