
# 📊 Project Cost Tracker

A modern web app to manage and track your project items and other costs with total calculations. Built using **React**, **Redux Toolkit**, **Firebase Authentication & Firestore**, **Styled Components** and **Mantine UI**.

## 🚀 Live Demo
👉 [Visit Live Netlify Link](https://projectcosttrackerbykarthikeya.netlify.app/dashboard)

---

## 📦 Features

- 🔐 Firebase Authentication (Sign Up / Login / Logout)
- 📑 Add, Edit, Delete **Project Items**
- 💸 Add, Edit, Delete **Other Costs**
- 📝 Total cost calculation
- 🎨 Fully styled with **Styled Components**
- ⚡ Smooth UI with **Mantine Core & Notifications**
- 🔥 Real-time data with **Firestore**
- 🎛️ Responsive, clean layout

---

## 📸 Screenshots

| Login | Dashboard |
|:------|:-----------|
|![image](https://github.com/user-attachments/assets/96ed3e39-fec1-4fdb-ad28-60a368d6d6c6)| ![image](https://github.com/user-attachments/assets/4d5fdf3d-24fc-4f2f-bb8f-8d9cafe768f6)|

---

## 🛠️ Tech Stack

- **React**
- **Redux Toolkit**
- **Firebase Auth**
- **Firestore**
- **Styled Components**
- **Mantine UI**
- **React Router DOM**
- **Netlify Deploy**

---

## 📂 Folder Structure

```

src/
├── app/
│   └── store.js
├── components/
│   ├── ItemsManager.jsx
│   ├── OtherCostsManager.jsx
│   ├── ProjectCostLayout.jsx
│   ├── ProjectTotal.jsx
│   └── StyledLogin.jsx
├── features/
│   ├── authSlice.js
│   ├── itemsSlice.js
│   └── otherCostsSlice.js
├── firebase.js
├── App.jsx
└── main.jsx

````

---

## 📦 Install & Run

```bash
git clone https://github.com/karthikeyabommireddy/ProjectCostTracker.git
cd ProjectCostTracker
npm install
npm run dev
````

---

## 🔥 Deployment on Netlify

1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. Create `_redirects` file inside `public/` (if using React Router):

```
/*    /index.html   200
```

4. Deploy via Netlify dashboard or CLI.

---

## 🤝 Author

**Karthikeya Bommireddy**
[GitHub](https://github.com/karthikeyabommireddy)

---
