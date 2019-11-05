module.exports = {
    "up": "CREATE TABLE articles (article_id INT AUTO_INCREMENT, UNIQUE KEY article_id (article_id), article_title VARCHAR(100) NOT NULL, article_description VARCHAR(500) NOT NULL, category_id VARCHAR(30) NOT NULL, user_id VARCHAR(30) NOT NULL )",
    "down": "DROP TABLE articles"
}