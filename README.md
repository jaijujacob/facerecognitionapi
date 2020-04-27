# facerecognitionapi


heroku git:remote -a <new app name> to fix old application issue



If you are encountering an issue following the next video and you are seeing errors like...

Error: self signed certificate
or
code: 'DEPTH_ZERO_SELF_SIGNED_CERT'



This is due to a line in the code you will see in the next video where we set ssl: true

In the case that you see the error above, it may have to do with the fact that we are using the free version of Heroku. If you encounter this issue (and only if you do), you can resolve it by adding the below on line 11 in the server.js file:

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
Note that this is not secure for use in production, and to only use for local development (which isn't a big issue for us because this is a personal project app with no real users)

CREATE TABLE users (id serial PRIMARY KEY, name VARCHAR(100), email text UNIQUE NOT NULL, ENTRIES BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL);
CREATE TABLE login (id serial PRIMARY KEY, hash varchar(100) NOT NULL, email text UNIQUE NOT NULL);


Heroku Commands
---------------------------------------------------------
heroku addons
heroku pg:info
heroku info
heroku config