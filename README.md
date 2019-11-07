# Playtest Prototype

## About

This project is a prototype socket server intended for playtesting UX research of Thunk gameplay. 

## Usage

- The Player view is available at [thunkyou.herokuapp.com/](https://thunkyou.herokuapp.com/)
- The Host/Game Master view is available at [thunkyou.herokuapp.com/host](https://thunkyou.herokuapp.com/host)
- The System Data/Player Responses view is available at [thunkyou.herokuapp.com/data](https://thunkyou.herokuapp.com/data)

To conduct a Thunk round 1 playtest with this app, read the [full usage instructions](https://docs.google.com/document/d/1dOuF8cvLDkad-D1MXc76qy7BtDXmql0kFkSh1Df-mzY/edit).

## System Requirements

Requires npm/node to install socket.io and express.
Note: This project uses the jQuery CDN.

## Install

Clone the repo into your preferred directory, then install node depencies with:

    npm install

## Test

To test on local, navigate to the root directory of the app and run:

    npm start

The app will be available on [localhost:3000](http://localhost:3000).

## Deploy 

Herokuapp is automatically setup to deploy new changes on a commit/merge with the master branch.