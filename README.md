# Install notes:

## Dependencies

To install dependencies, run:

```console
npm install
```

## Typescript

Make sure you have typescript installed globally:

```console
npm install -g typescript
npm link typescript
```

(add sudo if you get permission issues)

## Run server

Run Express server with:

```console
npm run dev
```

## MongoDB

MongoDB runs through a Docker container. So make sure you have Docker installed.

Pull mongo image by running:

```console
docker pull mongo
```

Run Docker container by running:

```console
sudo docker run --name mongo-personality -d -p 27017:27017 -v db_data:/data/db mongo
```

MongoDB data is stored inside db_data folder.