module.exports = function (app) {
  const models = app.get('models')
  const TodoModel = models.loadSchema('Todo', {
    table_name: 'todos',
    fields: {
      id: 'int',
      text: {
        type: 'text',
        rule: {
          required: true,
          validators: [
            {
              validator: function (value) { return value !== 'forbidden' },
              message: '`forbidden` is a reserved word'
            }
          ]
        }
      },
      complete: 'boolean',
      teams: {
        type: 'map',
        typeDef: '<text, text>'
      },
      games: {
        type: 'list',
        typeDef: '<text>'
      },
      winners: {
        type: 'set',
        typeDef: '<text>'
      },
      uuid: 'uuid',
      timeuuid: 'timeuuid'
    },
    key: ['id'],
    custom_indexes: [
      {
        on: 'text',
        using: 'org.apache.cassandra.index.sasi.SASIIndex',
        options: {}
      },
      {
        on: 'complete',
        using: 'org.apache.cassandra.index.sasi.SASIIndex',
        options: {}
      }
    ],
    options: {
      // timestamps: true
      timestamps: {
        createdAt: 'created_at', // defaults to createdAt
        updatedAt: 'updated_at' // defaults to updatedAt
      },
      // versions: true
      versions: {
        key: '_version' // defaults to __v
      }
    },
    filters: {
      completed: builder => {
        builder.where('complete', '=', true)
      }
    },
    before_save: function (instance, options) {
      instance.complete = false
      return true
    },
    after_save: function (instance, options) {
      return true
    },
    before_update: function (queryObject, updateValues, options, id) {
      updateValues.complete = true
      return true
    },
    after_update: function (queryObject, updateValues, options, id) {
      return true
    },
    before_delete: function (queryObject, options, id) {
      return true
    },
    after_delete: function (queryObject, options, id) {
      return true
    }
  }, function (err) {
    if (err) throw err
  })

  TodoModel.syncDB(function (err) {
    if (err) throw err
  })

  return TodoModel
}
