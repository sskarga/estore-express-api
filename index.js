import config from "./config.js";
import db from "./db.sequelize.js";
import app from "./server/app.js";

let server;

// Start
async function assertDatabaseConnectionOk() {
  console.log(`Проверяем подключение к базе данных...`);
  try {
    await db.authenticate();
    console.log('Соединение с БД было успешно установлено.');
  } catch (error) {
    console.log('Невозможно выполнить подключение к БД: ');
    console.log(error.message);
    process.exit(1);
  }
}

const start = async () => {
  try {
    await assertDatabaseConnectionOk();
    server = app.listen(config.PORT, () =>
      console.log(`Server started on port ${config.PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};


// Stop
for (let signal of ["SIGTERM", "SIGINT", "SIGQUIT", "SIGKILL"])
  process.on(signal, () => {
    console.info(`${signal} signal received.`);
    console.log("Closing http server.");
    server.close((err) => {
      console.log("Http server closed.");
      process.exit(err ? 1 : 0);
    });
    // DB close
    console.log("Closing db.");
    db.close();
  });

start();
