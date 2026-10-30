# frontend
> [!NOTE]
> This repo has strict code quality controls in place that will automatically block your PR if they don't pass.
> What this means: You may need to fix some of the issues that the automatic code style review brings up (most are auto-fixed though).

> [!WARNING]
> Before you get started, I ***STRONGLY*** recommend you read through this readme carefully.

Please note the starter code was "stolen" from https://github.com/janishutz/MusicPlayer (developed by one of the members of the group)

## Development
### Getting Started with WebDev
Learning Vue:
- [Official Docs](https://vuejs.org/guide/introduction.html)
- Docs here
- [MDN Docs](https://developer.mozilla.org/en-US/)
- [MusicPlayer](https://github.com/janishutz/MusicPlayer/tree/dev/web) by @janishutz (as a reference for implementation)
- [EYE-TAP frontend](https://github.com/eye-tap/frontend) (as a reference for implementation)
- Any other docs online
- [FontAwesome](https://fontawesome.com/search?ic=free-collection)


### Linter and type checker runs on PRs
To keep the code style consistent, on every pull request, a GitHub action will run formatting your code if you haven't done so already.
It will also run a type check and ***NO PR WITH FAILING TESTS*** will be merged (into `main`).


### Running linter and type checker
You may run the linter and type-checker using the shipped `run-lint.sh` script.

If you also occasionally use the `dev-container-node` image or have `node` and `npm` installed locally, you may run the following commands in the shell:
```bash
npm run type-check && npm run lint-fix
```


### Dev environment setup
You may choose between using the prebuilt docker images I provide for everything (including a local backend that will be required in the future) via the commands below,
or follow the instructions in the next section to develop using the `dev-container-node` or locally installed `node.js`.

The recommended way of running the backend (you don't need to worry about deps or anything) is to run one of the following commands in the root directory of this repo:
```bash
docker compose -f compose.backendless.yml up -d # If you want to run without backend (that may at some point stop being viable)
docker compose up -d # If you want to run with a backend
```


#### Running with locally installed tools
***This section also applies if you use the `dev-container-node` instead of the `compose` file.***

Install the dependencies using
```bash
npm i
```
then start the development server of `vite` using
```bash
npm run dev
```
For spinning up the backend without docker, see the backend repo.


#### Running with `dev-container-node`
Run the following command with docker installed to get a container with the same dependencies installed as runner, but with a shell instead:
```bash
docker run -it -p 8081:8081 --name prototype -v .:/mnt ghcr.io/janishutz/dev-container-node
```
To launch the container again later, you can use
```bash
docker start -i prototype
```
or to start the container and removing it whenever you exit it:
```bash
docker run -it -p 8081:8081 --rm -v .:/mnt ghcr.io/janishutz/dev-container-node
```

#### Details
The following environment variables can be set during development:
```env
VITE_BACKENDLESS=true # (or false) to disable login checks
VITE_BACKEND_URL=<url> # To set the backend URL to anything other than http://localhost:8080
```
