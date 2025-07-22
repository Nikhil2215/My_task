# My Tasks

## Description

A feature-rich task management application built with React Native Expo. The app allows users to create, edit, delete, and organize tasks with priority levels, completion tracking, and smart notifications. local storage for data persistence, and a clean user interface.

### Key Features

- **Task Management**: Add, edit, delete, and mark tasks as complete
- **Smart Notifications**: Automatic reminders for pending tasks
- **Priority System**: High, medium, and low priority levels with visual indicators
- **Local Storage**: Tasks are saved locally using AsyncStorage
- **Filtering**: View all tasks, pending tasks, or completed tasks
- **Pagination**: Efficient loading for large task lists
- **Modern UI**: Clean, responsive design with smooth animations

## Setup and Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Expo Go app installed on your mobile device

### Getting Started

1. **Clone the repository** (if applicable) or ensure you have all project files

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npx expo start
   ```

4. **Run on your device**:
   - Download the **Expo Go** app from Google Play Store (Android)
   - Scan the QR code displayed in your terminal or browser using the Expo Go app
   - The app will load on your device

### Alternative Running Methods

- **Android Emulator**: Press `a` in the terminal after starting the server

## Challenges and Solutions

### 6. **Notification Delay Functionality**

**Challenge**: Stuck on delay functionality - trigger property not working properly with the initial implementation:

```javascript
trigger: {
  type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
  seconds: delayInSeconds,
},
```

**Solution**: Discovered that using `Number()` to ensure proper type conversion:

```javascript
trigger: {
   type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
  seconds: Number(delayInSeconds),
},
```

### All bonus points are Done
