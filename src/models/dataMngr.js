'use strict';
/**
 * Datamngr
 * @param {object}
 * @returns {object} using the model provided
 */
class DataMngr {
  constructor(model) {
    this.model = model;
  }
/**
 * takes id to return object from API
 * @param {number} id 
 * @returns {object}
 */
  read(id) {
    if (id) {
      return this.model.find({_id:id});
    } else {
      return this.model.find({});
    }
  }
/**
 * takes object model
 * @param {object} obj 
 * @returns {object} from creating new item
 */
  create(obj) {
    const doc = new this.model(obj);
    return doc.save();
  }
  /**
   * takes id for the item you want to delete
   * @param {number} id 
   * @returns {object} for the deleted item
   */
  delete(id) {
    return this.model.findByIdAndDelete(id);
  }
/**
 * takes 2 parameters for id and obj
 * @param {number} id for specefic item
 * @param {object} obj contains the update
 * @returns {object} includes the updates
 */
  update(id, obj) {
    return this.model.findByIdAndUpdate(id, obj, {new: true});
  }
}

module.exports = DataMngr;