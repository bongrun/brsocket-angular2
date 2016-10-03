import * as _ from 'lodash';

export class ObjectHelper {
    public static setPropertiesObject(object:any, properties:Object) {
        if (typeof object === "function") {
            object = new object();
        }
        for (var property in properties) {
            if (typeof object['_types'] !== "undefined" && object['_types'][property]) {
                if (_.isArray(properties[property])) {
                    object[property] = [];
                    properties[property].forEach(function(item){
                        object[property].push(ObjectHelper.setPropertiesObject(object['_types'][property], item));
                    });
                } else {
                    object[property] = ObjectHelper.setPropertiesObject(object['_types'][property], properties[property]);
                }
            } else {
                object[property] = properties[property];
            }
        }
        return object;
    }
}