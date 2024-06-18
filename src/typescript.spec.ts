// typescript.spec.ts

// linting error is not reported because unicorn/no-anonymous-default-export is disabled
export default function (): string {
  return 'hello';
}
