# Contributing

Thanks for taking a look! This is a small project, so the process is light.

1. Fork the repo and create a branch from `main`.
2. Install dependencies with `npm ci` (Node 20+).
3. Make your change, and add or update tests in `tests/` when you touch logic in `lib/`.
4. Before opening a PR, make sure these all pass:
   ```bash
   npm run lint
   npm test
   npm run build
   ```
5. Open a pull request with a short description of what changed and why.

Please don't commit `.env` files, credentials, or real customer data.
