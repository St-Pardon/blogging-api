# Blogging API
Welcome to [St. Pardon](https://st-pardon.github.io/portfolio-landing-page) blogging api, feel free to explore and contribute. You can reach out for collabouration
## About
The blogging api works on the principle of creating a post and having it read by other people. 

The general idea is that the api has a general endpoint that shows a list of articles that have been created by different people, and anybody that calls this endpoint, are able to read a blog created by them or other users.

## Getting Started
- Open your terminal
- Clone the repo and enter the directory
```sh
$ git clone https://github.com/st-pardon/blogging-api.git 
$ cd blogging-api/
```
- Install packages and dependecies
```sh
$ npm install
```
- Create a `.env` file and  Set up every environmental variable required
    > see [.env](./config/README.md) for required variables 
- Start the App
```sh
$ npm start
```
Congratulations, you have successfully started your App, explore the [API Docs](./routes/README.md) for full list of `routes`/`paths`

## Doucmentation
> For complete list of the API Documetation, visit [API docs](./routes/README.md)
- Hosts:
    - Remote - `https://odd-plum-walrus-kilt.cyclic.app`
    - Local - `http://Localhost:[PORT]`
- Home Route - `/`
```
http://<hostdomain>/
```
- [Sign Up](./routes/README.md#signup-route) - `/signup`
```
http://<hostdomain>/signup
```
- [Sign In](./routes/README.md/#signin-route) - `/signin`
```
http://<hostdomain>/signin
```
- [Blog posts](./routes/README.md#get-all-post) - `/posts`
```
http://<hostdomain>/posts
```
- [Create Blog posts](./routes/README.md#create-post) - `/posts/new_post`
```
http://<hostdomain>/posts/new_post
```

## Deploy

The App is Live At [Blogging API](https://odd-plum-walrus-kilt.cyclic.app) 🚀🚀🚀


*Don't forget to leave a Star*
