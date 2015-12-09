#### Running the project locally

```sh
 - $ npm install
 - $ webpack -w
 - $ npm run dev
 - http://localhost:3000/tools/bcrypt-verify/
```

#### Deployment process

```sh
 - ssh root@<IP Address>
 - su ryan
 - cd / && cd opt/cryptoBox
 - sudo git pull
 - nvm ls
 - nvm use v0.12.3
 - forever restart server.js
```
