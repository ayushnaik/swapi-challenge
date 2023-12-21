import swaggerJsdoc from 'swagger-jsdoc';
const Package = require('../../package.json')

const options = {
    failOnErrors: true,
    /* This is the information that is going to be displayed on the swagger page. */
    definition: {
        openapi: '3.0.0',
        info: {
            title: "SWAPI Challenge API's",
            version: Package.version,
            description: Package.description,
            contact: {
                name: Package.author,
            },
        },
        host: process.env.NODE_ENV === 'production' ? 'https://swapi-challenge.onrender.com' : 'http://localhost:4000',
        schemes: ["http"],
        basePath: '/api-docs',
        tags: [{
            name: "People",
            description: "API's regarding person's operations.",
        }, {
            name: "Film",
            description: "API's regarding film operations.",
        }],
        components: {
            schemas: {
                PageSize: {
                    type: "number",
                    minimum: 10,
                    default: 20,
                    description: "Number of items in a Page.",
                },
                PageNumber: {
                    type: "number",
                    minimum: 1,
                    default: 1,
                    description: "Page Number for Entries.",
                },
                SearchString: {
                    type: "string",
                    description: "String to search items in Entries.",
                },
                Ordering: {
                    type: "string",
                    enum: ["ASC", "DESC"],
                    description: "Ordering Fields by Ascending or Descending Order.",
                },
                People: {
                    type: "object",
                    properties: {
                        "birth_year": {
                            "type": "string"
                        },
                        "eye_color": {
                            "type": "string"
                        },
                        "films": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "gender": {
                            "type": "string"
                        },
                        "hair_color": {
                            "type": "string"
                        },
                        "height": {
                            "type": "string"
                        },
                        "homeworld": {
                            "type": "string"
                        },
                        "mass": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "skin_color": {
                            "type": "string"
                        },
                        "species": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "starships": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "url": {
                            "type": "string"
                        },
                        "vehicles": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    required: ['url']
                },
                Film: {
                    type: "object",
                    properties: {
                        "characters": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "director": {
                            "type": "string"
                        },
                        "episode_id": {
                            "type": "number"
                        },
                        "opening_crawl": {
                            "type": "string"
                        },
                        "planets": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "producer": {
                            "type": "string"
                        },
                        "release_date": {
                            "type": "string"
                        },
                        "species": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "starships": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "title": {
                            "type": "string"
                        },
                        "url": {
                            "type": "string"
                        },
                        "vehicles": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    required: ['url']
                },
                Starship: {
                    type: "object",
                    properties: {
                        "MGLT": {
                            "type": "string"
                        },
                        "cargo_capacity": {
                            "type": "string"
                        },
                        "consumables": {
                            "type": "string"
                        },
                        "cost_in_credits": {
                            "type": "string"
                        },
                        "crew": {
                            "type": "string"
                        },
                        "hyperdrive_rating": {
                            "type": "string"
                        },
                        "length": {
                            "type": "string"
                        },
                        "manufacturer": {
                            "type": "string"
                        },
                        "max_atmosphering_speed": {
                            "type": "string"
                        },
                        "model": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "passengers": {
                            "type": "string"
                        },
                        "films": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "pilots": {
                            "type": "array",
                            "items": {}
                        },
                        "starship_class": {
                            "type": "string"
                        },
                        "url": {
                            "type": "string"
                        }
                    },
                    required: ['url']
                },
                Vehicle: {
                    type: "object",
                    properties: {
                        "cargo_capacity": {
                            "type": "string"
                        },
                        "consumables": {
                            "type": "string"
                        },
                        "cost_in_credits": {
                            "type": "string"
                        },
                        "crew": {
                            "type": "string"
                        },
                        "length": {
                            "type": "string"
                        },
                        "manufacturer": {
                            "type": "string"
                        },
                        "max_atmosphering_speed": {
                            "type": "string"
                        },
                        "model": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "passengers": {
                            "type": "string"
                        },
                        "pilots": {
                            "type": "array",
                            "items": {}
                        },
                        "films": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "url": {
                            "type": "string"
                        },
                        "vehicle_class": {
                            "type": "string"
                        }
                    },
                    required: ['url']
                },
                Species: {
                    type: "object",
                    properties: {
                        "average_height": {
                            "type": "string"
                        },
                        "average_lifespan": {
                            "type": "string"
                        },
                        "classification": {
                            "type": "string"
                        },
                        "designation": {
                            "type": "string"
                        },
                        "eye_colors": {
                            "type": "string"
                        },
                        "hair_colors": {
                            "type": "string"
                        },
                        "homeworld": {
                            "type": "string"
                        },
                        "language": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "people": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "films": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "skin_colors": {
                            "type": "string"
                        },
                        "url": {
                            "type": "string"
                        }
                    },
                    required: ['url']
                },
                Planet: {
                    type: "object",
                    properties: {
                        "climate": {
                            "type": "string"
                        },
                        "diameter": {
                            "type": "string"
                        },
                        "films": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "gravity": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "orbital_period": {
                            "type": "string"
                        },
                        "population": {
                            "type": "string"
                        },
                        "residents": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "rotation_period": {
                            "type": "string"
                        },
                        "surface_water": {
                            "type": "string"
                        },
                        "terrain": {
                            "type": "string"
                        },
                        "url": {
                            "type": "string"
                        }
                    },
                    required: ['url']
                }
            }
        },
        servers: [process.env.NODE_ENV === 'production' ? {
            url: 'https://swapi-challenge.onrender.com/api',
            description: 'Production Server.',
        } : {
            url: 'http://localhost:4000/api',
            description: 'Development Server.',
        }],
    },
    /* Looking for all the files in the routes folder and then it is going to parse them. */
    apis: ['./src/routes/*.{ts,js}'],
};

/* Parsing the files in the routes folder and then it is going to create the swagger documentation. */
const swaggerDocument = swaggerJsdoc(options);

export default swaggerDocument;