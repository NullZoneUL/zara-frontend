# Zara frontend technical test

You can check the final website at [Zara frontend](https://zara-frontend.vercel.app/). ***Important! You need to start the backend for the project to work properly. You can check and start the backend by visiting the [API Website](https://prueba-tecnica-api-tienda-moviles.onrender.com/docs/)***

## **--- Tech stack ---**

I have used the following technolgies:

- React
- React Router DOM
- TypeScript
- Vite
- pnpm

**CSS**

- SASS
- Autoprefixer

**Tests**

- Jest (and all its variants required to work with react and Typescript)

**Linter**

- ESLint
- Prettier
- Husky, (pre-commit)

**Deployment**

- Vercel
  
I have used Vercel to preview pull requests (Vercel makes a build with each commit) and to deploy the application easily.

## **--- Diagram --**

This project is organized into several folders based on their responsibility and functionality, making the codebase easier to maintain, scale, and understand.

The two most important folders in the project are components and elements:

 - **components**
    This folder is used exclusively for the main sections of the application. Each component here represents a complete section of a page, such as Home (index) or MobileView (/mobile). These components are composed of smaller elements and are closely tied to the layout and structure of specific pages.

 - **elements**
    This folder contains all reusable UI components that can be shared across different pages and sections of the application. These are smaller, more generic components used in the component elemets. The goal of this folder is to promote reusability and consistency throughout the project.

## **--- Initialize ---**
** ***Important! [Node](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/installation) must be installed to run this project.*** **
<br>
Node version: **22.13.1**
<br>
pnpm version: **10.23.0**
<br>

Execute both commands.

**-> pnpm i**
<br>
**-> pnpm run prepare**

***Important! In order to be able to run this project, you will have to add the .env file to the root directory of this project. Create a .env file and add the key VITE_X_API_KEY with the value provided in the test description (87909...), and the key VITE_API_URL with the api url: ...es.onrender.com/products

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
