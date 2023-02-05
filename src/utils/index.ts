import { sync as execaSync } from 'execa';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { sync as pkgUpSync } from 'pkg-up';

export { pkgUpSync };

export function verboseExecSync(file: string, args?: readonly string[]) {
  execaSync(file, args, {
    stdout: 'inherit',
  });
}

export function exitWithError(errorMessage: string) {
  console.error(errorMessage);
  // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
  process.exit(-1);
}

export function writeNextToPackageJson(
  pkgPath: string,
  fileName: string,
  content: string,
) {
  const toFile = join(dirname(pkgPath), fileName);

  writeFileSync(toFile, content);
}