const createModel = require('./todos.model');
const createService = require('../src')

module.exports = function () {
  const app = this;

  const options = {
    model: createModel(app),
    paginate: {
      default: 2,
      max: 4
    }
  };

  app.use('/todos', createService(options));
};
