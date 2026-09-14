# Temple Yatra

## Project Description

Temple Yatra is a full-stack web application designed to explore and preserve information about India's sacred temples, pilgrimage circuits, and festivals. Users can browse temple histories, daily darshan timings, rituals, dress codes, and location directions without creating an account. The platform also includes a secure admin portal for managing temple listings and information.

---

## Key Features

* **50 Sacred Temples**: Complete profiles with history, architecture, daily darshan schedules, pooja rituals, and visitor rules.
* **Search & Filters**: Quick search by temple name, deity, or city, along with filters for states and categories (such as 12 Jyotirlingas, Char Dham, and UNESCO Heritage).
* **Pilgrimage Circuits**: Step-by-step guides for famous holy routes like Char Dham Yatra, 12 Jyotirlingas, and South Indian temple circuits.
* **Festivals Guide**: Calendar and details of major temple festivals celebrated across India.
* **Directions & Sharing**: One-click Google Maps navigation links and built-in sharing options.
* **Dark & Light Mode**: Simple theme toggle that saves user preference.
* **Admin Dashboard**: Protected login system for administrators to add, edit, feature, or remove temple records.
* **Responsive Layout**: Works smoothly on mobile phones, tablets, and desktop computers.

---

## Technologies Used

* **Frontend**: React 19, React Router v7, Vanilla CSS, React Icons, Axios
* **Backend**: Node.js, Express 5, JSON Web Token (JWT), bcryptjs, CORS, dotenv
* **Database**: MongoDB Atlas with Mongoose 9
* **AI/ML/RAG**: None (This project does not use AI, ML, or RAG tools)

---

## How It Works

1. A user visits the website and browses temples, pilgrimage circuits, or festivals.
2. The React frontend sends HTTP requests to the Express backend API endpoints (`/api/temples`, `/api/festivals`, `/api/pilgrimages`).
3. The Express backend reads or writes data in the MongoDB Atlas database using Mongoose schemas.
4. The frontend receives the JSON data and displays the temple information, pictures, and timings.
5. Administrators can log in through the admin route to obtain a secure JWT token and manage temple records.

---

## Project Structure

```
TempleYatra/
├── api/
│   └── index.js             # Serverless deployment entry point
├── server/
│   ├── src/
│   │   ├── config/          # MongoDB database connection
│   │   ├── controllers/     # API route handlers (temples, festivals, circuits, auth)
│   │   ├── middleware/      # JWT authentication middleware
│   │   ├── models/          # Database models (Temple, Festival, Circuit, User)
│   │   ├── routes/          # Express API routes
│   │   ├── seed.js          # Database seeding script with 50 temples
│   │   └── server.js        # Express application setup
│   ├── .env.example         # Example server environment variables
│   └── package.json         # Backend dependencies and scripts
├── temple-frontend/
│   ├── public/
│   │   ├── images/          # Local temple images and website logo
│   │   └── index.html       # Web page entry point
│   ├── src/
│   │   ├── components/      # UI components (Navbar, Footer)
│   │   ├── context/         # Auth and Theme context
│   │   ├── pages/           # Application pages (Home, Temples, Detail, Circuits, Admin)
│   │   ├── services/        # Axios API client setup
│   │   ├── App.js           # Route configuration
│   │   └── index.js         # React root rendering
│   ├── .env.example         # Example frontend environment variables
│   └── package.json         # Frontend dependencies and scripts
├── package.json             # Root scripts to run both servers concurrently
└── README.md                # Project documentation
```

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/deepakbalan26/TempleYatra.git
   cd TempleYatra
   ```

2. **Install root and project dependencies**:
   ```bash
   npm install
   npm install --prefix server
   npm install --prefix temple-frontend
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `server` folder by copying `server/.env.example`:
   ```bash
   cp server/.env.example server/.env
   ```
   Add your MongoDB connection string and JWT secret.

4. **Seed the database**:
   ```bash
   npm run seed
   ```

---

## How to Run

* **Start both backend and frontend together (from the root folder)**:
  ```bash
  npm run dev
  ```

* **Access the application**:
  * Frontend: [http://localhost:3000](http://localhost:3000)
  * Backend API: [http://localhost:5000/api](http://localhost:5000/api)
  * Backend Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)
  * Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Environment Variables

### Backend (`server/.env`)
* `PORT`: Port number for the backend server (e.g. `5000`)
* `MONGO_URI`: MongoDB connection string
* `JWT_SECRET`: Secret key used to sign JWT authentication tokens
* `NODE_ENV`: Application environment (`development` or `production`)

### Frontend (`temple-frontend/.env` - Optional)
* `REACT_APP_API_URL`: Backend API base URL (defaults to `http://localhost:5000/api` for local development)

---

## Usage

* **Search Temples**: Use the search bar on the home or temples page to find temples by name, deity, or city.
* **Filter Records**: Select a state or category to view specific groups like 12 Jyotirlingas or Char Dham.
* **View Temple Information**: Click on any temple card to view history, darshan timings, pooja schedules, dress code, and visitor etiquette.
* **Get Directions**: Click the "Open in Google Maps" button to open navigation directly on your device.
* **Explore Circuits & Festivals**: Visit the Pilgrimages and Festivals pages from the navigation menu to discover sacred trails and holy dates.
* **Change Theme**: Click the theme toggle icon in the navigation bar to switch between dark and light modes.
* **Admin Management**: Sign in at `/admin/login` to create new temple listings, update existing records, or toggle featured status.

---

## Future Improvements

* Add user reviews and ratings for temple visits.
* Add audio recordings for daily temple aartis and chants.
* Add support for Indian regional languages such as Hindi and Tamil.
* Add offline support (PWA) so travelers can view temple timings without internet.

---

## Author

* **Deepak Balan** - [deepakbalan26@gmail.com](mailto:deepakbalan26@gmail.com)
