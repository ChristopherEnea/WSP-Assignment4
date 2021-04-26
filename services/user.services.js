const Name = require('../models/name.model');

const createName = async (body) => new Name(body).save();
const getNames = async (query) => {
  const regex = new RegExp(`.*${query}.*`, 'gm');
  return Name.find({ name: regex }).select('-_id -__v');
};

module.exports = {
  createName,
  getNames,
};
