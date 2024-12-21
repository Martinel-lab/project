const express = require('express');
const server = express();
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "test",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DB_NAME || "mydatabase",
    port: process.env.DB_PORT || 3306,
});

server.use(express.json());
server.use(cors());

// Créer une discussion
server.post("/discussions", (req, res) => {
    const { title } = req.body;
    const sql = "INSERT INTO discussions (title) VALUES (?)";

    db.query(sql, [title], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, title });
    });
});

// Récupérer toutes les discussions
server.get("/discussions", (req, res) => {
    const sql = "SELECT * FROM discussions";

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// Ajouter un message à une discussion
server.post("/messages", (req, res) => {
    const { iddiscussion, content } = req.body;
    const sql = "INSERT INTO messages (iddiscussion, content) VALUES (?, ?)";

    db.query(sql, [iddiscussion, content], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, iddiscussion, content });
    });
});

// Récupérer les messages d'une discussion
server.get("/discussions/:id/messages", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM messages WHERE iddiscussion = ?";

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// Supprimer un message
server.delete("/messages/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM messages WHERE idmessage = ?";

    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// Supprimer une discussion et ses messages
server.delete("/discussions/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM discussions WHERE iddiscussion = ?";

    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

server.listen(3001, () => {
    console.log("Server running on port 3001");
});
