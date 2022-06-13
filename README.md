# How to use this repo

# Installed Package
* nodejs + npm
* mongo 3.6.x
* docker

# How to run
* config mongo by add database from file `mongo/mongo-init.js`

## Run Backend
```
cd backend
npm install
npm start
```

See logs on `MongoDB database connection established successfully`

backend will run on port 4000

## Run frontend
```
cd frontend
npm install
npm start
```

## Build Frontend
Change base url first

```
npm build
cd build
python3 -m http.server 8080
```



