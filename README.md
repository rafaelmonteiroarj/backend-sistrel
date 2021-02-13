**Create Migrate**

```sh
yarn typeorm migration:create -n Users
```

**Execute Migration**

```sh
yarn typeorm migration:run
```

**Reverting the migration**

```sh
yarn typeorm migration:revert
```

**List the Migrations**

```sh
yarn typeorm migration:show
```

**Ubuntu commands**

```sh
sudo netstat -lpn |grep :'3000'
kill -9 20584
```

docker build -t test-application .
docker run -p 3000:3000 test-application
