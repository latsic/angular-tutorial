
//import deepEqual = require("deep-equal");

const deepEquals = require("deep-equal");

export class DeepEqual {

  equals(instance1: any, instance2: any): boolean {
    return deepEquals(instance1, instance2);
  }
}