#!/bin/bash
echo "$1" | mail -a "Content-type: text/html" -s "$2" $3

