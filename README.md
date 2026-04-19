# PeakTracker Europe

An interactive map app to track and visualize the highest peaks visited across Europe. Built with simple web technologies and packaged as an Android app.

This is a **vibecoded project** — created iteratively with a focus on learning, experimentation, and building something useful.

---

## Features

* Interactive map of Europe
* Click countries to view their highest peak
* Mark countries as visited
* Upload and store your own photos locally
* Works offline (uses IndexedDB)
* Theme customization
* Mobile support with zoom and pan
* Options panel for settings and data reset

---

## Tech Stack

* HTML, CSS, JavaScript
* IndexedDB (local storage)
* Capacitor (Android build)

---

## Running on Android

### Requirements

* Node.js
* Android Studio

---

### Setup

Unzip android.zip

```bash
npm install
npx cap sync
```

---

### Open in Android Studio

```bash
npx cap open android
```

Or open the `/android` folder manually in Android Studio.

---

### Run the app

* Connect a phone (with USB debugging enabled)
* Or use an emulator
* Click Run in Android Studio

---

## Building an APK

In Android Studio:

```
Build → Build APK(s)
```

The APK will be located at:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---


## Project Structure

```
/public
  index.html
  style.css
  data.json
  /images
  /js
/android
```

---

## Notes

* Images are stored locally using IndexedDB
* No backend is required
* Data persists on the device

---

## Future Improvements

* Better map interactions
* Zoom-to-country feature
* Data export/import
* UI improvements

---

## License

MIT
