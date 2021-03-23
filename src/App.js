import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Modal from './components/Modal';

import api from './services/api';

import './App.css';

export default function App()
{
    useEffect(() =>
    {
        api.get('/repositories').then((response) =>
        {
            if (response.status === 200) {
                setProjects(response.data);
            }
        }).catch((err) =>
        {

        });
    }, []);

    const [title, setTitle] = useState('');
    const [modal, setModal] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const [url, setUrl] = useState('');
    const [techs, setTechs] = useState([]);
    const [projects, setProjects] = useState([]);

    function handleAddProject()
    {
        if (title === '' || url === '') {
            setMessageModal('Campos de preenchimento obrigatório!');
            setModal(true);
            return;
        }

        const data = {
            title,
            url,
            techs: [
                "PHP",
                "NodeJS",
                "ReactJS"
            ]
        };
        api.post('/repositories', data).then((response) =>
        {
            setTitle('');
            setUrl('');

            setProjects([...projects, response.data]);


            setMessageModal('Repositório cadastrado com sucesso...');
            setModal(true);
            setTimeout(() =>
            {
                setModal(false);

            }, 2000);
        }).catch((err) =>
        {

        });
    }

    return (
        <>
            <Header title="Listagem Repositórios" />
            {modal ? <Modal message={messageModal} setViewModal={setModal} /> : ''}

            <div className="container">
                <div className="container-form">
                    <h1>Cadastrar novo repositório</h1>
                    <form className="form">
                        <label htmlFor="title">Nome reposítorio</label>
                        <input type="text" id="title" autoComplete="off" value={title} onChange={(e) => setTitle(e.target.value)} />

                        <label htmlFor="url">URL</label>
                        <input type="text" id="url" autoComplete="off" value={url} onChange={(e) => setUrl(e.target.value)} />

                        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
                    </form>
                </div>
                <div className="container-list">
                    <h1>Repositórios Cadastrados</h1>
                    <div className="list">
                        <ul>
                            {projects.map(project => <li key={project.id}>{project.title}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
