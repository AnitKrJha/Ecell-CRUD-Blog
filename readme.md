# Blog App

This app is a simple blog application built using the Express.js framework. It allows users to create, read, update and delete blog posts. The app uses EJS as the template engine, and the data is stored in a JSON file called `blogData`. 

## Features

- Homepage that displays a welcome message
- A page to view all blog posts
- A page to create a new blog post
- A page to view a specific blog post
- A page to update a specific blog post
- A page to delete a specific blog post
- A login page for authentication
- Middleware for authentication on create, update and delete routes

### Installation

1. Clone the repository `git clone https://github.com/Anitkrjha/ecell-crud-blog.git`
2. Install the dependencies `npm install`
3. Start the server `npm start`


## Routes

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | / | Homepage that displays a welcome message |
| GET | /blogs | A page to view all blog posts |
| GET | /blogs/create | A page to create a new blog post |
| GET | /blogs/:id | A page to view a specific blog post |
| GET | /blogs/:id/update | A page to update a specific blog post |
| GET | /blogs/:id/delete | A page to delete a specific blog post |
| GET | /login | A login page for authentication |
| POST | /blogs | Create a new blog post |
| PUT | /blogs/:id | Update a specific blog post |
| DELETE | /blogs/:id | Delete a specific blog post |
| POST | /login | Authenticate user and return a token |

## Authentication

The app uses JSON Web Token (JWT) for authentication. The login route accepts a username and password, and if they match the hardcoded values, a token is generated and returned to the client. The token should be included in the `Authorization` header of requests to the create, update, and delete routes. The middleware `authenticateToken` checks for the presence of the token and verifies it before allowing access to the protected routes.

## Built With

- [Express.js](https://expressjs.com/) - The web framework used
- [EJS](https://ejs.co/) - Template engine
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token

## Testing
You can use Postman to test the API endpoints. 
A Postman collection with sample requests and responses is available at this link:

[Postman Api](https://www.postman.com/gold-water-660875/workspace/my-apis/documentation/25227185-8ad0a3dd-7a24-44c3-be18-fa2e8c7c319f)

Be sure to include the authentication token obtained from the login route in the Authorization header of requests to the create, update, and delete routes as described in the Authentication section.


## Authors

- **Anit Jha** 


