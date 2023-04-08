Seatup
=================

![logo-slogan](https://raw.githubusercontent.com/stormslowly/seatup/master/logos/logo-slogan.png)


[![Version](https://img.shields.io/npm/v/seatup.svg)](https://npmjs.org/package/seatup)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/stormslowly/seatup/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/seatup.svg)](https://npmjs.org/package/seatup)
[![License](https://img.shields.io/npm/l/seatup.svg)](https://github.com/stormslowly/seatup/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g seatup
$ setup COMMAND
running command...
$ setup (--version)
seatup/1.0.0-alpha.1 darwin-x64 node-v16.14.0
$ setup --help [COMMAND]
USAGE
  $ setup COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`setup autocomplete [SHELL]`](#setup-autocomplete-shell)
* [`setup cnpm`](#setup-cnpm)
* [`setup global`](#setup-global)
* [`setup hello PERSON`](#setup-hello-person)
* [`setup hello world`](#setup-hello-world)
* [`setup help [COMMANDS]`](#setup-help-commands)
* [`setup prettier`](#setup-prettier)
* [`setup ts`](#setup-ts)
* [`setup typescript`](#setup-typescript)

## `setup autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ setup autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ setup autocomplete

  $ setup autocomplete bash

  $ setup autocomplete zsh

  $ setup autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v2.1.8/src/commands/autocomplete/index.ts)_

## `setup cnpm`

config NPM registry to China mirror

```
USAGE
  $ setup cnpm [-r]

FLAGS
  -r, --recover  recover npm config from backup file

DESCRIPTION
  config NPM registry to China mirror

EXAMPLES
  $ setup cnpm

  $ setup cnpm --recover
```

_See code: [dist/commands/cnpm.ts](https://github.com/stormslowly/seatup/blob/v1.0.0-alpha.1/dist/commands/cnpm.ts)_

## `setup global`

describe the command here

```
USAGE
  $ setup global

DESCRIPTION
  describe the command here

EXAMPLES
  $ setup global
```

_See code: [dist/commands/global.ts](https://github.com/stormslowly/seatup/blob/v1.0.0-alpha.1/dist/commands/global.ts)_

## `setup hello PERSON`

Say hello

```
USAGE
  $ setup hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/stormslowly/seatup/blob/v1.0.0-alpha.1/dist/commands/hello/index.ts)_

## `setup hello world`

Say hello world

```
USAGE
  $ setup hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ setup hello world
  hello world! (./src/commands/hello/world.ts)
```

## `setup help [COMMANDS]`

Display help for setup.

```
USAGE
  $ setup help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for setup.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.2/src/commands/help.ts)_

## `setup prettier`

setup prettier basic config

```
USAGE
  $ setup prettier [-c <value>] [--skip]

FLAGS
  -c, --client=<value>  [default: pnpm] npm client to use
  --skip                skip package install

DESCRIPTION
  setup prettier basic config

EXAMPLES
  $ setup prettier
```

_See code: [dist/commands/prettier.ts](https://github.com/stormslowly/seatup/blob/v1.0.0-alpha.1/dist/commands/prettier.ts)_

## `setup ts`

setup basic tsconfig and its utils

```
USAGE
  $ setup ts

DESCRIPTION
  setup basic tsconfig and its utils

ALIASES
  $ setup typescript

EXAMPLES
  $ setup ts
```

_See code: [dist/commands/ts.ts](https://github.com/stormslowly/seatup/blob/v1.0.0-alpha.1/dist/commands/ts.ts)_

## `setup typescript`

setup basic tsconfig and its utils

```
USAGE
  $ setup typescript

DESCRIPTION
  setup basic tsconfig and its utils

ALIASES
  $ setup typescript

EXAMPLES
  $ setup typescript
```
<!-- commandsstop -->
