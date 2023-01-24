# Preparation
---
1. npm init --y
2. npm install eslint --save dev
   
   Eslint adalah sebuah tool untuk mengidentifikasi dan melaporkan ketika ada kode yang melanggar aturan-aturan tertentu.

3. buat file main.js
4. buat folder app
5. difolder app buat file
   a. server.js
   b. routes.js
   c. handler.js
   d. bookself.js 
6. npx eslint --init
   pilih to chekc syntax, find problems, and enforce code style
   pilih commonJS 
   pilih non of these
   plih no
   plih node
   pilih use a popular style guide
   pilih standard
   pilih json
   pilih install them now, piilih npm

7. npm install @hapi/hapi@^20.1.2 --save-dev
   
8. npm install nodemon


## server.js
---

```js
const Hapi = require('@hapi/hapi')

const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

//   server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

module.exports = init
```
## Main.js

```js
const runServer = require('./src/server')

runServer()
```

## Routes.js

```js
  const routes = [
    {
      method: 'GET',
      path: '/',
      handler: () => {
          return "ini adalah halaman home"
      },
    }, 
  ];
  
  module.exports = routes;
```

## testing
```
curl -X GET http://localhost:5000

##output: ini adalah halaman home

```

jika kita coba curl -X POST http://localhost:5000

outputnya "not found"

jika kita tambahkan kode berikut setelah get,

```js
...
  {
      method: '*',
      path: '/',
      handler: () => {
          return "halaman ini tidak bisa diakses"
      },
    }, 
```
maka jika kita coba curl -X POST http://localhost:5000

outputnya "halaman ini tidak bisa diakses"

# inti

struktur data input dari postman
```
{
  "name": string,
  "year": number,
  "author": string,
  "summary": string,
  "publisher": string,
  "pageCount": number,
  "readPage": number,
  "reading": boolean
}
```

struktur data yg akan disimpan didalam array

```
{
  "id": nanoid(16)
  "name": string,
  "year": number,
  "author": string,
  "summary": string,
  "publisher": string,
  "pageCount": number,
  "readPage": number,
  "finished":boolean,
  "reading": boolean,
  "insertedAt": time,
  "updatedAt": time,
}
```

- jika finished = true (readPage = pageCount)
- jika finished = false (readPage < pageCount)
- jika finished = undefined (readPage > pageCount)
  
selanjutnya install nanoid `` npm install nanoid@^3.1.22 `` untuk generate id otomatis


# ref
- https://www.youtube.com/watch?v=AW3IAVOUFMg
  make rest api using nodejs dan hapi
- https://github.com/laminalfalah/bookshelf-api/blob/master/src/routes/index.js 
- https://github.com/azka1415/Bookshelf-API/blob/main/src/handler.js

## Test

```
## show book by id [get]
localhost:9000/books/9aNX4CfTJ5i4Jvaf

## show all books [get]
localhost:9000/books/

## input book [post]
localhost:9000/books

body - raw(json)
{
	"name": "dicoding1",
	"year": 2021,
	"author": "sault",
	"summary": "dicoding belajar nodeJs",
	"publisher": "dicodingPress",
	"pageCount": 10,
	"readPage":4,
	"reading": true
}

## delete book by id [delete]
localhost:9000/books/9aNX4CfTJ5i4Jvaf

```