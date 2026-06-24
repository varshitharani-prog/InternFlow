# InternFlow 🚀

InternFlow is a full-stack internship application tracker that helps students organize and monitor their internship journey in one place. Users can add applications, update statuses, track interview schedules, manage profiles, and view analytics.

## Features

* 🔐 User Authentication using JWT
* 📝 Add, Edit, and Delete Internship Applications
* 📊 Dashboard with Analytics Charts
* 🔍 Search, Filter, and Sort Applications
* 📅 Track OA and Interview Schedules
* 👤 Profile Management
* 📂 Resume and CGPA Sheet Upload
* 📱 Responsive UI for Desktop and Mobile

## Tech Stack

### Frontend

* React
* React Router
* Chart.js
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Multer

## Project Structure

```
InternFlow
│
├── internship-tracker/      # Frontend
├── internship-backend/      # Backend
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd InternFlow
```

### Backend Setup

```bash
cd internship-backend
npm install
npm start
```

### Frontend Setup

```bash
cd internship-tracker
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside `internship-backend`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Screenshots

(Add screenshots here)

## Future Improvements

* Email Reminders
* Calendar View
* Search by Company
* Cloud Storage for Files
* AI-based Suggestions

## Author

** Bathula Varshitha Rani **
