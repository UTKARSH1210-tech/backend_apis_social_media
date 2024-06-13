const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Include routes
const userRoutes = require('./routes/user');
const discussionRoutes = require('./routes/discussion');
// const postRoutes = require('./routes/post');


app.use('/users', userRoutes);
app.use('/discussions', discussionRoutes);
// app.use('/post', postRoutes)

// Sync database
db.sequelize.sync().then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.log('Error syncing database: ', err);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
