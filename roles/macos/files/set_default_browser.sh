#!/bin/bash

# Check if a browser argument is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <browser>"
  exit 1
fi

browser="$1"

# Change the default browser using the command line
/opt/homebrew/bin/defaultbrowser "${browser}"

# Use AppleScript to interact with the system prompt
osascript <<EOF
try
    tell application "System Events"
        tell application process "CoreServicesUIAgent"
            tell window 1
                tell (first button whose name starts with "use")
                    perform action "AXPress"
                end tell
            end tell
        end tell
    end tell
end try
EOF

echo "Default browser set to ${browser}."
