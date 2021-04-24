const Name = require('../models/name.model');

const getNames = async (query) => Name.find(query).select('-_id -__v');
const createName = async (body) => new Name(body).save();
const getName = async (id) => Name.findOne({ ssn: id }).select('-_id -__v');
const replaceName = async (id, body) => Name.findOneAndReplace({ ssn: id }, body);
const modifyName = async (id, body) => Name.findOneAndUpdate({ ssn: id }, body, { new: true }).select('-_id -__v');
const deleteName = async (id) => Name.deleteOne({ ssn: id });
const deleteNames = async () => Name.deleteMany({});

module.exports = {
  getNames,
  createName,
  getName,
  replaceName,
  modifyName,
  deleteName,
  deleteNames,
};
