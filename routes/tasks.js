const express = require('express');
const { Task } = require('../models');
const autenticarToken = require('../middleware/authMiddleware');

const router = express.Router();

// Crear tarea
router.post('/', autenticarToken, async (req, res) => {
  const { titulo, descripcion } = req.body;
  const userId = req.user.userId;

  if (!titulo) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  try {
    const nuevaTarea = await Task.create({
      titulo,
      descripcion,
      userId
    });

    res.status(201).json(nuevaTarea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// Obtener todas las tareas del usuario autenticado
router.get('/', autenticarToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const tareas = await Task.findAll({ where: { userId } });
    res.json(tareas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

// Obtener una tarea específica del usuario autenticado
router.get('/:id', autenticarToken, async (req, res) => {
  const userId = req.user.userId;
  const tareaId = req.params.id;

  try {
    const tarea = await Task.findOne({ where: { id: tareaId, userId } });

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(tarea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
});

// Actualizar una tarea 
router.put('/:id', autenticarToken, async (req, res) => {
  const userId = req.user.userId;
  const tareaId = req.params.id;
  const { titulo, descripcion } = req.body;

  try {
    const tarea = await Task.findOne({ where: { id: tareaId, userId } });

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tarea.titulo = titulo ?? tarea.titulo;
    tarea.descripcion = descripcion ?? tarea.descripcion;

    await tarea.save();

    res.json(tarea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

// Eliminar 
router.delete('/:id', autenticarToken, async (req, res) => {
  const userId = req.user.userId;
  const tareaId = req.params.id;

  try {
    const tarea = await Task.findOne({ where: { id: tareaId, userId } });

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await tarea.destroy();

    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});


module.exports = router;
