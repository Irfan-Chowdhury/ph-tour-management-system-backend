git init

touch .gitignore


git checkout -b development
git checkout -b proejct-setup

npm init -y

npm i -D typescript

tsc --init

```json
    "rootDir": "./src",  
    "outDir": "./dist",
```


npm i express mongoose zod jsonwebtoken cors dotenv


npm i -D ts-node-dev @types/express @types/cors @types/dotenv @types/jsonwebtoken


<!-- https://typescript-eslint.io/getting-started -->
npm install --save-dev eslint @eslint/js typescript typescript-eslint
<!-- Step 3: Running ESLint -->
npx eslint .

<!-- good -->
npx eslint ./src 

<!-- package.json -->
  "scripts": {
    "lint" : "npx eslint ./src"
  },


