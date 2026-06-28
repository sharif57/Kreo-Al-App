# Kreo AI

Kreo AI is an Expo React Native application that enables users to:

- 🎨 Generate images from text prompts (Text to Image)
- 🎥 Convert images into AI-generated videos (Image to Video)

## Features

- AI Text-to-Image Generation
- AI Image-to-Video Generation
- Clean and Modern UI
- Cross-platform (Android, iOS & Web)
- Built with Expo

## Tech Stack

- Expo
- React Native
- Expo Router (or React Navigation)
- TypeScript
- Axios

## Prerequisites

- Node.js (v18+)
- npm or Yarn
- Expo Go app (Android/iOS)

## Installation

Clone the repository:

```bash
git clone https://github.com/sharif57/Kreo-Al-App.git
cd kreo-ai
```

Install dependencies:

```bash
npm install
# or
yarn
```

## Start Development Server

```bash
npx expo start
```

Run the app:

- Press **a** → Android Emulator
- Press **i** → iOS Simulator (macOS only)
- Press **w** → Web
- Or scan the QR code using **Expo Go**.

## Build

Android:

```bash
eas build --platform android
```

iOS:

```bash
eas build --platform ios
```

## Project Structure

```
.
├── app/
├── assets/
├── components/
├── constants/
├── hooks/
├── services/
├── utils/
├── app.json
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License.