# 🦕 jsx-sh/ast

Internal AST parser for [jsx-sh](https://github.com/jsx-sh) platform.

<br />

## Usage

Import in your deno script:

```typescript
import { ParseAST } from 'https://github.com/jsx-sh/ast/raw/main/mod.ts';

const parser = new ParseAST();
const ast = parser.parse(`
  export function hello(): string {
    return 'Hello World!';
  }
`);

console.log(ast);
```

<br />

## Test

```bash
# unit tests
deno ./test.ts
```

## Format code

```bash
deno fmt **/*.ts
```
