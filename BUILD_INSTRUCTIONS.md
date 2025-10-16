# Build Instructions - SM3000 Configuration Tool

## Prerequisites

### Windows
- Node.js 18+ installed
- npm installed
- Windows 10 or later

### macOS
- Node.js 18+ installed
- npm installed
- macOS 10.13 or later
- Xcode Command Line Tools

### Linux
- Node.js 18+ installed
- npm installed
- Build essentials: `sudo apt-get install build-essential`

## Installation

1. Extract the application source code
2. Open a terminal/command prompt in the application directory
3. Install dependencies:

```bash
npm install
```

## Development Mode

To run the application in development mode (for testing):

```bash
npm start
```

This will open the application window. You can test all features without building an installer.

## Building Installers

### Build for Windows

On a Windows machine:

```bash
npm run build:win
```

This will create:
- `dist/SM3000 Configuration Tool Setup 1.0.0.exe` - Windows installer

### Build for macOS

On a macOS machine:

```bash
npm run build:mac
```

This will create:
- `dist/SM3000 Configuration Tool-1.0.0.dmg` - macOS installer

### Build for Linux

On a Linux machine:

```bash
npm run build:linux
```

This will create:
- `dist/SM3000 Configuration Tool-1.0.0.AppImage` - Linux portable app

### Build for All Platforms

To build for all platforms (requires specific OS):

```bash
npm run build
```

Note: Cross-platform building has limitations. It's recommended to build on the target OS.

## Distribution Files

After building, you'll find the installers in the `dist/` folder:

- **Windows**: `SM3000 Configuration Tool Setup 1.0.0.exe`
- **macOS**: `SM3000 Configuration Tool-1.0.0.dmg`
- **Linux**: `SM3000 Configuration Tool-1.0.0.AppImage`

## Distributing to Users

### Windows Users
Send them the `.exe` file. They just need to:
1. Download the .exe file
2. Run it
3. Follow installation wizard
4. Launch from Start Menu or Desktop icon

### macOS Users
Send them the `.dmg` file. They need to:
1. Download the .dmg file
2. Open it
3. Drag the app to Applications folder
4. Launch from Applications

### Linux Users
Send them the `.AppImage` file. They need to:
1. Download the .AppImage file
2. Make it executable: `chmod +x SM3000*.AppImage`
3. Run it: `./SM3000*.AppImage`

## Troubleshooting Build Issues

### Error: "electron-builder not found"
```bash
npm install electron-builder --save-dev
```

### Error: "Python not found" (Windows)
Install Python 3 and add it to PATH, then:
```bash
npm install --global windows-build-tools
```

### Error: "Cannot build for macOS on Windows"
You need to build on an actual macOS machine, or use a cloud CI service.

### Error: "Missing icon"
Make sure `icon.png` exists in the project root. You can replace it with your own icon (256x256 or larger).

## Customization

### Change Application Name
Edit `package.json`:
```json
"name": "your-app-name",
"build": {
  "productName": "Your App Name"
}
```

### Change Version
Edit `package.json`:
```json
"version": "1.0.1"
```

### Change Icon
Replace `icon.png` with your own icon file (PNG format, 256x256 or 512x512 recommended).

## Code Signing (Optional)

For production distribution, you should sign your applications:

### Windows Code Signing
Requires a code signing certificate. Add to `package.json`:
```json
"win": {
  "certificateFile": "path/to/certificate.pfx",
  "certificatePassword": "password"
}
```

### macOS Code Signing
Requires Apple Developer account. Add to `package.json`:
```json
"mac": {
  "identity": "Developer ID Application: Your Name (XXXXXXXXXX)"
}
```

## File Structure

```
sm3000-config-app/
├── main.js              # Electron main process
├── preload.js           # Preload script for IPC
├── index.html           # Main HTML page
├── app.js               # Application logic
├── icon.png             # Application icon
├── package.json         # npm configuration
├── README.md            # English documentation
├── GUIDA_UTENTE.md      # Italian user guide
├── BUILD_INSTRUCTIONS.md # This file
└── node_modules/        # Dependencies
```

## Support

For build issues or questions, contact technical support.

---

**Last Updated**: October 2025
