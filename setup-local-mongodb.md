# Setting Up Local MongoDB

If you're having issues connecting to the remote MongoDB Atlas database, you can set up a local MongoDB instance as a fallback.

## Installation Instructions

### Windows

1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. Choose "Complete" installation
4. Install MongoDB as a service (recommended)
5. Install MongoDB Compass (the GUI for MongoDB)

### Start MongoDB Service

If MongoDB is not running as a service, you can start it manually:

1. Open Command Prompt as Administrator
2. Navigate to MongoDB bin directory (usually `C:\Program Files\MongoDB\Server\<version>\bin`)
3. Run: `mongod --dbpath="C:\data\db"`

### Create the Database

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Click "Create Database"
4. Enter "erms_db" as the database name
5. Enter "users" as the collection name
6. Click "Create Database"

## Using Local MongoDB

The application is configured to automatically test both remote and local connections and use whichever one works. You can also manually set which one to use:

1. Open the `.env` file in the server directory
2. Set `USE_LOCAL_DB=true` to use local MongoDB
3. Set `USE_LOCAL_DB=false` to use remote MongoDB Atlas

## Troubleshooting

If you're still having issues:

1. Make sure MongoDB service is running
2. Check if port 27017 is not being used by another application
3. Try restarting your computer
4. Check Windows Services to ensure MongoDB service is started

## Creating Initial Data

You can use MongoDB Compass to create initial data:

1. Connect to `mongodb://localhost:27017`
2. Select the "erms_db" database
3. Create the following collections:
   - users
   - employees
   - departments
   - attendance
   - performance
   - teams

4. Add a sample department:
   ```json
   {
     "name": "Engineering",
     "description": "Software Engineering Department"
   }
   ```

5. Add a sample admin user:
   ```json
   {
     "name": "Admin User",
     "email": "admin@example.com",
     "password": "$2a$10$X/4xyJz3MbfyRH5/WN/pB.j9BXpkH3AgS7g5hJDyE8aIw1fHKEUei",
     "role": "admin"
   }
   ```
   (The password is "password123" hashed with bcrypt)
