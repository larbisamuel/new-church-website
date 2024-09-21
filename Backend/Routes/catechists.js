const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
// const path = require('path');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Get all catechists
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM catechists ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add new minister
router.post('/', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('Received data:', { title, description, imageUrl });

    try {
        const result = await pool.query(
            'INSERT INTO catechists (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
            [title, description, imageUrl]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a catechists profile
router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    try {
        const result = await pool.query(
            'UPDATE catechists SET title = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING *',
            [title, description, imageUrl, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a catechists profile
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM catechists WHERE id = $1', [id]);
        res.send('catechists profile deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
