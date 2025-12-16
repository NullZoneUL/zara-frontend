# Zara frontend technical test

** ***Important! [Node](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/installation) must be installed to run this project.*** **
<br>
Node version: **22.13.1**
<br>
pnpm version: **10.23.0**
<br>

## **--- Initialize ---**
Execute both commands.

**-> pnpm i**
<br>
**-> pnpm run prepare**

***Important! In order to be able to run this project, you will have to add the .env file to the root directory of this project. Creat a .env file and add the key VITE_X_API_KEY with the value provided in the test description (87909...), and the key VITE_API_URL with the api url: ...es.onrender.com/products

## **--- Running Dev server ---**

**-> pnpm start**

By executing this command you will start the Vite dev server locally. You can access to the page by ***http://localhost:8080/*** or ***http://(your_private_ip):8080/***
<br>
If you need to change the server port, you can do it by just changing it in the ***vite.config.ts*** file, in the ***port*** section.

To stop the server, you just have to press **CTRL + C** in the command line.


## **--- Making a build ---**

**-> pnpm run build**

By using this command you will generate a build of the project which can be used leter in any web server.
<br>
The builds will be located in ***./dist*** directory.


## **--- Running the tests ---**

**-> pnpm run test**

This command will execute all tests located in this project. You can find all of them in ***./tests*** folder located in src directory.