const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require("./modules/auth/auth.routes");
const { sequelize } = require("./data-access/sequelize");
const coursesRouter = require("./modules/courses/course.routes");
const feedbacksRouter = require('./modules/course_feedback/course_feedback.routes')

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRouter);
app.use('/courses', coursesRouter);
app.use('/feedbacks', feedbacksRouter)

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
});
