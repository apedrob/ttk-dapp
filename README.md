# TTK dApp

![index page](https://i.imgur.com/rs1Fkaa.jpeg)

## Getting Started

Begin by install the necessary dependencies and setting up the environment variables:

```bash
bin/setup
```

- To make the script executable, run `chmod +x bin/setup`.
- You will be required to enter values for the following variables: `ETHERSCAN_API_KEY`, `SEPOLIA_BANK_ADDRESS`, and `SEPOLIA_TOKEN_ADDRESS`.

Once completed, you can start the development server:

```bash
pnpm dev
```

## Decisions and Challenges

### Web3 Integration and Contract Interaction

- Implemented read/write methods for ERC20 Token and Bank contracts using Web3 libraries such as RainbowKit and Wagmi (CLI for better development experience).
- Handled token approvals for interactions with both ERC20 Token and Bank contracts.

- Given the balances and allowance limits, when executing the contract functions to withdraw or deposit, it pre-validated the transaction using the simulate contract function.

- Added a button (for testing purposes) to mint tokens for the current wallet with a fixed amount defined in the `.env` file, facilitating contract testing and development workflows.

### UI Design and Features

- Designed user-friendly form for depositing and withdrawing tokens with numeric input validation, also integrated token approvals for secure and verified interactions with the Bank contract.
- Included a maximum amount button to facilitate users with frequent actions and prevent misinputs.

- Implemented visual elements such as disabling buttons during transactions, explanatory labels and messages for different transaction states for seamless user experience.

- Displayed real-time balances and allowance values after a transaction is completed to enhance user feedback and application transparency.

### Best Practices and Deployment

- Chose Next.js Pages router due to my familiarly and suitability for one-page applications, allowing better development and maintenance.

- Securely managed sensitive data such as contract addresses, API keys, and settings using environment variables.

- Provided instructions and script to ease the setup and development of the application.
- Configured deployment to Vercel with valid environment variables and Wagmi generated configuration.

## Next steps

- Add unit and e2e testing - the `tests` branch already contains the configuration and skeleton for writing playwright and jest tests, as exemplified in `/tests/Form.spec.ts` and `/e2e/Home.spec.ts`. Expand this testing suite for all components and pages.

- Similar to `Deposit` and `Withdraw`, add a contract simulation hook for the other transaction buttons, `Approve` and `Mint`, and improve transaction state feedback.

- Enhance the Form component and its state handling using libraries such as React Hook Form or Formik.
