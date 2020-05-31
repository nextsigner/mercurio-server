#!/bin/bash
echo "$1" | mail -s "$(echo -e "$2\nContent-Type: text/html")" $3

