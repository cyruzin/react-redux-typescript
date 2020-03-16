# Base Web Project

Base React web project with Redux and Typescript.

## Prerequisite

Make sure that you have the back-end API up and running before run this application.

## Architecture

This project uses the duck pattern to scale better. This pattern provides better code organization as well.

See this [repository](https://github.com/erikras/ducks-modular-redux) for more information.

## Usage

Before everything, make sure to create a copy o the **.env.example** file and fill the variables.

For development create .env.development file and for production create .env.production file.

### Environments (.env)

| NAME                    | DEFAULT    | REQUIRED | DESCRIPTION                 |
| ----------------------- | ---------- | -------- | --------------------------- |
| REACT_APP_ENV           | production | true     | production or development   |
| REACT_APP_API_ENDPOINT  |            | true     | api endpoint                |
| REACT_APP_AUTH_ENDPOINT |            | true     | api authentication endpoint |

### Local

Install the dependencies:

```sh
 yarn
```

Then, run the command bellow:

```sh
 yarn start
```

### Docker

Run the command bellow:

```sh
 docker-compose up -d
```

## Tests

This application uses **testing-library** for tests.

## Techonologies & Tools

- Axios
- Date-Fns
- Material UI
- JTW Decode
- React
- React Router
- Redux
- Redux-Thunk
- Typescript

## Best Practices

- Avoid the type any.
- Use hooks based components instead of classes.
- Test your own code before send pull requests.
- Write a good commit message.
