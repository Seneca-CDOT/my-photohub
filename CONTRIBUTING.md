# Getting Started

Install Node.js if you haven't already and run:
`npm install`

To start the local site use:
`npm start`

To deploy updated versions:
`npm run deploy`

To run all tests via Jest:
`npm test`

# Using Cloudflare Workers

1. Run `npx wrangler dev <filepath>` in your terminal to start a development server
1. Open a browser tab at http://localhost:8080/ to see your worker in action
1. Run `npx wrangler publish <file-path> --name <worker-name>` to publish your worker

Learn more at https://developers.cloudflare.com/workers/
