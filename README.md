# Cryptid Cartographer

## Initial Setup 

1. Open up your terminal and clone this repository
1. Run `git init` from the root directory of Cryptid Cartographer (the same directory that the `.sln` file is in) 

> **NOTE:** Make sure you 'git init' before running `create-react-app` in the `client` directory

## SQL Database Setup

1. Run the SQL Seed and Data scripts in this repo.
1. Run `SELECT` SQL commands in a Query window to see what data this Repo consists of.

## Server Side
1. Type 'start CryptidCartographer.sln' in terminal to open code in Visual Studio 2019
1. Install Nuget Packages `Microsoft.Data.SQLClient` version 4.0.1 as well as `Microsoft.ASP.Net.Core.Authentication.JWTBearer`version 5.0.5

## Client Side

1. In `client` directory run `npx create-react-app .`
1. Install firebase and react router using `npm install react-router-dom@5.2.0 firebase@8.7.1`

> **NOTE:** When running this app run the back end server first then run `npm start` inside the `client` directory in the repo.

## How to navigate Cryptid Cartographer

Once the app loads, you will be prompted with an option to sign in or register as a new user. You will need to register as a new user.

After creating your account, you will be presented with a US map that allows users to view sightings of crpytids for each state. 

The nav bar links to user-submitted sightings (this will initially be empty) and a 'Cryptid Tracker' list which requires the user to 'track' sightings before it will be populated.

You can begin creating your Sightings List by navigating to the `My Sightings` link in the nav bar. After selecting the `Add Sighting` button you will be prompted with a form to report your own Cryptid sighting. Each field must be filled out in order to submit the form.

Once you have have created a new sighting you can see your sighting listed in 'My Sightings' as well as via the US Map to the appropriate state. You will also have the ability to Update, Delete, or view the Cryptid Sighting details.

The logged in user can click 'Track' on other user sightings in order to save them to their 'Tracking List' which can be viewed via the navbar. The user then has the option to 'untrack' the cryptid sightings.

## Documentation

dbdiagram : https://dbdiagram.io/d/61ef1fc57cf3fc0e7c5f9b81
