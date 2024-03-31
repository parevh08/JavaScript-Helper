function generateJsonPatch(obj1, obj2) {
    const patch = [];
  
    // Recursively traverse all properties of the first object
    for (const prop in obj1) {
      if (obj1.hasOwnProperty(prop)) {
        // If the property is missing in the second object, remove it
        if (!obj2.hasOwnProperty(prop)) {
          patch.push({op: "remove", path: `/${prop}`, oldVal: obj1[prop]});
        } else {
          // If the property is an object or array, recursively traverse it
          if (typeof obj1[prop] === "object") {
            patch.push(...generateJsonPatch(obj1[prop], obj2[prop]).map(p => {
              p.path = `/${prop}${p.path}`;
              return p;
            }));
          } else {
            // If the value of the property differs from the value in the second object, update it
            if (obj1[prop] !== obj2[prop]) {
              patch.push({op: "replace", path: `/${prop}`, value: obj2[prop], oldVal: obj1[prop]});
            }
          }
        }
      }
    }
  
    // Traverse properties of the second object that are not in the first object
    for (const prop in obj2) {
      if (obj2.hasOwnProperty(prop) && !obj1.hasOwnProperty(prop)) {
        // Add a new property
        patch.push({op: "add", path: `/${prop}`, value: obj2[prop], oldVal: undefined});
      }
    }
  
    return patch;
  }
  