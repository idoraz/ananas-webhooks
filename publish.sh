sudo git reset --hard

sudo git pull ssh://sag121@vs-ssh.visualstudio.com:22/XACT/_ssh/xact-api

npm i

sudo npm run tsc

pm2 delete prod-xact-api
pm2 reload prod.xact-api.config.js