# WA Project Base Web Project

This is a base web project that uses Redux to manage React state.

## Prerequisite

Make sure that you have the back-end API up and running before run this application.

## Architecture

This project uses the duck pattern to scale better. This pattern provides better code organization as well.

See this [repository](https://github.com/erikras/ducks-modular-redux) for more information.

## Development

Before everything, make sure to fill the **.env.development** file.

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

## Login Credentials

**E-mail**: admin@waproject.com.br

**Password**: senha@123

## Tests

This application uses **testing-library** for tests.

## Techonologies & Tools
- Axios
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