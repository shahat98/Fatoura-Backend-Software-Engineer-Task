# Fatoura-Backend-Software-Engineer-Task

## Backend technologies:

* NodeJS
* Express
* MongoDB
* NPM

### API endpoints:

### /signup
Path | Method | Parameters | Description
api/users/signup| POST | { name,email,password,passwordConfirm } | take user data and validate it then create new user in DB and respond with the JWT.

### /login
Path | Method | Parameters | Description
api/users/login | POST | { email,password } | take user email & password and check it if valid then response with JWT.

### /logout
Path | Method | Parameters | Description
api/users/logout | GET | NO Parameters  | resposible for clear user token from its cookie to be not authoraized anymore.

### /getAllUsers
Path | Method | Parameters | Description
api/users | GET | NO Parameters | this a restricted route for admins only for listing all users

### /updateole
Path | Method | Parameters | Description
api/users/updaterole | PATCH | { user_id,role } | this a restricted route for admins only for assign roles so it take id and find the user then update his role.

### API Diagrams


