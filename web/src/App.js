import React, {useEffect, useState} from 'react';
import api from './services/api';

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

import './global.css';
import './App.css';

function App() {
    const [devs, setDevs] = useState([]);

    async function getDevsFromApi() {
        const response = await api.get('/devs');
        setDevs(response.data);
    }

    useEffect(() => {
        getDevsFromApi();
    }, []);

    async function handleAddDev (devData) {
        const response = await api.post('/devs', { ...devData });

        setDevs((previousDevs) => [
            ...previousDevs,
            response.data
        ]);
    }

    return (
        <div className="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {devs.map((dev) => (
                        <DevItem key={dev._id} dev={dev} />
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;
