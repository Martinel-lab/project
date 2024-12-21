CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS discussions (
    iddiscussion INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    idmessage INT AUTO_INCREMENT PRIMARY KEY,
    iddiscussion INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (iddiscussion) REFERENCES discussions(iddiscussion) ON DELETE CASCADE
);

INSERT INTO discussions (title) VALUES ('Liste de courses Auchan');
SET @discussion_id = (SELECT iddiscussion FROM discussions WHERE title = 'Liste de courses Auchan' LIMIT 1);
INSERT INTO messages (iddiscussion, content) VALUES 
(@discussion_id, 'Pain'),
(@discussion_id, 'Lait'),
(@discussion_id, 'Biscuits'),
(@discussion_id, 'Poisson'),
(@discussion_id, 'Legumes');

INSERT INTO discussions (title) VALUES ('Liste de courses Boucherie');
SET @discussion_id_boucherie = (SELECT iddiscussion FROM discussions WHERE title = 'Liste de courses Boucherie' LIMIT 1);
INSERT INTO messages (iddiscussion, content) VALUES 
(@discussion_id_boucherie, 'Poulet'),
(@discussion_id_boucherie, 'Boeuf'),
(@discussion_id_boucherie, 'Agneau'),
(@discussion_id_boucherie, 'Porc'),
(@discussion_id_boucherie, 'Saucisses');