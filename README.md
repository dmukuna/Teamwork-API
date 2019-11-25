[![Build Status](https://travis-ci.org/dmukuna/Teamwork-API.svg?branch=develop)](https://travis-ci.org/dmukuna/Teamwork-API)
[![Coverage Status](https://coveralls.io/repos/github/dmukuna/Teamwork-API/badge.svg)](https://coveralls.io/github/dmukuna/Teamwork-API)
# Teamwork-API

Teamwork-API is a node express RESTful API that does the following:
- Admin can create an employee user account.
- Admin/Employees can sign in.
- Employees can post gifs.
- Employees can write and post articles.
- Employees can edit their articles.
- Employees can delete their articles.
- Employees can delete their gifs post.
- Employees can comment on other colleagues' article post.
- Employees can comment on other colleagues' gif post.
- Employees can view all articles and gifs, showing the most recently posted articles or gifs first.
- Employees can view a specific article.
- Employees can view a specific gif post.

## Prerequisites

-  Node.js

## Getting Started

1) Clone the repository by running: `https://github.com/dmukuna/Teamwork-API.git`

2) Ensure you've installed the latest python 2.** in your environment path.

3) Navigate into the cloned directory and run: `npm install`

4) Build the application by running: `npm run build`

5) Start the application by running: `npm run start`

## Running tests

To run tests, run: `npm  run coverage`

## Running it on machine
- Create a .env in the application's root folder
- Define the following environment variables in the .env file: 

  ##### Define production database connnection URI

    * DATABASE_URL

  #### Define development database properties

    * DB_USER
    * DB_PASSWORD
    * DB_HOST
    * DB_PORT
    * DB_DATABASE

  ##### Define testing database properties

    * DB_USER_TEST
    * DB_PASSWORD_TEST
    * DB_HOST_TEST
    * DB_PORT_TEST
    * DB_DATABASE_TEST

  #### Define JWT encryption key

    * SECRET

  #### Define cloudinary service to facilitate file uploads

    * CLOUDINARY_CLOUD_NAME

    * CLOUDINARY_API_KEY

    * CLOUDINARY_API_SECRET

## Deployment:

The application has been hosted on heroku. Below, is the link to the application

[Teamwork-API](https://teamwork-api2.herokuapp.com/)

  Admin login details: 

    email: daniel@mukuna.com
    password: DANIEL12345

## Endpoints

| Endpoint                                   | FUNCTIONALITY                         |
| ----------------------------------------   |:-------------------------------------:|
| POST /api/v1/auth/create-user              | Create new user                       |
| POST  /api/v1/auth/signin                  | Login user                            |
| POST  /api/v1/articles                     | Post an article                       |
| GET  /api/v1/articles                      | Fetch all articles                    |
| GET  /api/v1/articles/:articleId           | Fetch one article                     |
| PATCH  /api/v1/articles/:articleId         | Update a specified article            |
| DELETE  /api/v1/articles/:articleId        | Delete a specified article            |
| POST  /api/v1/gifs                         | Post a gif image post                 |
| GET  /api/v1/gifs                          | Fetch all gif image posts             |
| GET  /api/v1/gifs/gifId                    | Fetch specified gif image post        |
| DELETE  /api/v1/gifs/gifId                 | Delete specified gif image post       |
| POST  /api/v1/gifs/gifId/comments          | Post a gif image post comment         |
| POST  /api/v1/articles/:articleId/comments | Post an article comment               |
| GET  /api/v1/feed                          | Fetch all posts                       |

- Detailed API documentation: 

  [Teamwork-API endpoints documentation](https://documenter.getpostman.com/view/4671192/SW7dUm1E)

## Built With
* [express](https://expressjs.com/) -  The web framework used
* [npm](https://www.npmjs.com/) -  Dependency Management