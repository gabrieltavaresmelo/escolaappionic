
# BUILD ANDROID
ionic cordova platform add android@7.1.4
ionic cordova build android

# BUILD WEB
ionic build --minifyjs --minifycss

# PUBLICAR NO FIREBASE HOSTING
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
firebase deploy --only hosting
firebase use --add escola-59267
