const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
// const path = require('path');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'image', maxCount: 1 }, // Single image upload
    { name: 'additionalImages', maxCount: 1000 } // Allow up to 1000 additional images
]);

module.exports = upload;


router.get('/top3-l', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM news ORDER BY created_at DESC LIMIT 3' );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



// Get a specific news item by ID with the additional images news items
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the news item
        const result = await pool.query('SELECT * FROM news WHERE id = $1', [id]);
        const newsItem = result.rows[0];

        // Fetch related images
        const additionalImagesResult = await pool.query('SELECT image_url, description FROM news_images WHERE news_id = $1', [id]);
        newsItem.additional_images = additionalImagesResult.rows;

        // Send the full news item with additional images
        res.json(newsItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



router.get('/title', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get all news
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM news ORDER BY created_at ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



// Add new news with image
router.post('/upload-news', upload, async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.files['image'][0]; // Main image
        const imageUrl = `/uploads/${image.filename}`;

        const result = await pool.query(
            'INSERT INTO news (title, description, image_url) VALUES ($1, $2, $3) RETURNING id',
            [title, description, imageUrl]
        );
        const newsId = result.rows[0].id;

        // Handle additional images
        if (req.files && req.files.additionalImages) {
            for (let i = 0; i < req.files.additionalImages.length; i++) {
                const additionalImage = req.files.additionalImages[i];
                const additionalImageUrl = `/uploads/${additionalImage.filename}`;
                const additionalDescription = req.body.additionalDescriptions[i];

                await pool.query(
                    'INSERT INTO news_images (news_id, image_url, description) VALUES ($1, $2, $3)',
                    [newsId, additionalImageUrl, additionalDescription]
                );
            }
        }

        res.status(200).send('News item created successfully with images');
    } catch (error) {
        console.error('Error uploading news item:', error);
        res.status(500).send('Error uploading news item');
    }
});






router.put('/:id', upload, async (req, res) => {
    try {
        const { title, description } = req.body;
        const images = req.files; // Access files uploaded
        
        if (!images || !images['image'] || images['image'].length === 0) {
            return res.status(400).send('No images uploaded');
        }

        // Handle saving the main image
        const mainImage = images['image'][0];
        const mainImageUrl = `/uploads/${mainImage.filename}`;

        // Update the database with the main image and additional images
        await pool.query(
            'UPDATE news SET title = $1, description = $2, image_url = $3 WHERE id = $4',
            [title, description, mainImageUrl, req.params.id]
        );

        // Handle additional images (if they exist)
        if (images['additionalImages']) {
            const newsId = req.params.id;
            for (const file of images['additionalImages']) {
                const additionalImageUrl = `/uploads/${file.filename}`;
                await pool.query(
                    'INSERT INTO news_images (news_id, image_url) VALUES ($1, $2)',
                    [newsId, additionalImageUrl]
                );
            }
        }

        res.status(200).send('News item updated successfully with images');
    } catch (error) {
        console.error('Error updating news with images:', error);
        res.status(500).send('Error updating news item');
    }
});




// Delete a news item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM news WHERE id = $1', [id]);
        res.send('News item deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
