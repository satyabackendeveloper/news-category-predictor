# News Category Predictor Backend
## Overview 

This project is used to predict the category of the news by analyzing the content in the news

# Run Project Locally
1. Clone the project to a folder 
``` git clone https://github.com/satyabackendeveloper/news-category-predictor.git ```
2. Copy .env.example content to .env file which we have to create in root folder of the project
3. Add your original environment variables to .env file
4. Run ``` npm install ``` to download the dependencies
5. Run ``` npm run migrate ``` to run the migration
6. Run ``` npm run dev ``` to start the server

# Deploy To Server
This project has CI/CD enabled. So to deploy the project to remote server we have to commit all our changes and push it to master branch and the action trigger will deploy the application

# Creating migrations
1. Create a migration using the following CLI command
``` npx sequelize-cli migration:generate --name <migration-name> ```
2. Run ``` npm run migrate ``` to run the migration
3. Run ``` npx sequelize-cli db:migrate:undo ``` to remove the migration

# API Documentation
You can find all the apis in the documentation link given below
``` https://documenter.getpostman.com/view/6429549/2s93sjTThC ```


