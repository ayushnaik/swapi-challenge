# SWAPI Caching Engine and REST API

This project is dedicated to creating a caching engine and RESTful API for SWAPI (Star Wars API) with a focus on aiding high school students in their research of the Star Wars universe.

## Features

- **Caching Engine**: Implements a mechanism to cache SWAPI data locally, optimizing response time by reducing redundant requests.
- **Modular Design**: Utilizes a modular architecture for enhanced maintainability and scalability.
- **Swagger API Documentation**: Integrated Swagger for interactive API documentation and endpoint testing.
- **Rate Limiting**: Includes rate-limiting functionality to ensure fair usage and mitigate abuse.
- **CRUD Operations**: Provides CRUD APIs for managing various SWAPI modules (films, people, species, etc.).
- **Pagination, Ordering, and Searching**: Supports pagination, ordering, and searching functionalities for CRUD operations.

## Installation

### Prerequisites

- Node.js (version >= 14.0.0)
  - Install Node.js from [Node.js website](https://nodejs.org/)
- MongoDB (version >= 4.0)
  - Install MongoDB from [MongoDB website](https://www.mongodb.com/)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ayushnaik/swapi-challenge.git

   cd swapi-challenge
   npm i
   npm run start:dev


## API Endpoints

### CRUD Operations

#### Films

- `GET /film/getAllFilms`: Retrieve all films.
- `GET /film/getFilmById/:filmId`: Retrieve a specific film by ID.
- `POST /film/create`: Create a new film.
- `PUT /film/update/:filmId`: Update a film by ID.
- `DELETE /film/delete/:filmId`: Delete a film by ID.

#### People, Species, etc. (Similar CRUD endpoints for other modules)

- `GET /people/getAllPeople`: Retrieve all people.
- `GET /People/getPeopleById/:peopleId`: Retrieve a specific people by ID.
- `POST /people/create`: Create a new people.
- `PUT /people/update/:peopleId`: Update a people by ID.
- `DELETE /people/delete/:peopleId`: Delete a people by ID.

### Pagination, Ordering, and Searching

- **Pagination**: Use `PageNumber` and `PageSize` query parameters (`GET /getAllFilms?PageNumber=1&PageSize=10`).
- **Ordering**: Use `OrderBy` and `Ordering` query parameter (`GET /getAllFilms?OrderBy=title&Ordering=ASC`).
- **Searching**: Use `SearchString` query parameter (`GET /getAllFilms?SearchString=keyword`).

### Swagger API Documentation

Access the API documentation and test the endpoints interactively at `http://localhost:4000/api-docs`.

## Rate Limiting

The API imposes rate limits to ensure fair usage and prevent abuse. Current rate limit: 200 requests per hour.

## Deployment

The application is deployed on [Render](https://render.com/). Visit the live API [here](https://swapi-challenge.onrender.com).

## Testing

To run tests, use:

   ```bash
   npm test
