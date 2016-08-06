# Todo App

## Tutorials
1. https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
2. Udemy NodeJS course

## Requirements
1. A user can add, edit, and delete 'todos'
2. Each todo can be marked as complete
3. Each todo can have an optional file attachment
4. One person cannot access the todos of another

## Project Start
npm init

## Development Dependencies
npm install express --save-dev
npm install ejs --save-dev
npm install body-parser --save-dev
npm install mongoose --save-dev

## Global Dependencies (for dev)
1. nodemon


## Database
1. Use Mongo Lab to create a database (https://mlab.com/)

udemy-todo-app

user: max
pw: test

## Config
Define a config to provide things such as the database connection string (see index.js). 
Config.json provides settings such as database login credentials (not safe for production obviously).

## Model
Setup models by defining a schema for what data you want collected. Use mongoose Schema object constructor.

Create the model using mongoose.model and passing a model name and a Schema

Export the model using module.exports

## Controllers
1. setupController is used for providing seed data
2. apiController is used for setting up CRUD api

## Testing out the API (Postman)
Instead of creating a front-end to test the API, Postman (https://www.getpostman.com/) is a Google Chrome 
app that allows you to perform http request. This is useful for testing out you api.


## Front end requirements
1. Assign Angular module and controller
2. Initialize the page by getting all todos
3. Loop over the todos
4. Have a form to create todos
5. Delete todos when they are checked

## Process

1. 


## Work on next

1. Add handling so the forms don't except blank or empty.
2. Study mongoose query syntax more to make sure i understand





