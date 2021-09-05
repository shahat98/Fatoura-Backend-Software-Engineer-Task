# Fatoura-Backend-Software-Engineer-Task
## User authentication and authorization service:
* service is responsible for authenticate and login users.
* service is responsible for validating whether logged user is permitted to do specific action or not.
* service is resbonsible for loggin users out from the system

## Technologies:

* NodeJS
* Express
* MongoDB
* NPM

## Run Service:
* open the terminal and cd to directory you want to save project and clone the project to it then run.
```
npm install
npm start
```
* the DB hosted in MongoDB atlas host so the project will connect to it directly.
* Important Note : 
  * Some internet provider can not get access to Atlas host so if that happen try another one.
  * admin user credentails attached in task solution mail.


### API endpoints:

### /signup
Path | Method | Parameters | Description
---|---|---|---
api/users/signup| POST | { name, email, password, passwordConfirm } | take user data and validate it then create new user in DB and respond with the JWT.

### /login
Path | Method | Parameters | Description
---|---|---|---
api/users/login | POST | { email , password } | take user email & password and check it if valid then response with JWT.

### /logout
Path | Method | Parameters | Description
---|---|---|---
api/users/logout | GET | NO Parameters  | resposible for clear user token from its cookie to be not authoraized anymore.

### /getAllUsers
Path | Method | Parameters | Description
---|---|---|---
api/users | GET | NO Parameters | this a restricted route for admins only for listing all users

### /updateole
Path | Method | Parameters | Description
---|---|---|---
api/users/updaterole | PATCH | { user_id , role } | this a restricted route for admins only for assign roles so it take id and find the user then update his role.

### API Diagrams
* Signup :
  ![notification](https://github.com/shahat98/Fatoura-Backend-Software-Engineer-Task/blob/main/attachments/signup-.png)
* Login :
  ![notification](https://github.com/shahat98/Fatoura-Backend-Software-Engineer-Task/blob/main/attachments/login.png)
* ProtectedRoute :
  ![notification](https://github.com/shahat98/Fatoura-Backend-Software-Engineer-Task/blob/main/attachments/protectedRoute.png)
* RestrictedRoute|Action :
  ![notification](https://github.com/shahat98/Fatoura-Backend-Software-Engineer-Task/blob/main/attachments/restricted.png)
  

### If i have additional time, I will add :
* Password reset.
* Update user data.

### Things i learned during the course  of this task :
* I restart to learn Node.js and this task was a good practice for the begining.

