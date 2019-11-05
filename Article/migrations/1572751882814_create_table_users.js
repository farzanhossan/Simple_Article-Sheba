module.exports = {
    "up": "CREATE TABLE users (user_id INT AUTO_INCREMENT, UNIQUE KEY user_id (user_id), user_name VARCHAR(30) NOT NULL, user_email VARCHAR(30) NOT NULL, user_password VARCHAR(30) NOT NULL )",
    "down": "DROP TABLE users"
}