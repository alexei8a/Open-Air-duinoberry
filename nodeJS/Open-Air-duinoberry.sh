#!/bin/bash
lxterminal --working-directory="/home/pi/Open-Air-duinoberry/nodeJS/sensores" -e "node app.js"
lxterminal --working-directory="/home/pi/Open-Air-duinoberry/nodeJS/api" -e "node app.js"
lxterminal --working-directory="/home/pi/Open-Air-duinoberry/nodeJS/mqtt" -e "node app.js"
