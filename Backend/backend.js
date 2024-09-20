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
app.use(express.json());




// Import routes
const latestNewsRoutes = require('./Routes/latestNews');
const upcomingEventsRoutes = require('./Routes/upcomingEvents');
const birthdaysRoutes = require('./Routes/birthdays');
const weddingsRoutes = require('./Routes/weddings');
const nextWeekServiceRoutes = require('./Routes/nextWeekService');
const churchActivitiesRoutes = require('./Routes/churchActivities');
const eventTableRoutes = require('./Routes/eventTable');
const ministersRoutes = require('./Routes/leadersProfiles');
const newsRoutes = require('./Routes/news');
const galleryRoutes = require('./Routes/gallery');

// Use routes
app.use('/api/latest-news', latestNewsRoutes);
app.use('/api/upcoming-events', upcomingEventsRoutes);
app.use('/api/birthdays', birthdaysRoutes);
app.use('/api/weddings', weddingsRoutes);
app.use('/api/next-week-service', nextWeekServiceRoutes);
app.use('/api/church-activities', churchActivitiesRoutes);
app.use('/api/event-table', eventTableRoutes);
app.use('/api/ministers', ministersRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/uploads', express.static('uploads'));






// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
