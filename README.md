# README #


### What is this repository for? ###

This project demonstarte Web view of Trolley Fresh App

### How do I get set up? ###

1. Clone Repo in your workspace and cd TrolleyFreshCustomerWeb
2. Run npm install
3. execute "npm run start:dev" 

### To Run app in mobile devices ###

1. Running in devices
   a. Navigate to project in cmd/Terminal and enter "react-native run-android" to build the app in android
   b.  Navigate to project in cmd/Terminal and enter "react-native run-ios" to build the app in ios
2. Once Build Successfull hit "npm run start:packager" -- once PR #7 is merged
3. To clean the project use "npm run clear"


## Important points

1. Before Pushing take latest from develop or rebase from develop using following command:

   a. git pull
   b. git fetch && git rebase oigin/develop
   
2. use lodash library  methods whenever possible example _.isEmpty() is used to check if string empty
3. add application's constant files like content.js (common) for content related, fieldTypes.js for fieldTypes and many more
4. Reuse constants, if not present then only create new constants
5. Common functions should be added in CommonUtil.js  



## To DO

1. Added otp validation service to verifyAndRegisterUser. But unable to make it work due to async behavior of state
   