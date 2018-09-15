const people = require('./people.service')
const peopleCustomid = require('./people-customid.service')
const peopleRooms = require('./people-rooms.service')
const peopleRoomsCustomIdSeparator = require('./people-rooms-custom-id-separator.service')
const peopleMaterializedView = require('./people-mv.service')

module.exports = function (app) {
  app.configure(people)
  app.configure(peopleCustomid)
  app.configure(peopleRooms)
  app.configure(peopleRoomsCustomIdSeparator)
  app.configure(peopleMaterializedView)
}
