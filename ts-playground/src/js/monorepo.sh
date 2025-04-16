rm -rf ./monorepo-demo
mkdir ./monorepo-demo && cd ./monorepo-demo && pnpm init && tsc --init
echo "packages:
  - 'packages/*'" >./pnpm-workspace.yaml
echo "link-workspace-packages=true" >./.npmrc
mkdir ./packages/pkg/src ./packages/pkg2/src -p
cd ./packages/pkg && pnpm init && cd -
cd ./packages/pkg2 && pnpm init && cd -
echo "export function pkg() { console.log('pkg') }" >./packages/pkg/src/index.ts
echo "export function pkg2() { console.log('pkg2') }" >./packages/pkg2/src/index.ts
