GraphQL
=======

Introduction
------------

It happens... one day your species is the top of the food chain, the envy of the ecosystem, an apex predator dictating the pace of life in your corner of the world. But then one day a seemingly random space rock slams into your home planet. Such an event can lead to a mass extinction.  It can really ruin your day.  Luckily, our species (unlike the dinosaurs) has evolved a big brain.  The kind of brain capable of producing an aerospace program.

Using an API provided by NASA, we can monitor and model our asteroid belt and we can even predict a collision that could potentially end civilization as we know it.

Sample GraphQL Queries
----------------------

Get an asteroid by id.

```graphql
query myFav{
  getAsteroid(id: 3720000) {
    name
  }
}
```

Get closest asteroids with orbit details

```graphql
query theClosestWithDetails {
  getClosestAsteroids {
    id
    name
    miss_distance
    miss_date
    is_dangerous
    asteroid_details {
      id
      asteroid_orbit_id
      determination_date
      first_observation
      last_observation
      data_arc_days
      observations
      weirdness
      major_axis_semi
      class {
        type
        range
        description
      }
    }
  }
}

Get Nearby asteroids for the week

```graphql
query asteroidFeed {
  getNearbyAsteroids {
    id
    name
    miss_distance
    miss_date
    is_dangerous
  }
}
```

Setup
-----

run `npm install` to install dependencies.

run `npm start` to start the server (starts on prt 4000).

Style Guide
-----------

Please use the [Airbnb Style Guide](https://github.com/airbnb/javascript) as the basis for our style guide. The Airbnb guid is intended for React and ES6 so some adaptations will need to be made.

Endpoints
---------

**Note** server starts on port 4000 by default.

| endpoint       | purpose                                                              |
| -------------- | ---------------------------------------------------------------------|
| /graphql       | Endpoint to run graphql queries                                      |
| /graphiql      | GUI like tool for composing graphql queries and exploring the schema |
| /diagram       | Dynamically built visualization of the schema                        |
| /health        | Check to see if GraphQL is running, for k8s or load balancer         |
