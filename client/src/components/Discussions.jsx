import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Discussions.css';

function Discussions() {
    const [discussions, setDiscussions] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchDiscussions();
    }, []);

    const fetchDiscussions = async () => {
        const response = await axios.get("http://localhost:3001/discussions");
        setDiscussions(response.data);
    };

    const createDiscussion = async () => {
        if (!title) return;
        await axios.post("http://localhost:3001/discussions", { title });
        setTitle("");
        fetchDiscussions();
    };

    const deleteDiscussion = async (id) => {
        await axios.delete(`http://localhost:3001/discussions/${id}`);
        fetchDiscussions();
    };

    return (
        <div>
            <h1>Listes</h1>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nouvelle Liste"
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
