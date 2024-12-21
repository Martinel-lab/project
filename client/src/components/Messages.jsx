import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Messages.css';

function Messages() {
    const { id } = useParams(); // Récupère l'ID de la discussion depuis l'URL
    const navigate = useNavigate(); // Permet de naviguer vers une autre page
    const [messages, setMessages] = useState([]); // Stocke les messages
    const [content, setContent] = useState(""); // Stocke le texte du message à ajouter

    useEffect(() => {
        fetchMessages(); // Charge les messages au montage du composant
    }, []);

    const fetchMessages = async () => {
        const response = await axios.get(`http://localhost:3001/discussions/${id}/messages`);
        setMessages(response.data); // Met à jour les messages
    };

    const sendMessage = async () => {
        if (!content) return; // Ne fait rien si le champ est vide
        await axios.post("http://localhost:3001/messages", { iddiscussion: id, content });
        setContent(""); // Réinitialise le champ
        fetchMessages(); // Recharge les messages
    };

    const deleteMessage = async (messageId) => {
        await axios.delete(`http://localhost:3001/messages/${messageId}`);
        fetchMessages(); // Recharge les messages après suppression
    };

    return (
        <div>
            <h1>Liste</h1>
            <button onClick={() => navigate("/")}>Retour</button> {/* Retour à la liste des discussions */}
            <div>
                <input
                    type="text"
                    value={content} // Contenu du message
                    onChange={(e) => setContent(e.target.value)} // Met à jour l'état
                    placeholder="Produit à ajouter" // Texte indicatif
                />
                <button onClick={sendMessage}>Ajouter</button> {/* Ajoute un message */}
            </div>
            <ul>
                {messages.map((message) => (
                    <li key={message.idmessage}> {/* Affiche chaque message */}
                        {message.content}
                        <button onClick={() => deleteMessage(message.idmessage)}>Supprimer</button> {/* Supprime un message */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Messages;