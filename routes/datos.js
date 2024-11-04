// routes/datos.js
const express = require('express');
const db = require('../db/db'); // Importa la conexión de base de datos

const router = express.Router();

// Crear un nuevo registro
router.post('/', (req, res) => {
  const { nombres, paterno, materno, telefono, email, code } = req.body;
  const createDate = new Date();
  const query = 'INSERT INTO datos (nombres, paterno, materno, telefono, email, code, createDate) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [nombres, paterno, materno, telefono, email, code, createDate], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, ...req.body, createDate });
  });
});

// Obtener todos los registros
router.get('/', (req, res) => {
  const query = 'SELECT * FROM datos';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Obtener un registro por ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM datos WHERE id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json(results[0]);
  });
});


//obtener un registro por medio del campo COde 
router.get('/code/:code', (req, res) => {
    const query = "SELECT * FROM datos WHERE code = ?";
    
    db.query(query, [req.params.code], (err, results) =>{
        if(err){
            return res.status(500),json({error: err.message});
        }
        if(results.length === 0){
            return res.status(404).json({message: 'Registro no encontrado'});
        }
        res.json(results[0])
    });
});

// Actualizar un registro
router.put('/:id', (req, res) => {
  const { nombres, paterno, materno, telefono, email, code } = req.body;
  const query = 'UPDATE datos SET nombres = ?, paterno = ?, materno = ?, telefono = ?, email = ?, code = ? WHERE id = ?';
  
  db.query(query, [nombres, paterno, materno, telefono, email, code, req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json({ message: 'Registro actualizado correctamente' });
  });
});

// Eliminar un registro
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM datos WHERE id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json({ message: 'Registro eliminado correctamente' });
  });
});

module.exports = router;
