const pool = '../config/db'; // Importar la conexión a la base de datos
const db = require('../config/db');

//(GET)
const getGeneros = async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM generos ORDER BY id ASC');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los géneros' });
  }
};

//(POST)
const createGenero = async (req, res) => {
  const { nombre, estado, descripcion } = req.body;
  try {
    const nuevoGenero = await db.query(
      'INSERT INTO generos (nombre, estado, descripcion, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
      [nombre, estado, descripcion]
    );
    res.status(201).json({
      mensaje: 'Género creado con éxito',
      genero: nuevoGenero.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el género' });
  }
};

//(PUT)
const updateGenero = async (req, res) => {
  const id = req.params.id;
  const { nombre, estado, descripcion } = req.body;
  try {
    const generoActualizado = await db.query(
      'UPDATE generos SET nombre = $1, estado = $2, descripcion = $3, fecha_actualizacion = NOW() WHERE id = $4 RETURNING *',
      [nombre, estado, descripcion, id]
    );

    if (generoActualizado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Género no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Género actualizado con éxito',
      genero: generoActualizado.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el género' });
  }
};

const deleteGenero = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await db.query('DELETE FROM generos WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Género no encontrado' });
    }
    res.status(200).json({ mensaje: 'Género eliminado con éxito', genero: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el género' });
  }
};

module.exports = {
  getGeneros,
  createGenero,
  updateGenero,
  deleteGenero
};