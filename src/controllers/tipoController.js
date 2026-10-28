const db = require('../config/db');

//(GET)
const getTipos = async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM tipos ORDER BY id ASC');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los tipos' });
  }
};

//(POST)
const createTipo = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const nuevoTipo = await db.query(
      'INSERT INTO tipos (nombre, descripcion, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
      [nombre, descripcion]
    );
    res.status(201).json({
      mensaje: 'Tipo creado con éxito',
      tipo: nuevoTipo.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el tipo' });
  }
};

//(PUT)
const updateTipo = async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion } = req.body;
  try {
    const tipoActualizado = await db.query(
      'UPDATE tipos SET nombre = $1, descripcion = $2, fecha_actualizacion = NOW() WHERE id = $3 RETURNING *',
      [nombre, descripcion, id]
    );

    if (tipoActualizado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Tipo no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Tipo actualizado con éxito',
      tipo: tipoActualizado.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el tipo' });
  }
};

//(DELETE)
const deleteTipo = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await db.query('DELETE FROM tipos WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Tipo no encontrado' });
    }
    res.status(200).json({ mensaje: 'Tipo eliminado con éxito', tipo: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el tipo' });
  }
};

module.exports = {
  getTipos,
  createTipo,
  updateTipo,
  deleteTipo
};