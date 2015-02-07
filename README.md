# WhosWhere
A test project using a bunch of new technologies that mimics an approach to tracking employee absences within a large company.

## Libraries Used
 * Node
 * Express
 * PostgreSQL
 * Angular
 * Twitter Bootstrap (+ directives for angular)
 * MomentJS
 * Chart.js

## Database
I have used postgresql as the database for this application; you will need to update the config.js file in the root to supply a valid connection string.

The database should contain 4 tables based on the CSV files included with the activity description:

 1. users
 2. absences
 3. absence_types
 4. work_streams

See create_db.sql for details of structure.

### Populating Data
Run create_db.sql to create and populate the database.

## Unit Tests
Due to my lack of familiarity with Angular unit testing I have not attempted to tackle these within the scope of this project.

## Devices
The site is designed in a responsive way based on bootstrap and should look good on everything from a phone to a desktop.

## Build and Deployment
The site is deployed to openshift at http://whoswhere-stevegreatrex.rhcloud.com/

The deployment process is automated using Jenkins to pull changes from the openshift git repository.
