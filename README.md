# Fitness Studio Management Web Application

A full-stack web application to streamline operations of a fitness studio: member registration, class scheduling, booking, and viewing bookings. Deployed on Render for accessibility.  

---

## 🔗 Live Demo

[https://fitness-studio-6le6.onrender.com/](https://fitness-studio-6le6.onrender.com/)

---

## 🧰 Features

- User authentication (registration & login)  
- Role-based dashboards for **Members**, **Trainers**, and **Admins**  
- Class scheduling and availability  
- Booking & viewing bookings  
- Validation:  
  - Prevent duplicate bookings  
  - Prevent bookings when slots are full  
  - Basic input validation (name, email etc.)  
- Responsive UI for mobile & desktop  
- RESTful APIs for frontend-backend communication  
- Deployment on Render  

---

## 🏗️ Tech Stack

| Component | Technology |
|-----------|-------------|
| Frontend | React (JavaScript) |
| Backend | Flask (Python) |
| Database | SQLite |
| APIs | RESTful endpoints |
| Deployment | Render |
| Version Control | Git |

---

## 📁 Project Structure

```text
fitness-studio/
├─ frontend/         # React frontend code
├─ backend/          # Flask backend code
├─ instance/         # configs or environment-specific data
├─ venv/             # Python virtual environment
├─ node_modules/     # React dependencies
├─ .gitignore        
├─ README.md         
└─ package.json      
```

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/amit-bej/fitness-studio.git
cd fitness-studio
```

### 2. Setup the frontend

```bash
cd frontend
npm install
npm start
```

This starts the React frontend (usually on `http://localhost:3000`).

### 3. Setup the backend

```bash
cd backend
python3 -m venv venv        # or python -m venv venv
source venv/bin/activate   # Linux/macOS
# or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

This starts the Flask backend (e.g. `http://localhost:5000`).

### 4. Connect frontend with backend

Ensure your frontend API calls point to the backend URL (e.g. `http://localhost:5000`).

---

## 🧪 Testing

If unit tests are included:

```bash
cd backend
python -m unittest discover
```

---

## ✅ Usage

- Sign up / login as a *member*  
- Admin/trainer can create and manage classes  
- Members can view classes, book classes, and see booking history  
- Fully responsive UI for desktop and mobile  

---

## ⚙️ Notes

- SQLite is used for simplicity; for production, PostgreSQL or MySQL is recommended  
- Authentication is basic; for production, consider JWT
- Error handling and validation can be extended  
- Deployed on **Render** with environment variables configured  

---

## 👤 Author

**Amit Ranjan Bej**  
📧 arb11459@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/amit-r-bej)

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
