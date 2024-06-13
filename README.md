API Documentation
User Endpoints
Create User (Signup)
Endpoint: POST /users/signup

Description: Creates a new user.

Request Body:

json
Copy code
{
    "name": "John Doe",
    "mobile": "1234567890",
    "email": "john@example.com",
    "password": "password123"
}
Response:

json
Copy code
{
    "userId": 1,
    "name": "John Doe",
    "mobile": "1234567890",
    "email": "john@example.com",
    "password": "$2a$10$...."
}
Example Usage:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe","mobile":"1234567890","email":"john@example.com","password":"password123"}' http://localhost:3000/users/signup
User Login
Endpoint: POST /users/login

Description: Logs in a user.

Request Body:

json
Copy code
{
    "email": "john@example.com",
    "password": "password123"
}
Response:

json
Copy code
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Example Usage:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}' http://localhost:3000/users/login
Update User
Endpoint: PUT /users/:id

Description: Updates user details.

Request Params:

id: The ID of the user to update.
Request Body:

json
Copy code
{
    "name": "John Smith",
    "mobile": "0987654321",
    "email": "john.smith@example.com"
}
Response:

json
Copy code
{
    "user": [1]
}
Example Usage:

bash
Copy code
curl -X PUT -H "Content-Type: application/json" -d '{"name":"John Smith","mobile":"0987654321","email":"john.smith@example.com"}' http://localhost:3000/users/1
Delete User
Endpoint: DELETE /users/:id

Description: Deletes a user.

Request Params:

id: The ID of the user to delete.
Response:

json
Copy code
{
    "message": "User deleted"
}
Example Usage:

bash
Copy code
curl -X DELETE http://localhost:3000/users/1
Show List of Users
Endpoint: GET /users

Description: Retrieves a list of all users.

Response:

json
Copy code
[
    {
        "userId": 1,
        "name": "John Doe",
        "mobile": "1234567890",
        "email": "john@example.com"
    },
    ...
]
Example Usage:

bash
Copy code
curl -X GET http://localhost:3000/users
Search User by Name
Endpoint: GET /users/search

Description: Searches for users by name.

Request Query:

name: The name to search for.
Response:

json
Copy code
[
    {
        "userId": 1,
        "name": "John Doe",
        "mobile": "1234567890",
        "email": "john@example.com"
    },
    ...
]
Example Usage:

bash
Copy code
curl -X GET 'http://localhost:3000/users/search?name=John'
Follow Another User
Endpoint: POST /users/follow

Description: Follows another user.

Request Body:

json
Copy code
{
    "userId": 1,
    "userIdToFollow": 2
}
Response:

json
Copy code
{
    "followId": 1,
    "followerId": 1,
    "followeeId": 2
}
Example Usage:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"userId":1,"userIdToFollow":2}' http://localhost:3000/users/follow
Discussion Endpoints
Create Discussion
Endpoint: POST /discussions

Description: Creates a new discussion.

Request Body:

json
Copy code
{
    "userId": 1,
    "text": "This is a new discussion",
    "image": "image_url",
    "hashtags": ["tech", "nodejs"]
}
Response:

json
Copy code
{
    "discussionId": 1,
    "userId": 1,
    "text": "This is a new discussion",
    "image": "image_url",
    "createdOn": "2024-06-13T12:00:00.000Z"
}
Example Usage:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"userId":1,"text":"This is a new discussion","image":"image_url","hashtags":["tech","nodejs"]}' http://localhost:3000/discussions
Update Discussion
Endpoint: PUT /discussions/:discussionId

Description: Updates a discussion.

Request Params:

discussionId: The ID of the discussion to update.
Request Body:

json
Copy code
{
    "text": "Updated discussion text",
    "image": "new_image_url",
    "hashtags": ["updatedTag"]
}
Response:

json
Copy code
{
    "discussionId": 1,
    "userId": 1,
    "text": "Updated discussion text",
    "image": "new_image_url",
    "createdOn": "2024-06-13T12:00:00.000Z"
}
Example Usage:

bash
Copy code
curl -X PUT -H "Content-Type: application/json" -d '{"text":"Updated discussion text","image":"new_image_url","hashtags":["updatedTag"]}' http://localhost:3000/discussions/1
Delete Discussion
Endpoint: DELETE /discussions/:discussionId

Description: Deletes a discussion.

Request Params:

discussionId: The ID of the discussion to delete.
Response:

json
Copy code
{
    "message": "Discussion deleted"
}
Example Usage:

bash
Copy code
curl -X DELETE http://localhost:3000/discussions/1
Get Discussions by Tags
Endpoint: GET /discussions/tags

Description: Retrieves discussions associated with specified tags.

Request Body:

json
Copy code
{
    "tags": ["tech", "nodejs"]
}
Response:

json
Copy code
[
    {
        "discussionId": 1,
        "userId": 1,
        "text": "This is a discussion about tech and nodejs",
        "image": "image_url",
        "createdOn": "2024-06-13T12:00:00.000Z"
    },
    ...
]
Example Usage:

bash
Copy code
curl -X GET -H "Content-Type: application/json" -d '{"tags":["tech","nodejs"]}' http://localhost:3000/discussions/tags
Get Discussions by Text
Endpoint: GET /discussions/search

Description: Retrieves discussions containing specified text.

Request Query:

text: The text to search for.
Response:

json
Copy code
[
    {
        "discussionId": 1,
        "userId": 1,
        "text": "This is a discussion containing the search text",
        "image": "image_url",
        "createdOn": "2024-06-13T12:00:00.000Z"
    },
    ...
]
Example Usage:

bash
Copy code
curl -X GET 'http://localhost:3000/discussions/search?text=search text'
Comment on Discussion
Endpoint: POST /discussions/comment/:discussionId

Description: Adds a comment to a discussion.

Request Params:

discussionId: The ID of the discussion to comment on.
Request Body:

json
Copy code
{
    "userId": 1,
    "text": "This is a comment"
}
Response:

json
Copy code
{
    "commentId": 1,
    "discussionId": 1,
    "userId": 1,
    "text": "This is a comment",
    "createdOn": "2024-06-13T12:00:00.000Z"
}
Example Usage:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"userId":1,"text":"This is a comment"}' http://localhost:3000/discussions/comment/1
Like a Discussion
Endpoint: POST /discussions/like/:discussionId

Description: Adds a like to a discussion.

Request Params:

discussionId: The ID of the discussion to like.
Request Body:

json
Copy code
{
    "userId": 1
}
Response:

json
Copy code
{
    "likeId": 1,
    "discussionId": 1,
    "userId": 1
}
Example Usage:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"userId":1}' http://localhost:3000/discussions/like/1
Like a Comment
Endpoint: POST /discussions/like/comment/:commentId

Description: Adds a like to a comment.

Request Params:

commentId: The ID of the comment to like.
Request Body:

json
Copy code
{
    "userId": 1
}
Response:

json
Copy code
{
    "likeId": 1,
    "commentId": 1,
    "userId": 1
}
Example Usage:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"userId":1}' http://localhost:3000/discussions/like/comment/1
Reply to a Comment
Endpoint: POST /discussions/reply/comment/:commentId

Description: Adds a reply to a comment.

Request Params:

commentId: The ID of the comment to reply to.
Request Body:

json
Copy code
{
    "userId": 1,
    "text": "This is a reply"
}
Response:

json
Copy code
{
    "commentId": 2,
    "parentId": 1,
    "userId": 1,
    "text": "This is a reply",
    "createdOn": "2024-06-13T12:00:00.000Z"
}
Example Usage:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"userId":1,"text":"This is a reply"}' http://localhost:3000/discussions/reply/comment/1
Delete a Comment
Endpoint: DELETE /discussions/comment/:commentId

Description: Deletes a comment.

Request Params:

commentId: The ID of the comment to delete.
Response:

json
Copy code
{
    "message": "Comment deleted"
}
Example Usage:

bash
Copy code
curl -X DELETE http://localhost:3000/discussions/comment/1
Update a Comment
Endpoint: PUT /discussions/comment/:commentId

Description: Updates a comment.

Request Params:

commentId: The ID of the comment to update.
Request Body:

json
Copy code
{
    "text": "Updated comment text"
}
Response:

json
Copy code
{
    "commentId": 1,
    "discussionId": 1,
    "userId": 1,
    "text": "Updated comment text",
    "createdOn": "2024-06-13T12:00:00.000Z"
}
Example Usage:

bash
Copy code
curl -X PUT -H "Content-Type: application/json" -d '{"text":"Updated comment text"}' http://localhost:3000/discussions/comment/1
Get Like Count for a Discussion
Endpoint: GET /discussions/likeCount/:discussionId

Description: Retrieves the total number of likes for a discussion.

Request Params:

discussionId: The ID of the discussion.
Response:

json
Copy code
{
    "totalLikes": 5
}
Example Usage:

bash
Copy code
curl -X GET http://localhost:3000/discussions/likeCount/1
Get Discussions by Hashtag
Endpoint: GET /discussions/gethashtages/:hashtag

Description: Retrieves discussions associated with a specific hashtag.

Request Params:

hashtag: The hashtag to search for.
Response:

json
Copy code
[
    {
        "discussionId": 1,
        "userId": 1,
        "text": "This is a discussion about a specific hashtag",
        "image": "image_url",
        "createdOn": "2024-06-13T12:00:00.000Z"
    },
    ...
]
Example Usage:

bash
Copy code
curl -X GET http://localhost:3000/discussions/gethashtages/tech
