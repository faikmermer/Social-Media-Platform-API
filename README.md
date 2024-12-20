# Social-Media-Platform-API

# Inventory-Management-System

It is a comprehensive RESTful API project for a basic social media platform using Mongoose and MongoDB. This API will allow users to create profiles, follow/unfollow other users, create posts, like/dislike posts and add comments.
The system uses Mongoose to handle schema definitions, relationships between documents and data validation.

## Table of Content
- [Installation](#Installation)
- [Project Dependencies](#Dependicies)
- [Usage](#Usage)
- [Endpoints](#Endpoints)
- [Contributing](#Contributing)
- [License](#License)



## Installation
1. Make sure you have Node.js installed. (To download Node.js: [Node.js Official Site](https://nodejs.org))
2. Make sure you have MongoDB installed. (To dowload MySQL : [MongoDB](https://www.mongodb.com/try/download/community))
3. Install the dependencies:  
   ```bash
   npm install  
4. Development Mode:
   ```bash
    npm run dev
5. Complier and Run
   ```bash
    npm run build
    npm start

   
##Dependicies

   ### Ana Bağımlılıklar (`dependencies`)

| dependencies         |Version    | 
|--------------------|:----------:|
| **mongodb**         | `^6.10.0`  | 
| **mongoose** | `^8.8.2` | 
| **typeorm** | `^0.3.20`  |
|**typescript**| `^5.6.3`
|**dotenv**| `^16.4.5`|
---
### Geliştirme Bağımlılıkları (`devDependencies`)

| devDependencies    | Version    | Description                                                             |
|--------------------|:------------:|-------------------------------------------------------------------------|
| **@types/express** | `^5.0.0`   | Express kütüphanesi için TypeScript tipi tanımları.                      |
| **@types/node**    | `^22.9.0`  | Node.js için TypeScript tipi tanımları.                                 |
| **nodemon**        | `^3.1.7`   | Geliştirme sırasında dosya değişikliklerini otomatik olarak algılayan araç. |
| **ts-node**        | `^10.9.2`  | TypeScript dosyalarını doğrudan çalıştırmak için kullanılan araç.       |
| **tsconfig-paths** | `^4.2.0`   | TypeScript için yol alias'ları ayarlamak için kullanılır.               |
| **typescript**     | `^5.6.3`   | TypeScript derleyicisi.                                                 |

---



## Usage

To use the API, send HTTP requests to the provided endpoints. You can use tools like Postman or cURL to interact with the API.

## Endpoints

### 1- POST /users
* Request Body:
```
{
   "name": "Alice",
   "email": "alice@example.com",
   "bio": "Software engineer and blogger"
}
```

* Response:
  
```
{
"id": "60f8c2b0f1a2b2a9c4f5b7b1",
"name": "Alice",
"email": "alice@example.com",
"bio": "Software engineer and blogger",
"followers": [],
"following": []
}
```
### 2- POST /users/60f8c2b0f1a2b2a9c4f5b7b1/follow
* Response:
```
{
   "message": "You are now following Bob."
}
```
### 3- POST /posts
* Request Body:
```
{
   "content": "Just had a great day!",
   "authorId": "60f8c2b0f1a2b2a9c4f5b7b1"
}
```
* Response:
```
{
   "id": "60f8c3d2f1a2b2a9c4f5b7b2",
   "content": "Just had a great day!",
   "author": {
   "id": "60f8c2b0f1a2b2a9c4f5b7b1",
   "name": "Alice",
   "email": "alice@example.com"
   },
   "likes": [],
   "createdAt": "2024-10-11T12:34:56.789Z"
}
```
### 4- POST /posts/60f8c3d2f1a2b2a9c4f5b7b2/like
* Response
```
 { "message": "You liked the post." }
```
### 6. POST /posts/60f8c3d2f1a2b2a9c4f5b7b2/comments
   
 * Request Body:
```
{
  "text": "Great post!",
  "authorId": "60f8c2b0f1a2b2a9c4f5b7b1"
}
```
* Response:
```
{
   "id": "60f8c4a7f1a2b2a9c4f5b7b3",
   "text": "Great post!",
   "author": {
   "id": "60f8c2b0f1a2b2a9c4f5b7b1",
   "name": "Alice"
   },
   "createdAt": "2024-10-11T12:45:00.000Z"
}
```

## Contributing
Contributions are welcome! To contribute to the project, follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature-name`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature-name`)
5.  Open a Pull Request

## License
Distributed under the Unlicense License.
