# axa-backend

assessment Node.js for AXA made with Express , used Mongo Atlas for online DataBase.

Used Express-Generator for easy-fast initial config.

Clients Fake Data provided by: http://www.mocky.io/v2/5808862710000087232b75ac

Policies Fake Data provided by: http://www.mocky.io/v2/580891a4100000e8242b75c5

This fake data is used to seed an online DataBase to test.

Don't need to seed the DataBase, it's already done. If the DataBase is empty, please run -> npm run seeds <- to seed the DataBase.

dotenv to use environment variables, Should be in .gitignore, but in this case I created a test user to play with MongoAtlas.

-JWT (jsonwebtoken) implemented for Authentication.
-express: framework
-mongoose: MongoDB and mongoose to manage storage data
-nodemon: for monitoring the nodejs project

This API is hosted on HEROKU to test,

The link -> https://axa-backend-test.herokuapp.com/

To be able to check the routes you need to Login, to obtain the token (valid 1h).

I used POSTMAN to check the routes, if you are familiar with otrer app, you are welcome aswell.

## Routes

LOGIN: (Make a POST request with a valid email in the Body).

POST
https://axa-backend-test.herokuapp.com/api/login

You need to send a valid email to log in the API, you can take a valid email from the fake data provided.
Send in the Body a valid email (for example:):
{
"email":"britneyblankenship@quotezart.com"
}

If the login it's ok, The Response will be a token that you have to send to the GET request, to fetch the data.

An easy way to not to copy the token on each new login. You can set up an environment in POSTMAN an set a variable to reuse the token over and over in future requests.
Once you have created an environment, Under the tab Tests, save the acces token:

const response = pm.response.json();

pm.environment.set("jwt_token"), response.token);

and SAVE. And re-run the login request.

To verify it's correct, you can check under the Quick Look icon, our jwt_token, with it's value.

To send the token on the Header, on your GET request, go to the tab Headers and add

KEY -> Authorization
VALUE -> Bearer {{jwt_token}}

FETCH CLIENT DATA by ID or NAME: (Make a GET request with params ..../id/numberID or ..../name/clientName and the id number or Client Name)

Get the user data filtered by user id: Accessed by users with role "users" and "admin"
url + /api/clients/ id / (id Number)

Get the user data filtered by user name: Accessed by users with role "users" and "admin"
url + /api/clients/ name / (ClientName)

ID EXAMPLE:
GET
https://axa-backend-test.herokuapp.com/api/clients/id/a0ece5db-cd14-4f21-812f-966633e7be86

NAME EXAMPLE:
GET
https://axa-backend-test.herokuapp.com/api/clients/name/Britney

Get the list of policies linked to a user name: Accessed by users with role "admin"

url + /api/policies/client/ (ClientName)

EXAMPLE:
GET
https://axa-backend-test.herokuapp.com/api/policies/clients/Britney

Get the user linked to a policy number: Accessed by users with role "admin"

url + /api/policies/ (policyID)

EXAMPLE:
GET
https://axa-backend-test.herokuapp.com/api/policies/3a774f4e-0e70-488f-ac9f-ee211c8d5ece

In the case you want to run locally on your machine, Download or clone the repo,
run npm install
run npm start

and change the url for your localhost server: http://localhost:3000 instead https://axa-backend-test.herokuapp.com
