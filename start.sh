#!/bin/bash

# Start Xvfb
Xvfb :99 -screen 0 1280x1024x24 > /dev/null 2>&1 &

# Export the DISPLAY variable
export DISPLAY=:99

# Run your graphical application
npm start -- -- export -i voice_template.w2bzip -o /tmp/o.mp4

# Kill Xvfb when done
kill %1
