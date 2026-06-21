# Student Record Management System — AWS EC2 Deployment

A full-stack CRUD web application built with **Node.js, Express, and MySQL**, deployed on an **AWS EC2** instance.

## Tech Stack
- Backend: Node.js, Express.js
- Database: MySQL
- Frontend: HTML, CSS, JavaScript (vanilla)
- Cloud: AWS EC2 (Ubuntu)

## Features
- Add, view, update, and delete student records (Name, Course, Marks)
- REST API backend (`/api/students`)
- Simple responsive frontend
- Hosted live on AWS EC2

## Project Structure
```
student-management-app/
├── config/db.js          # MySQL connection
├── routes/students.js    # CRUD API routes
├── public/                # Frontend (HTML, CSS, JS)
├── server.js               # Express app entry point
├── schema.sql              # Database schema + sample data
├── .env.example             # Environment variable template
└── package.json
```

---

## How to Run Locally

1. Clone the repo:
   ```
   git clone <your-github-repo-url>
   cd student-management-app
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file (copy from `.env.example`) and fill in your MySQL credentials.
4. Import the database schema:
   ```
   mysql -u root -p < schema.sql
   ```
5. Start the server:
   ```
   npm start
   ```
6. Open `http://localhost:5000` in your browser.

---

## AWS EC2 Deployment Steps

### 1. Launch an EC2 Instance
- Go to AWS Console → EC2 → Launch Instance
- Choose **Ubuntu Server 22.04 LTS** (Free Tier eligible)
- Instance type: **t2.micro**
- Create/select a key pair (.pem file) — download and save it
- Configure **Security Group** to allow inbound rules:
  - SSH (port 22) — My IP
  - Custom TCP (port 5000) — Anywhere (0.0.0.0/0)
- Launch the instance

### 2. Connect to the Instance
```
chmod 400 your-key.pem
ssh -i "your-key.pem" ubuntu@<EC2-Public-IP>
```

### 3. Install Node.js and MySQL on EC2
```
sudo apt update
sudo apt install -y nodejs npm mysql-server
node -v
npm -v
```
(If Node.js version installed is old, use NodeSource setup for a newer version: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -` then `sudo apt install -y nodejs`)

### 4. Configure MySQL on EC2
```
sudo mysql_secure_installation
sudo mysql -u root -p
```
Then run the contents of `schema.sql` to create the database and table.

### 5. Clone the Project on EC2
```
git clone <your-github-repo-url>
cd student-management-app
npm install
```

### 6. Set Environment Variables
```
nano .env
```
Fill in your DB_HOST (use `localhost` since MySQL is on the same EC2), DB_USER, DB_PASSWORD, DB_NAME, PORT.

### 7. Run the App
```
npm start
```
Visit: `http://<EC2-Public-IP>:5000`

### 8. (Optional) Keep App Running Permanently
Use PM2 so the app keeps running even after closing SSH:
```
sudo npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

---

## Live Demo
- **Live URL:** `http://<your-EC2-public-ip>:5000`
- **GitHub Repo:** `<your-github-repo-link>`

## Author
Princce — BCA Final Year
