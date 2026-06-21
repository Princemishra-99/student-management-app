CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  course VARCHAR(100) NOT NULL,
  marks INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data (optional, helps in demo/screenshots)
INSERT INTO students (name, course, marks) VALUES
('Rahul Sharma', 'BCA', 85),
('Priya Singh', 'BCA', 92),
('Amit Kumar', 'BCA', 78);
