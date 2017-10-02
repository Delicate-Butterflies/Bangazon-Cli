'use strict';

let activeCustomer = {
  id: null,
  name: null
};

module.exports.setActiveCustomer = (id, name) => {
  activeCustomer.id = id;
  activeCustomer.name = name;
};

module.exports.getActiveCustomer = () => {
  return activeCustomer.id;
};

module.exports.getDetailedActiveCustomer = () => {
  return activeCustomer;
};
