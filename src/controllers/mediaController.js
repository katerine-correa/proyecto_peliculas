const db = require('../config/db');

// 1. Obtener todas las medias (GET)
const getMedia = async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM media ORDER BY id ASC');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los contenidos multimedia' });
  }
};

// 2. Crear una nueva media (POST)
const createMedia = async (req, res) => {
  const { 
    serial, 
    titulo, 
    sinopsis, 
    url, 
    imagen, 
    ano_estreno, 
    genero_id, 
    director_id, 
    productora_id, 
    tipo_id 
  } = req.body;

  try {
    const nuevaMedia = await db.query(
      `INSERT INTO media (serial, titulo, sinopsis, url_pelicula, imagen_portada, anio_estreno, genero_id, director_id, productora_id, tipo_id, fecha_creacion, fecha_actualizacion) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) RETURNING *`,
      [serial, titulo, sinopsis, url, imagen, ano_estreno, genero_id, director_id, productora_id, tipo_id]
    );

    res.status(201).json({
      mensaje: 'Contenido multimedia creado con éxito',
      media: nuevaMedia.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el contenido multimedia' });
  }
};

// 3. Actualizar una media (PUT)
const updateMedia = async (req, res) => {
  const id = req.params.id;
  const { 
    serial, 
    titulo, 
    sinopsis, 
    url, 
    imagen, 
    ano_estreno, 
    genero_id, 
    director_id, 
    productora_id, 
    tipo_id 
  } = req.body;

  try {
    const mediaActualizada = await db.query(
      `UPDATE media SET serial = $1, titulo = $2, sinopsis = $3, url_pelicula = $4, imagen_portada = $5, anio_estreno = $6, 
       genero_id = $7, director_id = $8, productora_id = $9, tipo_id = $10, fecha_actualizacion = NOW() 
       WHERE id = $11 RETURNING *`,
      [serial, titulo, sinopsis, url, imagen, ano_estreno, genero_id, director_id, productora_id, tipo_id, id]
    );

    if (mediaActualizada.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Contenido multimedia no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Contenido multimedia actualizado con éxito',
      media: mediaActualizada.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el contenido multimedia' });
  }
};

module.exports = {
  getMedia,
  createMedia,
  updateMedia
};