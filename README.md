# 🛕 Temple Yatra — India Temple Heritage & Pilgrimage Portal

Temple Yatra is a full-stack web application that provides information about temples and pilgrimage places across India.

Users can explore temple history, timings, festivals, pilgrimage circuits, visitor rules, and temple locations.

The project does not require users to create an account to view temple information.

---

## 📌 Project Description

Temple Yatra helps users easily discover information about Indian temples.

The website provides:

* Temple history and details
* Darshan and pooja timings
* Temple festivals
* Visitor rules and dress codes
* Temple locations
* Pilgrimage circuits
* Festival information
* Google Maps navigation

The project also has an **Admin Dashboard**. Authorized administrators can add, edit, feature, and delete temple information.

---

## ✨ Key Features

* 🛕 **50 Temple Profiles**

  * Temple history
  * Deity information
  * Architecture
  * Darshan timings
  * Pooja timings
  * Visitor rules

* 🔎 **Search and Filters**

  * Search by temple name, deity, or city
  * Filter by Indian state
  * Filter by temple category

* 🛣️ **Pilgrimage Circuits**

  * Char Dham Yatra
  * 12 Jyotirlingas
  * South Indian Temple Trail
  * Other pilgrimage circuits

* 🪔 **Festival Guide**

  * Festival dates
  * Lunar periods
  * Festival importance
  * Related temples

* 📍 **Google Maps Navigation**

  * Open the temple location directly in Google Maps

* 📤 **Share Temple Information**

  * Share temple details using the web share feature

* 🌙 **Light and Dark Theme**

  * Switch between light and dark themes
  * Theme preference is saved in `localStorage`

* 🔐 **Admin Dashboard**

  * Secure admin login
  * Add temples
  * Edit temple details
  * Update timings
  * Feature temples
  * Delete temple records

* 📱 **Responsive Design**

  * Works on desktop, tablet, and mobile devices

---

## 🛠️ Technologies Used

| Part              | Technology      |
| ----------------- | --------------- |
| Frontend          | React 19        |
| Routing           | React Router v7 |
| Styling           | Vanilla CSS3    |
| Icons             | React Icons     |
| HTTP Requests     | Axios           |
| Backend           | Node.js         |
| API               | Express.js 5    |
| Database          | MongoDB Atlas   |
| Database Tool     | Mongoose 9      |
| Authentication    | JWT             |
| Password Security | bcryptjs        |
| Deployment        | Vercel          |

---

## 🧠 How It Works

### 1. Frontend

The frontend is built with React.

Users can:

* Open the website
* Search for temples
* Apply filters
* View temple details
* Explore pilgrimage circuits
* View festivals
* Open temple locations in Google Maps

### 2. Backend

The backend uses Node.js and Express.js.

It provides APIs for:

* Temples
* Festivals
* Pilgrimage circuits
* Admin authentication

The frontend uses Axios to communicate with these APIs.

### 3. Database

MongoDB Atlas stores the project data.

The main data collections are:

* `Temple`
* `Festival`
* `PilgrimageCircuit`
* `User`

Mongoose is used to work with the MongoDB database.

### 4. Admin Security

Admin features are protected using JWT authentication.

Admin passwords are stored using `bcryptjs` password hashing.

---

## 💻 How to Run Locally

You can run the project using VS Code.

### Step 1: Clone the Repository

```bash
git clone https://github.com/deepakcodes-2028/India-Temple-Heritage-Portal.git
cd India-Temple-Heritage-Portal
```

### Step 2: Install Dependencies

Install the root dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
npm install --prefix server
```

Install frontend dependencies:

```bash
npm install --prefix temple-frontend
```

### Step 3: Set Environment Variables

Create the environment file:

```bash
cp server/.env.example server/.env
```

Open `server/.env` and add your values:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Do not share your MongoDB connection string or JWT secret publicly.

### Step 4: Add Initial Data

Run the seed command:

```bash
npm run seed
```

This adds the initial temple, festival, pilgrimage circuit, and admin data to the database.

### Step 5: Start the Project

Run:

```bash
npm run dev
```

The project will start the frontend and backend together.

### Local URLs

* **Frontend:** `http://localhost:3000`
* **Backend API:** `http://localhost:5000/api`
* **Health Check:** `http://localhost:5000/api/health`
* **Admin Login:** `http://localhost:3000/admin/login`

---

## ☁️ Deployment on Vercel

The project is configured to run as a full-stack application on Vercel.

### Step 1: Configure MongoDB Atlas

Add the required network access settings in MongoDB Atlas so the deployed application can connect to the database.

### Step 2: Import the GitHub Repository

Open Vercel and import:

```text
India-Temple-Heritage-Portal
```

### Step 3: Configure Environment Variables

Add these variables in Vercel:

| Variable     | Value                                |
| ------------ | ------------------------------------ |
| `MONGO_URI`  | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Your secret key                      |
| `NODE_ENV`   | `production`                         |

### Step 4: Deploy

Click **Deploy**.

Vercel will build and deploy the frontend and backend according to the project configuration.

---

## 📁 Project Structure

```text
India-Temple-Heritage-Portal/
│
├── api/
│   └── index.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │
│   │   ├── middleware/
│   │   │
│   │   ├── models/
│   │   │
│   │   ├── routes/
│   │   │
│   │   ├── seed.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── temple-frontend/
│   ├── public/
│   │   ├── images/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.css
│   │   └── theme.css
│   │
│   ├── .env.example
│   └── package.json
│
├── vercel.json
├── package.json
└── README.md
```

---

## 🔐 Admin Access

The admin dashboard is available at:

```text
/admin/login
```

For security, **do not publish real admin passwords in the GitHub README**.

Use the credentials configured for your deployment or provide test credentials separately to evaluators.

---

## 🔮 Future Improvements

* Add temple information in more Indian languages
* Add audio for aartis, bells, and mantras
* Add Progressive Web App (PWA) support
* Add offline access for selected information
* Add more temples and pilgrimage circuits
* Improve search and filtering
* Add more verified temple information

---

## 👨‍💻 Author

**Deepak Balan**

GitHub: [@deepakcodes-2028](https://github.com/deepakcodes-2028)

---

## 📄 License

This project is developed for educational and portfolio purposes.

Temple information is collected and organized from public educational and temple-related resources.
