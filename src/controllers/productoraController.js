const db = require('../config/db');

//(GET)
const getProductoras = async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM productoras ORDER BY id ASC');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las productoras' });
  }
};

//(POST)
const createProductora = async (req, res) => {
  const { nombre, estado } = req.body;
  try {
    const nuevaProductora = await db.query(
      'INSERT INTO productoras (nombre, estado, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
      [nombre, estado]
    );
    res.status(201).json({
      mensaje: 'Productora creada con éxito',
      productora: nuevaProductora.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la productora' });
  }
};

//(PUT)
const updateProductora = async (req, res) => {
  const id = req.params.id;
  const { nombre, estado } = req.body;
  try {
    const productoraActualizada = await db.query(
      'UPDATE productoras SET nombre = $1, estado = $2, fecha_actualizacion = NOW() WHERE id = $3 RETURNING *',
      [nombre, estado, id]
    );

    if (productoraActualizada.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Productora no encontrada' });
    }

    res.status(200).json({
      mensaje: 'Productora actualizada con éxito',
      productora: productoraActualizada.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la productora' });
  }
};

//(DELETE)
const deleteProductora = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await db.query('DELETE FROM productoras WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Productora no encontrada' });
    }
    res.status(200).json({ mensaje: 'Productora eliminada con éxito', productora: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la productora' });
  }
};

module.exports = {
  getProductoras,
  createProductora,
  updateProductora,
  deleteProductora
};