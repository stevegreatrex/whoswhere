# WhosWhere

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