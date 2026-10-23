# playground/express

API-only playground for `kz-js-utils`. Serves host system info as JSON.

```sh
# from repo root: build the package first
pnpm build
cd playground/express
pnpm install
pnpm dev          # PORT defaults to 3000
curl localhost:3000/api/system       # static hardware and OS
curl localhost:3000/api/monitoring   # live cpu, memory, disk, network, uptime
```
