const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all leaders profiles
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM leaders_profiles ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add new leader profile
router.post('/', async (req, res) => {
    const { name, role, description, image_url } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO leaders_profiles (name, role, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, role, description, image_url]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a leader profile
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, role, description, image_url } = req.body;
    try {
        const result = await pool.query(
            'UPDATE leaders_profiles SET name = $1, role = $2, description = $3, image_url = $4 WHERE id = $5 RETURNING *',
            [name, role, description, image_url, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a leader profile
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM leaders_profiles WHERE id = $1', [id]);
        res.send('Leader profile deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
