# linear-zapier

Linear's Zapier application.

## Installation

```
yarn global add zapier-platform-cli
yarn
```

Zapier runs on AWS Lambda and requires Node 8. If you're running never version and don't have `nvm` set up, you can always run `yarn` with `--ignore-engines` which disables Node version check.

## Developing

- `yarn zapier-validate` - Validates Zapier app content
- `yarn zapier-push` - Deploys the app to Zapier
- `yarn test` - Tests your app

For testing, save your envvars to `.env`. `.env.default` has the required variables listed for development/testing.

### Set Production ENV
Create Linear OAuth2 Application under a new dedicated workspace: [Linar OAuth2](https://developers.linear.app/docs/oauth/authentication)

Then assign client keys to Zapier application:
`zapier env:set 2.1.0 CLIENT_ID=xxx CLIENT_SECRET=xxx`

## Forking

If you want to make changes and run your own version of this app, remove `.zapierapprc` file and create a new Zapier app with `zapier register "My app"` under your own Zapier account.

## License

MIT
