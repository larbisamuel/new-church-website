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

// Get all latest news
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM latest_news ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add new latest news with image
router.post('/', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('Received data:', { title, description, imageUrl });

    try {
        const result = await pool.query(
            'INSERT INTO latest_news (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
            [title, description, imageUrl]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a news item, with image upload
router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    try {
        const result = await pool.query(
            'UPDATE latest_news SET title = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING *',
            [title, description, imageUrl, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a latest news item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM latest_news WHERE id = $1', [id]);
        res.send('News item deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;






// const express = require('express');
// const router = express.Router();
// const pool = require('../db'); // Import the database connection


// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// // Get all latest news
// router.get('/', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM latest_news ORDER BY created_at DESC');
//         res.json(result.rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // Add new latest news
// router.post('/', async (req, res) => {
//     const { title, description, image } = req.body;
//     try {
//         const result = await pool.query(
//             'INSERT INTO latest_news (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
//             [title, description, image]
//         );
//         res.json(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // router.post('/', upload.single('image'), async (req, res) => {
// //     const { title, description } = req.body;
// //     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

// //     try {
// //         const result = await pool.query(
// //             'INSERT INTO latest_news (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
// //             [title, description, imageUrl]
// //         );
// //         res.json(result.rows[0]);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send('Server error');
// //     }
// // });


// // Update a latest news item
// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, description, image } = req.body;
//     try {
//         const result = await pool.query(
//             'UPDATE latest_news SET title = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING *',
//             [title, description, image, id]
//         );
//         res.json(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // router.put('/:id', upload.single('image'), async (req, res) => {
// //     const { id } = req.params;
// //     const { title, description } = req.body;
// //     const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image_url; // Keep the old image if no new one is uploaded

// //     try {
// //         const result = await pool.query(
// //             'UPDATE latest_news SET title = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING *',
// //             [title, description, imageUrl, id]
// //         );
// //         res.json(result.rows[0]);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send('Server error');
// //     }
// // });
// // Delete a latest news item
// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await pool.query('DELETE FROM latest_news WHERE id = $1', [id]);
//         res.send('News item deleted');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router; 
