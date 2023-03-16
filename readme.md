깃허브 패키지 및 버전 관련된 내용을 삭제 할 수 있도록 만들어둔 스크립트.

깃허브 tag, release, packages들을 삭제합니다.

## Setup

.env 파일을 root에서 만들고 자신의 토큰 및 설정으로 아래와 같이 내용을 채워줍니다.

```
GITHUB_TOKEN=YOUR GITHUB PAT
OWNER=nwaycorp
REPO_NAME=nwave
PACKAGE_TYPE=npm
```

## Scripts

### delete:all-package-versions

Github Packages 버전을 모두 삭제합니다.

### delete:releases

Github Release를 모두 삭제합니다.

### delete:tags

Github remote Tag를 모두 삭제합니다.

만약 Local Git Tag를 모두 삭제할 필요가 있다면 아래 명령어 사용

```
$ git tag | xargs -L 1 | xargs git tag --delete
```

## References

### Github API

https://docs.github.com/en/rest?apiVersion=2022-11-28

### Github Octokit

https://octokit.github.io/rest.js/v19

### node + typescript + ESM

https://stackoverflow.com/questions/62096269/cant-run-my-node-js-typescript-project-typeerror-err-unknown-file-extension

MARCH 2022
USING: Node 16.6.2, ts-node v 10.7.0

What worked for me was having "type": "module" in package.json, and adding

node --experimental-specifier-resolution=node --loader ts-node/esm ./src/app.ts
