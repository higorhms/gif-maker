<h1 align="center">
    <img alt="LogoGitHub" src=".github/logo/GitHub_Logo.png" width="200px"/>
</h1>

<h3 align="center">
  🚀 City Population API using Fastify
</h4>

<p align="center">		 

  <img alt="Language" src="https://img.shields.io/github/languages/top/higorhms/city-population?style=for-the-badge">
	
  <a href="https://www.linkedin.com/in/higormartinsdasilva/" target="_blank">
    <img alt="Made by Higor Martins" src="https://img.shields.io/badge/made%20by-Higor_martins-%2304D361?style=for-the-badge">
  </a>

  <a href="https://github.com/higorhms/city-population" target="_blank">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/higorhms/city-population?style=for-the-badge">
  </a>

   <a href="https://github.com/higorhms/city-population/stargazers" target="_blank">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/higorhms/city-population?style=for-the-badge">
  </a>
</p>

## :gear: Installing this project

- Make sure you have NodeJS installed on your machine.
- Make sure you have Docker Compose installed on your machine.
- Download or clone this project.
- If you are using NPM as a package manager.
  - Run `npm install` to install all the necessary dependencies.
  - Run `npm run start` to run the docker-compose file and start the application.
- Or
  - Run `npm run start:docker` to run the docker-compose file.
  - Run `npm run start:app` to start the application.
- Once the application is started, it will start a bulk register of cities using this `src/data/seed/bulk-city-populations.csv` file.
- After all the instructions you can see the application on port http://localhost:5555/api.