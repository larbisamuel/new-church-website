const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const port = process.env.SERVER_PORT; 

app.use(cors());
app.use(bodyParser.json());



// Import routes
const latestNewsRoutes = require('./Routes/latestNews');
const announcementRoutes = require('./Routes/announcement');
const churchActivitiesRoutes = require('./Routes/churchActivities');
const eventTableRoutes = require('./Routes/eventTable');
const leadersProfilesRoutes = require('./Routes/leadersProfiles');
const newsRoutes = require('./Routes/news');
const galleryRoutes = require('./Routes/gallery');

// Use routes
app.use('/api/latest-news', latestNewsRoutes);
app.use('/api/announcement', announcementRoutes);
app.use('/api/church-activities', churchActivitiesRoutes);
app.use('/api/event-table', eventTableRoutes);
app.use('/api/leaders-profiles', leadersProfilesRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);





// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
