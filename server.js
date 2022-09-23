const { app } = require('./app');

// Utils
const { initModels } = require('./Models/initModels');
const { db } = require('./Utils/util.database');

const startServer = async () => {
  try {
    // Database authenticated
    await db.authenticate();

    // Establish the relations between models
    initModels();
    // Database synced
    await db.sync();

    // Set server to listen
    const PORT = 4000;

    app.listen(PORT, () => {
      console.log('Express app running!');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
