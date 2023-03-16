깃허브 패키지 및 버전 관련된 내용을 삭제 할 수 있도록 만들어둔 스크립트.

깃허브 tag, release, packages들을 삭제합니다.

## Scripts

### delete:all-package-versions

패키지 버전을 모두 삭제합니다.

### delete:releases

release를 모두 삭제합니다.

### delete:tags

tag를 모두 삭제합니다.

## References

https://docs.github.com/en/rest?apiVersion=2022-11-28

https://octokit.github.io/rest.js/v19

### node + typescript

https://stackoverflow.com/questions/62096269/cant-run-my-node-js-typescript-project-typeerror-err-unknown-file-extension

MARCH 2022
USING: Node 16.6.2, ts-node v 10.7.0

What worked for me was having "type": "module" in package.json, and adding

node --experimental-specifier-resolution=node --loader ts-node/esm ./src/app.ts
