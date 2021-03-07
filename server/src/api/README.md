# API Documentation

### INTRODUCTION
This documentation will present the routes and request/responses for our API.

## Home
### GET http://localhost:8081
#### Response
Success status: 200

{
  message: "Hello API"
}

Failed status: 404

{
  error: "Page not found" 
}

## User
### POST http://localhost:8081/user/register
#### Request
{ username, password, email }
#### Response
Success status: 200

{ username, email, is_admin, success = true }

Failed status: 400

{ error: "Content can not be empty" }

Failed status: 502

{ error: "Email already exist !" }

Failed status: 500

{ error: "Some error occured while creating the user" }

### POST http://localhost:8081/user/login
#### Request
{ email, password }
#### Response
Success status: 200

{ username, email, is_admin, accessToken, success = true }

Failed status: 400

{ error: "Content can not be empty" }

Failed status: 503

{ error: "Email or password is not correct" }

### POST http://localhost:8081/user/verifyemail
#### Request
{ registerToken }
#### Response
Success status: 200

{ success = true }

Failed status: 400

{ error: "Content can not be empty" }

Failed status: 502

{ error: "Wrong token" }

### POST http://localhost:8081/user/checklogin
#### Request
query : accessToken
#### Response
Success status: 200

{ success = true }

Failed status: 400

{ error: "Access token missing" }

Failed status: 503

{ error: "Invalid login token" }

### GET http://localhost:8081/user/getuserslist
#### Request
query : accessToken
#### Response
Success status: 200

{ data, success = true }

Failed status: 503

{ error: "Error to get data" }

### POST http://localhost:8081/user/deleteUser
#### Request
query : accessToken
{
    username
}
#### Response
Success status: 200

{ success = true }

Failed status: 400

{ error: "Username missing" }

Failed status: 503

{ error: "User not found" }

### POST http://localhost:8081/user/removeRight
#### Request
query : accessToken
{
    username
}
#### Response
Success status: 200

{ success = true }

Failed status: 400

{ error: "Username missing" }

Failed status: 503

{ error: "User not found" }

### POST http://localhost:8081/user/addRight
#### Request
query : accessToken
{
    username
}
#### Response
Success status: 200

{ success = true }

Failed status: 400

{ error: "Username missing" }

Failed status: 503

{ error: "User not found" }

### POST http://localhost:8081/user/addArea
#### Request
query : accessToken{
    actionId,
    paramsAction,
    reactionId,
    paramsReaction
}
#### Response
Success status: 201

{ success = true }

Failed status: 500

{ error: "Action or Reaction not given" }

Failed status: 502

{ error: "Wrong accessToken" }

Failed status: 504

{ error: "You must be connected to access this page" }

### GET http://localhost:8081/user/getUserData
#### Request
query : accessToken{
    username
}
#### Response
Success status: 200

{ userData, success = true }

Failed status: 502

{ error: "Wrong accessToken" }

Failed status: 504

{ error: "You must be connected to access this page" }

### GET http://localhost:8081/user/getAreas
#### Request
query : accessToken
#### Response
Success status: 200

{ data, success = true }

Failed status: 502

{ error: "Wrong accessToken" }

Failed status: 504

{ error: "You must be connected to access this page" }

### POST http://localhost:8081/user/deleteArea
#### Request
query : accessToken
#### Response
Success status: 201

{ success = true }

Failed status: 401

{ error: "You must be connected" }

Failed status: 400

{ error: "Content cannot be empty" }

Failed status: 501

{ error: "Area not found" }

## Services
### GET http://localhost:8081/service/getServices
#### Request
query : accessToken
#### Response
Success status: 200

{ services, success = true }

Failed status: 401

{ error: "You must be connected" }

Failed status: 500

{ error: "An internal error occured" }

### POST http://localhost:8081/service/getToken
#### Request
query : accessToken{
    name
}
#### Response
Success status: 200

{ token, success = true }

Failed status: 400

{ error: "Content can not be empty" }

Failed status: 401

{ error: "You must be connected" }

Failed status: 404

{ error: "Service not found" }

### GET http://localhost:8081/service/connectServices
#### Request
query : accessToken
#### Response
Success status: 200

{ names, links, success = true }

Failed status: 401

{ error: "You must be connected" }

Failed status: 404

{ error: "Service not found" }

### GET http://localhost:8081/service/getActions
#### Request
query : accessToken
#### Response
Success status: 200

{ data, success = true }

Failed status: 401

{ error: "You must be connected" }

Failed status: 404

{ error: "User not found" }

### GET http://localhost:8081/service/getReactions
#### Request
query : accessToken
#### Response
Success status: 200

{ data, success = true }

Failed status: 401

{ error: "You must be connected" }

Failed status: 404

{ error: "User not found" }

## Tokens
### POST http://localhost:8081/tokens/addToken
#### Request
query : accessToken && (code)
{
    serviceName,
    accessToken
}
#### Response
Success status: 200

{ data, success = true }

Failed status: 400

{ error: "Content can not be empty" }

Failed status: 401

{ error: "You must be connected" }

Failed status: 500

{ error: "Some error occured while saving the token" }
