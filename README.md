

# Sweet Shop React App

## **Overview**

Sweet Shop is a React-based frontend application for managing and purchasing sweets. It communicates with a Django REST API backend to perform authentication, view, add, delete, search, and purchase sweets. The frontend features neumorphic design, animated components, and responsive layout.

---

## **Features**

* User Authentication with JWT tokens
* Dashboard to list all sweets
* Search sweets by name, category, price range
* Add new sweets with a dedicated form
* Purchase/Restock sweets 
* Delete sweets (Admin only)
* Responsive and animated UI using Framer Motion
* Navbar with user dropdown and navigation links

---

## **Tech Stack**

* **Frontend:** React, React Router, Axios
* **UI/UX:** CSS3, Neumorphic design, Framer Motion
* **Authentication:** JWT tokens stored in localStorage
* **State Management:** React `useState` and `useEffect`

---

## **Folder Structure**

```
sweets-management/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│  └── vite.svg
├── README.md
├── src
│  ├── App.css
│  ├── App.jsx
│  ├── assets
│  │  ├── background.jpg
│  │  └── react.svg
│  ├── components
│  │  ├── Navbar.css
│  │  └── Navbar.jsx
│  ├── index.css
│  ├── main.jsx
│  ├── pages
│  │  ├── AddSweet.css
│  │  ├── AddSweet.jsx
│  │  ├── Dashboard.css
│  │  ├── Dashboard.jsx
│  │  ├── DeleteSweet.jsx
│  │  ├── Login.css
│  │  ├── Login.jsx
│  │  ├── PurchaseSweet.css
│  │  ├── PurchaseSweet.jsx
│  │  ├── Register.jsx
│  │  └── ReStockSweet.jsx
│  └── ProtectedRoute.jsx
└── vite.config.js
```

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/SrinivasSKulal/sweets-management
cd sweets-management
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will run on [http://localhost:5173](http://localhost:5173)


## **Environment Variables**

You can configure the **API URL** via environment variables. Create a `.env` file in the root:

```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

* Update all Axios calls in the code to use:

```javascript
axios.get(`${process.env.REACT_APP_API_URL}/sweets/`)
```



## **Usage**

1. **Login:** Use registered credentials to obtain access tokens.
2. **Dashboard:** View all sweets, with quantity, price, and category.
3. **Search:** Filter sweets using name, category, min & max price.
4. **Add Sweet:** Navigate to "Add Sweet" page using the `+` button and submit new sweets.
5. **Purchase:** Go to "Purchase" page, enter quantity, and buy sweets.
6. **Delete (Admin):** Use delete buttons in dashboard to remove sweets (if API allows).

## **Navigation**

* `/login` → Login page
* `/register` → Registration page
* `/dashboard` → View sweets
* `/add-sweet` → Add new sweet
* `/purchase` → Purchase sweets

> All pages except `/login` and `/register` require valid JWT `access_tokens`.


## **Dependencies**

```json
"dependencies": {
  "axios": "^1.6.0",
  "framer-motion": "^10.0.0",
  "react": "^18.2.0",
  "react-bootstrap": "^2.8.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.17.0"
}
```



## **Styling**

* Neumorphic design for buttons, inputs, and cards
* Smooth animations with Framer Motion
* Full-page gradient background or custom image


## **Available Scripts**

* `npm start` → Start development server
* `npm run build` → Create production build
* `npm test` → Run tests (if configured)


## **Notes**

* Ensure the **Django backend** is running and CORS is configured correctly.
* JWT tokens are stored in **localStorage**, so clearing browser storage will log out the user.
* Customize CSS files in `/src/styles` for your preferred theme.



## **License**

Do what you want to do to the project

