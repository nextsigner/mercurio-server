#!/bin/bash
echo "$1" | mail --append="Content-type: text/html" -s "$2" $3

