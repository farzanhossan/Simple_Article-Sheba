module.exports = {
    "up": "CREATE TABLE categories (category_id INT AUTO_INCREMENT, UNIQUE KEY category_id (category_id), category_name VARCHAR(30) NOT NULL )",
    "down": "DROP TABLE categories"
}