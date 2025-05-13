import app from './app';
import config from './config/config';
import dbConnect from './lib/dbConnect';

// Connect to database and start server
dbConnect()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
