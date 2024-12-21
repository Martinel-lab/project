import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Messages.css';

function Messages() {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const response = await axios.get(`http://localhost:3001/discussions/${id}/messages`);
        setMessages(response.data);
    };

    const sendMessage = async () => {
        if (!content) return;
        await axios.post("http://localhost:3001/messages", { iddiscussion: id, content });
        setContent("");
        fetchMessages();
    };

    const deleteMessage = async (messageId) => {
        await axios.delete(`http://localhost:3001/messages/${messageId}`);
        fetchMessages();
    };

    return (
        <div>
            <h1>Liste</h1>
            <div>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Produit à ajouter"
                />
                <button onClick={sendMessage}>Ajouter</button>
            </div>
            <ul>
                {messages.map((message) => (
                    <li key={message.idmessage}>
                        {message.content}
                        <button onClick={() => deleteMessage(message.idmessage)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Messages;
