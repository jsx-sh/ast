# 🦕 jsx-sh/ast

[Deno](https://deno.land) module starter repository.

## Usage

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

## Test

```bash
# unit tests
deno ./test.ts
```

## Format code

```bash
deno fmt **/*.ts
```