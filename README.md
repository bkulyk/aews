GraphQL
===============

Requirements +  Use Cases
-------------------------

As an asteroid detector API user I want to see NASA asteroid data transformed to the Armageddon Early Warning Network specification (see attached NASA -> AEWN mapping specification) so that I can create reports.

As an asteroid detector API user I want a list of all near earth objects for a specific week so that I can see if earth is imperiled that week

As an asteroid detector API user I want the ability to specify which asteroid feed and asteroid lookup properties to display so I can prepare reports based on specific details.

As an asteroid detector API user I would like to make a single request in order to see the 3 closest asteroid misses for a given week and display the asteroid detail properties of my choosing so that I can compile reports.

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
| /diagram       | Dynamically built visualization from the schema                      |
| /healt         | Check to see if GraphQL is running, for k8s or load balancer         |
