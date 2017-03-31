# TODO APP REACT.JS

Todo app containing the following:

1. A simple express server prepared to be hosted on Heroku, run it with the following: node server.js
2. Webpack configured to bundle .jsx files with ES6 features using Babel, bundle everything with: webpack
3. React Router.
4. Styles using Zurb Foundation and custom Sass files.
5. jQuery included.
6. Project file structure with a sample react app (hello world style) bundled with its node_modules to work as is
7. Firebase storage.
8. Github Login and sessions
9. Test suite done with Karma and Mocha. 
10. Configuration ready to deploy on Heroku.


To run the app:

1. Install the necessary npm moduler (Create node_modules folder):

  *npm install*

2. Bundle everything with webpack:

  *webpack*

3. Run the express server:

  *node server.js*
  
4. Set up a Firebase test and production database, enable Github app login, store the corresponding clientID, clientSecret and credentials inside the proper config. Next, configure the following access rules in the production Database:
```
{
  "rules": {
    ".read": "auth !== null",
    ".write": "auth !== null",
    "users" : {
      "$user_id": {
          ".read": "$user_id === auth.uid",
          ".write": "$user_id === auth.uid"
      } 
    }
  }
}
```

4. Go to http://localhost:3000/ and enjoy!

