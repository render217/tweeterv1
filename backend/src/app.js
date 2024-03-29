require('express-async-errors');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
// file imports
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const exploreRoutes = require('./routes/explore.routes');
const bookmarkRoutes = require('./routes/bookmark.routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
//
const corsOption = {
    origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:4173'],
    credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/comment', commentRoutes);
//
app.use('/api/v1/explore', exploreRoutes);
app.use('/api/v1/bookmark', bookmarkRoutes);
//
app.use('*', notFound);
app.use(errorHandler);

module.exports = app;
