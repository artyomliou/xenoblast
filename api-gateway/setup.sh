#!/bin/bash

openssl req -x509 -new -nodes -sha256 -utf8 -days 3650 -newkey rsa:2048 -keyout ssl/privkey.pem -out ssl/fullchain.pem -config setup_ssl.conf
