# RepaymentPlan

This project is an Angular-based application designed to calculate and display repayment plans for loans. It allows users to input loan details such as the amount, interest rates, and repayment rates, and generates a monthly repayment schedule.

## Features

- Input loan details and generate repayment plans.
- Displays repayment schedules with detailed breakdowns.
- Built with zoneless-Angular.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jo-soft/repayment-plan
   cd RepaymentPlan
   ```

2. **Install dependencies**:
   Ensure you have [Node.js](https://nodejs.org/)  19.X or newer and [npm](https://www.npmjs.com/) installed. Then run:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx ng serve
   ```
   Open your browser and navigate to `http://localhost:4200/`.

## Husky Commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) to enforce commit hooks for maintaining code quality. The hooks ensure that:

- Code is linted before committing.
- Tests are run  before pushing to prevent breaking changes.


## Running Tests

To execute unit tests, use:

```bash
npx ng test
```

Because it's a toy project not every file is fully tested.

## Building the Project

To build the project for production, run:

```bash
npx ng build
```

The build artifacts will be stored in the `dist/` directory.