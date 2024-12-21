import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Discussions from './components/Discussions';
import Messages from './components/Messages';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Discussions />} />
                    <Route path="/discussions/:id" element={<Messages />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
