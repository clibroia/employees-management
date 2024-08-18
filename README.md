# Employees Management

A basic web app performing CRUD operations on an employees and departments database.

## Description

This basic web app belongs to my portfolio. It consists of a:

- web server, implemented with Node.js and the Express framework
- database, implemented with MongoDB
- database schema, implemented with Mongoose
- authorization and authentication methods, implemented with JWT
- user interface, implemented in plain HTML, CSS and JS
- client-server communication, implemented via REST APIs
- containerization, implemented with Docker

All the tests were written using the Mocha testing framework

## Libraries

### Back-end

- express-validator, to validate and sanitize input data
- jsonwebtoken, to implement an authentication mechanism with JWT
- mongodb, for connecting to MongoDB
- mongoose, to define a collection's schema

### Utilities

- bcrypt, for hashing plaintext passwords
- cors, for Cross-Origin Resource Sharing
- dotenv, to access environment variables defined in .env
- winston, for logging purposes
- winston-mongodb, to log to a MongoDB collection

### Testing

- chai, employed to write tests using the TDD assertion style
- mongodb-memory-server, to run an in-memory MongoDB server for testing purposes
- sinon, for spies, stubs and mocks in unit testing

### Linting and Formatting Code

- eslint
- prettier

## CI

- workflow running ESlint on GitHub whenever a modified or newly created JavaScript file is pushed to the main repository
