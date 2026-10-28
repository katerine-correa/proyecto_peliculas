const db = require('../config/db');

//(GET)
const getDirectores = async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM directores ORDER BY id ASC');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los directores' });
  }
};

//(POST)
const createDirector = async (req, res) => {
  const { nombres, estado } = req.body;
  try {
    const nuevoDirector = await db.query(
      'INSERT INTO directores (nombres, estado, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
      [nombres, estado]
    );
    res.status(201).json({
      mensaje: 'Director creado con éxito',
      director: nuevoDirector.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el director' });
  }
};

//(PUT)
const updateDirector = async (req, res) => {
  const id = req.params.id;
  const { nombres, estado } = req.body;
  try {
    const directorActualizado = await db.query(
      'UPDATE directores SET nombres = $1, estado = $2, fecha_actualizacion = NOW() WHERE id = $3 RETURNING *',
      [nombres, estado, id]
    );

    if (directorActualizado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Director no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Director actualizado con éxito',
      director: directorActualizado.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el director' });
  }
};

//(DELETE)
const deleteDirector = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await db.query('DELETE FROM directores WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Director no encontrado' });
    }
    res.status(200).json({ mensaje: 'Director eliminado con éxito', director: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el director' });
  }
};

module.exports = {
  getDirectores,
  createDirector,
  updateDirector,
  deleteDirector
};