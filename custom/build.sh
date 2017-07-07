keytool -genkey -v -keystore akys.keystore -alias akys -keyalg RSA -keysize 2048 -validity 10000

ionic cordova build android --prod --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/jjonagam/keys/akys.keystore /Users/jjonagam/akys/platforms/android/build/outputs/apk/android-release-unsigned.apk akys

/Users/jjonagam/Library/Android/sdk/build-tools/25.0.0/zipalign -v 4 /Users/jjonagam/akys/platforms/android/build/outputs/apk/android-release-unsigned.apk akys-5.apk
