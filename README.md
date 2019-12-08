GraphQL
===============

Setup
-----

run `npm install` to install dependancies.

run `npm start` to start the server.

run `npm run dev` to run a watched instance of the server that will reload when a file changes.

Style Guide
-----------

Please use the [Airbnb Style Guide](https://github.com/airbnb/javascript) as the basis for our style guide. The Airbnb guid is intended for React and ES6 so some adaptations will need to be made.

Endpoints
---------

| endpoint       | purpose                                                              |
| -------------- | ---------------------------------------------------------------------|
| /graphql       | Endpoint to run graphql queries                                      |
| /graphiql      | GUI like tool for composing graphql queries and exploring the schema |
| /diagram       | Dynamically built visualization from the schema                      |
| /healt         | Check to see if GraphQL is running, for k8s or load balancer         |
