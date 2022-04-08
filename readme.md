# Audeci Web Application Prototype

# Team: DRAM DRAM
- Josh Dann
- Adam Sutherland
- Stuart Komar
- Sotiris Kalopetrides

# What Does Audeci Do?
Audeci’s primary objective is to gather and relay information it retrieves from its sensors, ultimately feeding into a heatmap which will communicate this information in a consumable format for our end users.

At set periods of time (most likely an hour apart), our sensors will collect data on the levels of noise, light, air quality, temperature, humidity and air pressure - lightly processing it to add appropriate metadata. This information will be transferred to a gateway node (via a sink node in between if necessary due to distances) and then the gateway node will transfer the information via the internet to Audeci’s server.
# Why is Audeci Useful?
While our primary objective is to provide a tool to impart accurate information on noise levels and help tourists avoid noise pollution, Audeci will come with a number of other sensors; providing data on things such as light levels, air quality, humidity, temperature and air pressure, all of which could factor into the decision making process when looking for a place to stay. The information gathered by Audeci could also have myriad other uses too, ranging from research to, potentially, law enforcement.
# Hardware Users Will Require
Endusers will require an Audeci node and a device that can connect to the internet to register their node in our database.
# How to Setup Audeci Software
## Web App
In a real life context, the web app would run on a dedicated server and would be accessible to endusers without setup.

However, for the sake of the prototype, to set up the web app:
- Ensure all dependencies are installed (see list below)
- Run "npm start" in the integrated terminal
- Open http://localhost:8080/
### Dependencies
Make sure you install these before trying to run "npm start"
- Express       (npm i express)
- EJS           (npm i ejs)
- Body Parser   (npm i body-parser)
- Mongoose      (npm i mongoose)
### Developer Dependencies
The following packages are required for "npm run devStart"
- Nodemon       (npm i nodemon)

## Software for Sink Nodes
### Dependencies for Python scripts ***
- dnspython (pip install dnspython)
- pymongo   (pip install pymongo==3.11.3)

NOTE: dependencies may vary depending on python version.

# Web/ cloud services used by the program
## MongoDB Atlas Database
We store the readings in a MongoDB Atlas cluster that, for the purposes of the prototype, has universal access.

The connection URI is hardcoded into the program where needed and should work on any user's device.

## Mapbox
The Audeci Map makes use of Mapbox; the access token of which is hardcoded into
./public/js/map.js

TR ***

