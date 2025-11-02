# 🕒 ScheduleGenie — AI-Powered Schedule Generator


<a href="https://schedule-genie.vercel.app/">ScheduleGenie</a> is a full-stack AI scheduling application that leverages Gemini AI to help users plan and optimize their daily tasks.
Users can input their goals, available time, and task durations — and ScheduleGenie automatically generates a personalized, efficient timetable.
<br/>
<br/>

<img src="https://github.com/user-attachments/assets/90e72dc9-b723-4a7c-8dd6-7a19d21b7265" width="380px"/>
<img src="https://github.com/user-attachments/assets/78c9b2d4-a517-491d-b83b-04ebb7ffa08f" width="390px"/>
<img src="https://github.com/user-attachments/assets/cc796093-32f9-4830-af2c-da7906e812d6" width="300px"/>
<img src="https://github.com/user-attachments/assets/f14d4973-b299-4bee-b187-82d4b8f5c52f" width="400px" height="240px"/>

## 🧱 Tech Stack

| Layer         | Technologies                              |
| :-------------- | :--------------------------------------- |
| Frontend |	React.js, Tailwind CSS, Shadcn UI |
| AI Integration |	Gemini API |
| Backend & Database | 	Firebase Firestore |
| Authentication |	Firebase Auth |
| Deployment |	Vercel |

<h2>🚀 Features</h2>

<h3>🧠 AI-Generated Schedules</h3>

- Integrates Gemini API to intelligently generate personalized timetables.
- Balances task durations and available hours to create optimized schedules.
- Provides contextual and structured outputs users can directly follow.

<h3>🔐 Authentication & Data Persistence</h3>

- Built with Firebase Authentication for secure user logins.
- Stores user inputs and generated schedules in Firestore Database for persistent access.

<h3>🎨 Modern, Responsive UI</h3>

- Designed using Shadcn UI and Tailwind CSS for a sleek and responsive interface.
- Optimized for both desktop and mobile screens.

<h3>🔮 Future Enhancements</h3>

- Add calendar integration (Google Calendar / Outlook).
- Enable task prioritization and progress tracking.
- Add reminder notifications and sharing features.
- Introduce AI suggestions for optimal time-slot allocation.
  
### Cloning the repository

```shell
git clone https://github.com/Omkar-kamble82/ScheduleGenie.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_RESEND_KEY=
VITE_GEMINI_API_KEY=
```


### Start the app

```shell
npm run dev
```


## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
