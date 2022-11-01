# API Documentation
*Below are the available `routes` for the blogging api*
___
## Classification
- [Base Route/URI](#base-routeuri)
    - [Landing Route](#landing-page)
- [Sub Route](#sub-routes)
    - [Authentication](#authentication-route)
        - [Signup Route](#signup-route)
        - [Signin Route](#signin-route)
    - [Users Routes](#users-routes)
        - [Get All Users](#get-all-users)
        - [Get User By ID](#get-user-by-idusername)
        - [Update User Info](#update-user-info)
        - [Delete User](#delete-user)
    - [Posts Routes](#posts-route)
        - [Create Post](#create-post)
        - [Get All Post](#get-all-post)
        - [Get Post By ID](#get-post-by-id)
        - [Update/Publish Post](#updatepublish-post)
        - [Delete Post](#delete-post)
___
## Base Route/URI
### landing page
```
http://localhost:[PORT]/
```

## Sub Routes
___
### **Authentication Route**
The Authentication Route includes `signin` and `signup` routes. The `signup` to register a new user and `signin` to authenticate users.
#### **Signup Route**
- Method - `POST`
- Path - `/signup`
- Body:
    - Form Data
    - JSON
- Accepts:
    - Username: 
        - Field: `username` 
        - Type: String 
        - Required: True
        - Unique: True
    - First Name:
        - Field: `first_name`
        - Type: String
        - Required: True
    - Last Name:
        - Field: `last_name` 
        - Type: String 
        - Required: True
    - Email:
        - Field: `email` 
        - Type: String 
        - Required: True 
        - Unique: True
    - Password:
        - Field: `password` 
        - Type: String 
        - Required: True
    - User Type:
        - Field: `user_type` 
        - Type: String
        - Default: "user"
        - Enum: ["admin", "user"]
    - City: 
        - Field: `city` 
        - Type: String
```
http://localhost:[PORT]/signup
```
#### **Signin Route**
- Method - `POST`
- Path - `/signin`
- Accepts: 
    - Email: 
        - Field: `email`
        - Required: True
    - Password:
        - Field: `password`
        - Required: True
```
http://localhost:[PORT]/signin
```
___
### Users Routes
`/users` - The base route for  users
#### **Get all users**
- Method - `GET`
- Path - `/users`
- Authorization - `Admin`
- Authenticated - True
- Authentication Method - Bearer Token(JWT)
```
http://localhost:[PORT]/users
```

#### **Get user by ID/Username**
- Method - `GET`
- Path - `/users/:userid` 
- Accepts - `userid` or `username`
- Authorization - `Admin` and `User`
```
http://localhost:[PORT]/users/:userid
```

#### **Update user info**
- Method - `PUT`
- Path - `/users/:userid/edit`
- Accepts - `userid`
- Authenticated - True
- Authentication Method - Bearer Token(JWT)
- Authorization - `Authenticated User`
- Body: *see [Authentication route](#authentication-route) for editable fields*
```
http://localhost:[PORT]/users/:userid/edit
```

#### **Delete user**
- Method - `DELETE`
- Path - `/users/:userid/delete`
- Accepts - `userid`
- Authorization - `Authenticated User`
- Authenticated - True
- Authentication Method - Bearer Token(JWT)
```
http://localhost:[PORT]/users/:userid/delete
```

___
### Posts Route
`/posts` - The base route for posts 

#### **Create Post**
- Method - `POST`
- Path - `/posts/new_post`
- Authenticated - True
- Authentication Method - Bearer Token(JWT)
- Body:
    - Form Data
    - JSON
- Accepts: 
    - Author: 
        - Field - `author`
        - Type: String
    - Title:
        - Field - `title`
        - Type: String
        - Required: True
        - Unique: True
    - Description:
        - Field - `description`
        - Type: String
    - State: {
        - Field - `state`
        - Type: String
        - default: "draft"
        - Enum: ["draft", "published"]
    - Body:
        - Field - `body`
        - Type: String
    - Tags: 
        - Field - `tags`
        - Type: Array
    - Read Count:
        - Field - `read_count`
        - Type: Number 
        - Default: 0
    - Reading Time:
        - Field - `reading_time`
        - Type: String
```
http://localhost:[PORT]/posts/new_post
```
#### **Get All Post**
- Method - `GET`
- Path - `/posts`
- Query Params:
    - Search By:
        - Author:
            - Field - `author`
            - Accepts: Author's Name
        - Title:
            - Field - `title`
            - Accepts: Post Title
        - Tags:
            - Field - `tags`
            - Type: String
            - Accepts: Tags from Post
    - Filter By:
        - Field - `filter_by`
        - Accepts: `published` or `draft`
    - Order By:
        - Field - `order_by`
        - Accepts: `read_count`, `reading_time` or `timestamp`
    - Sort By:
        - Field - `sort_by`
        - Accepts: `ASC` or `DESC`
        - Default: `ASC`

```
http://localhost:[PORT]/posts/
http://localhost:[PORT]/posts?author=John%20Doe&tags=tech%20node
http://localhost:[PORT]/posts?title=effect%20of%20global%20warming
http://localhost:[PORT]/posts?filter_by=draft
http://localhost:[PORT]/posts?order_by=read_count&sort_by=DESC
```
#### **Get All Post By User**
- Method - `GET`
- Path - `/users/myposts`
- Authenticated - True
- Authentication Method - Bearer Token(JWT)
```
http://localhost:[PORT]/posts/myposts
```

#### **Get Post By Id**
- Method - `GET`
- Path - `/users/:userid`
- Accepts - `userid`
```
http://localhost:[PORT]/posts/:postid
```

#### **Update/Publish Post**
- Method - `PUT`
- Path - `/users/:userid/edit`
- Accepts - `userid`
- Authenticated - True
- Authentication Method - Bearer Token(JWT)
- Authorization - `Authenticated User`
- Body: *see [Create Post](#create-post) for editable fields*
- Query Param:
    - Field - `published`
    - Type: Boolean
```
http://localhost:[PORT]/posts/:postid/edit
http://localhost:[PORT]/posts/:postid/edit?published=true
```
#### **Delete Post**
- Method - `DELETE`
- Path - `/posts/:postid`
- Accepts - `postid`
- Authenticated - True
- Authentication Method - Bearer Token(JWT)
- Authorization - `Authenticated User`
```
http://localhost:[PORT]/posts/:postid
```


