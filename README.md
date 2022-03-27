
# LendSqr Backend Engineer

This project is a test for a backend engineer role at LendSqr. 






## Installation

CD into directory where you want to pull the project into.

Pull the project from github

```bash
  git clone https://github.com/emmylexo/lendSqr.git
```

CD into project directory

```bash
  cd lendSqr
```

Install project dependencies

```bash
  npm install
```

Copy .env.example and edit environment variable

```bash
  cp .env.example .env
```

Create Database and user with credentials in .env

Run Migrations

```bash
  npm run migrate
```

Start Project

```bash
  npm run dev
```
## Running Tests

To run tests, run the following command.

```bash
  npm run test
```


## Tech Stack

**Server:** NodeJs, Express, Mocha, Chai, KnexJs, Mysql, Redis, JWT


## Authors

- [@AbengEmmanuel](https://www.github.com/emmylexo)


## Features

- Create User Account
- Login to User Account
- Delete User Account
- Top User Account
- Transfer to User Account
- Withdraw from User Account
- Transaction Logs Table

# Note

The test does not require connecting to a third-party service provider for 
any financial service, but is aimed at showing technical competence and thought process, hence the wallet endpoint was implemented the way it was. 
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Documentation

[Postman Collection](https://www.getpostman.com/collections/7b5e2d8e6ace47c03fb1)

[Environment Variable](https://www.postman.com/my-bummi/workspace/emmy-public-workspace/environment/3263867-8bba230c-99d8-46c0-a832-f40111d5c54d)