https://docs.github.com/en/rest?apiVersion=2022-11-28

https://octokit.github.io/rest.js/v19

# node + typescript

https://stackoverflow.com/questions/62096269/cant-run-my-node-js-typescript-project-typeerror-err-unknown-file-extension

MARCH 2022
USING: Node 16.6.2, ts-node v 10.7.0

What worked for me was having "type": "module" in package.json, and adding

node --experimental-specifier-resolution=node --loader ts-node/esm ./src/app.ts
