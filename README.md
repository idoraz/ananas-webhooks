# Ananas Webhooks Service

This is the Ananas Webhooks Service


# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Configure your mongoDB server
```bash
# create the db directory
sudo mkdir -p /data/db
# give the db correct read/write permissions
sudo chmod 777 /data/db
```
- Start your mongoDB server (you'll probably want another command prompt)
```
mongod
```
- Build and run the project
```
npm run build
npm start
```
Or, if you're using VS Code, you can use `cmd + shift + b` to run the default build task (which is mapped to `npm run build`), and then you can use the command palette (`cmd + shift + p`) and select `Tasks: Run Task` > `npm: start` to run `npm start` for you.

> **Note on editors!** - TypeScript has great support in [every editor](http://www.typescriptlang.org/index.html#download-links), but this project has been pre-configured for use with [VS Code](https://code.visualstudio.com/). 
Throughout the README I'll try to call out specific places where VS Code really shines or where this project has been setup to take advantage of specific features.

Finally, navigate to `http://localhost:3002` and you should see the template being served and rendered locally!

# Deploying the app
There are many ways to deploy an Node app, and in general, nothing about the deployment process changes because you're using TypeScript.
In this section, I'll walk you through how to deploy this app to Azure App Service using the extensions available in VS Code because I think it is the easiest and fastest way to get started, as well as the most friendly workflow from a developer's perspective.

## Pre-reqs
- [**Azure account**](https://azure.microsoft.com/en-us/free/) - If you don't have one, you can sign up for free.
The Azure free tier gives you plenty of resources to play around with including up to 10 App Service instances, which is what we will be using.
- [**VS Code**](https://code.visualstudio.com/) - We'll be using the interface provided by VS Code to quickly deploy our app.
- [**Azure App Service VS Code extension**](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) - In VS Code, search for `Azure App Service` in the extension marketplace (5th button down on the far left menu bar), install the extension, and then reload VS Code.
- **Create a cloud database** - 
For local development, running MongoDB on localhost is fine, however once we deploy we need a database with high availability.
The easiest way to achieve this is by using a managed cloud database.
There are many different providers, but the easiest one to get started with is [MongoLab](#mlab).

### <a name="mlab"></a> Create a managed MongoDB with MongoLab
1. Navigate to [MongoLab's Website](https://mlab.com/), sign up for a free account, and then log in.
2. In the **MongoDB Deployments** section, click the **Create New** button.
3. Select any provider (I recommend **Microsoft Azure** as it provides an easier path to upgrading to globally distributed instances later).
4. Select **Sandbox** to keep it free unless you know what you're doing, and hit **Continue**.
5. Select a region (I recommend the region geographically closest to your app's users).
6. Add a name, click **Continue** again, and finally **Submit Order**.
7. Once your new database is created, select it from the **MongoDB Deployments** section.
8. Create a user by selecting the **User** tab, clicking the **Add database user** button, adding a username and password, and then clicking **Create**. 
A user account is required to connect to the database, so remember these values because you will need them as part of your connection string.
9. Copy the connection string from the top of the page, it should look like this: `mongodb://<dbuser>:<dbpassword>@ds036069.mlab.com:36069/test-asdf`
and replace `<dbUser>` and `<dbpassword>` with the credentials you just created. 
Back in your project, open your `.env` file and update `MONGODB_URI` with your new connection string.
    > NOTE! - If you don't have an `.env` file yet, rename `.env.example` to `.env` and follow the comments to update the values in that file.
10. **Success!**
You can test that it works locally by updating `MONGODB_URI_LOCAL` to the same connection string you just updated in `MONGO_URI`.
After rebuilding/serving, the app should work, but users that were previously created in local testing will not exist in the new database!
Don't forget to return the `MONGO_URI_LOCAL` to your local test database (if you so desire).