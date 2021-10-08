
# BUILD ANDROID
ionic cordova platform add android@7.1.4
ionic cordova build android

# RUN ANDROID
adb devices
ionic cordova run android --target=RQ8N307V5ZD

# CONSOLE MOBILE
chrome://inspect

# BUILD WEB
ionic build --minifyjs --minifycss

# PUBLICAR NO FIREBASE HOSTING
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
firebase deploy --only hosting
firebase use --add escola-59267
