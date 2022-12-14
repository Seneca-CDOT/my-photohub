# How to Contribute

1. Look for an existing issue you want to solve, file your own issue if you've found a bug or something you want to see from this project.
1. Fork the project to create your own copy of the project on your GitHub account.
1. Clone your fork locally using [Git](https://git-scm.com/): 
`git clone https://github.com/<your-github-username>/my-photohub`
1. Create a new branch and checkout into that branch: 
`git checkout -b <your-branch-name>`
1. Make your changes to address the issue you are taking on.
1. Create a pull request to propose your changes to the project.
1. Address code review comments from the project's contributors.
1. Wait for your pull request to be merged.

# Getting Started

Install [Node.js](https://nodejs.org/) and run the following command to install project dependencies:
`npm install`

To start the local site use:
`npm start`

To deploy updated versions:
`npm run deploy`

To run all tests via [Jest](https://jestjs.io/):
`npm test`

To run [Prettier](https://prettier.io/) via command line:
`npm run format`

To check if your files are formatted:
`npm run format:check`

To run the linter:
`npm run lint`

# Using Cloudflare Workers

1. Run `npx wrangler dev <filepath>` in your terminal to start a development server
1. Open a browser tab at http://localhost:8080/ to see your worker in action
1. Run `npx wrangler publish <file-path> --name <worker-name>` to publish your worker

Learn more at https://developers.cloudflare.com/workers/
