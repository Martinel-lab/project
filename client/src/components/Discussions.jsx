import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Navigation entre les pages
import axios from 'axios'; // Pour les requêtes HTTP
import './Discussions.css'; // Styles du composant
import todoImage from './todo.png'; // Image utilisée dans le composant

function Discussions() {
    const [discussions, setDiscussions] = useState([]); // Stocke les discussions
    const [title, setTitle] = useState(""); // Stocke le titre d'une nouvelle discussion

    useEffect(() => {
        fetchDiscussions(); // Charge les discussions au montage
    }, []);

    const fetchDiscussions = async () => {
        const response = await axios.get("http://localhost:3001/discussions");
        setDiscussions(response.data); // Met à jour la liste des discussions
    };

    const createDiscussion = async () => {
        if (!title) return; // Ne fait rien si le titre est vide
        await axios.post("http://localhost:3001/discussions", { title });
        setTitle(""); // Réinitialise le champ
        fetchDiscussions(); // Recharge les discussions
    };

    const deleteDiscussion = async (id) => {
        await axios.delete(`http://localhost:3001/discussions/${id}`);
        fetchDiscussions(); // Recharge après suppression
    };

    return (
        <div>
            <h1>Listes</h1>
            <img src={todoImage} alt="To-Do Icon" className="todo-image" />
            <div>
                <input
                    type="text"
                    value={title} // Valeur du champ
                    onChange={(e) => setTitle(e.target.value)} // Mise à jour du titre
                    placeholder="Nouvelle Liste" // Indication dans le champ
                />
                <button onClick={createDiscussion}>Créer</button>
            </div>
            <ul>
                {discussions.map((discussion) => (
                    <li key={discussion.iddiscussion}>
                        <Link to={`/discussions/${discussion.iddiscussion}`}>{discussion.title}</Link>
                        <button
                            onClick={() => deleteDiscussion(discussion.iddiscussion)}
                            className="delete-button"
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );    
}

export default Discussions;
