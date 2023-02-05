import {execa, execaSync} from 'execa'
import {writeFileSync} from 'fs'
import {dirname, join} from 'path'

export function errorLog() {

}

export function verboseExecSync(file: string, args?: readonly string[],
) {

  execaSync(file, args, {
    stdout: 'inherit',
  })
}

export function exitWithError(errorMessage: string) {
  console.log(errorMessage)
  process.exit(-1)
}

export function writeNextToPackageJson(pkgPath: string, fileName: string, content: string) {

  const toFile = join(dirname(pkgPath), fileName)

  writeFileSync(toFile, content)
}
