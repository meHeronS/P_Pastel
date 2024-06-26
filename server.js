const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '.')));
app.use(bodyParser.json());

// Função auxiliar para leitura de arquivos JSON
const readJSONFile = (filePath, callback) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            callback(err);
        } else {
            callback(null, JSON.parse(data));
        }
    });
};

// Função auxiliar para escrita em arquivos JSON
const writeJSONFile = (filePath, data, callback) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
        if (err) {
            console.error(err);
            callback(err);
        } else {
            callback(null);
        }
    });
};

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para obter usuários
app.get('/api/usuarios', (req, res) => {
    readJSONFile(path.join(__dirname, 'Data', 'usuarios.json'), (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao ler o arquivo de usuários' });
        } else {
            res.json(data);
        }
    });
});

// Rota para adicionar um novo usuário
app.post('/api/usuarios', (req, res) => {
    readJSONFile(path.join(__dirname, 'Data', 'usuarios.json'), (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao ler o arquivo de usuários' });
        } else {
            data.usuarios.push(req.body);
            writeJSONFile(path.join(__dirname, 'Data', 'usuarios.json'), data, (err) => {
                if (err) {
                    res.status(500).json({ error: 'Erro ao salvar o arquivo de usuários' });
                } else {
                    res.status(201).json(req.body);
                }
            });
        }
    });
});

// Rota para obter sabores
app.get('/api/sabores', (req, res) => {
    readJSONFile(path.join(__dirname, 'Data', 'sabores.json'), (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao ler o arquivo de sabores' });
        } else {
            res.json(data);
        }
    });
});

// Rota para atualizar sabores
app.put('/api/sabores', (req, res) => {
    writeJSONFile(path.join(__dirname, 'Data', 'sabores.json'), { sabores: req.body.sabores }, (err) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao salvar o arquivo de sabores' });
        } else {
            res.status(200).json({ message: 'Sabores atualizados com sucesso!' });
        }
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
