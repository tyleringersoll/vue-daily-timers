# Daily Repeating Timers

A Vue.js 3 application for managing multiple daily repeating timers within a scheduled time window. Perfect for managing recurring daily tasks, work intervals, or any time-based routines.

## Features

- 🕒 Create multiple concurrent timers
- 📅 Schedule active hours for automatic timer management
- 🔄 Daily reset functionality
- 🔔 Audio and browser notifications
- 💾 Persistent storage of timers and settings
- 📱 Responsive design
- 🌐 Timezone support

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tyleringersoll/vue-daily-timers.git
cd vue-daily-timers
```

2. Install dependencies:
```bash
npm install
```


## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Testing

The application includes both unit tests (Vitest) and E2E tests (Cypress).

### Unit Tests

Run unit tests:
```bash
npm run test:unit
```

### E2E Tests

Start the development server:
```bash
npm run dev
```

In a separate terminal, run E2E tests:
```bash
# Run in headless mode
npm run test:e2e

# Run with Cypress UI
npm run test:e2e:dev
```

## Project Structure

```
daily-repeating-timers/
├── src/
│   ├── components/         # Vue components
│   ├── composables/        # Vue composables
│   ├── constants/          # Application constants
│   └── App.vue             # Root component
├── cypress/
│   └── e2e/               # E2E tests
├── public/                # Public static assets
└── package.json           # Project dependencies
```

## Key Components

### Components
- `TimerForm.vue`: Form for creating new timers
- `TimerList.vue`: Display and management of active timers
- `ScheduleSettings.vue`: Schedule configuration interface

### Composables
- `useTimers`: Timer management logic
- `useSchedule`: Schedule management logic
- `useAudio`: Audio notification handling
- `useNotification`: Desktop notification management

## Configuration

### Timer Schedule
- Default schedule: 9:00 AM - 5:00 PM EST
- Configurable through the UI
- Persists across sessions

### Notifications
- Audio notifications when timers complete
- Desktop notifications (requires permission)
- Fallback to alert if notifications are not available

## Browser Support

The application supports all modern browsers:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Created by Tyler Ingersoll
- Built with Vue.js 3
- Styled with Tailwind CSS
