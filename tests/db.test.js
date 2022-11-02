const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

mongoose.Promise = global.Promise;

class ConnectDB {
  constructor() {
    this.server = MongoMemoryServer.create();
    this.connection = null;
  }

  async connect() {
    this.server = await MongoMemoryServer.create();
    const uri = this.server.getUri();

    this.connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async disconnect() {
    await mongoose.disconnect();
    await this.server.stop();
  }

  async cleanup() {
    const models = Object.keys(this.connection.models);
    const promises = [];

    models.map((model) => {
      promises.push(this.connection.models[model].deleteMany({}));
    });

    await Promise.all(promises);
  }
}

module.exports.connect = async () => {
  const dbconnect = new ConnectDB();
  await dbconnect.connect();
  return dbconnect;
};
