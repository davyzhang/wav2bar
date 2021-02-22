//MIT License - Copyright (c) 2020-2021 Picorims

//USEFUL METHODS USED IN THE PROGRAM. THIS SHOULD ONLY CONTAIN GENERAL NON SPECIFIC METHODS, MANIPULATING ALL SORT OF DATA.


//Random values
//=============

function RandomInt(min, max) {//give a random integer between min and max.
    if (!IsANumber(min)) throw `RandomInt: ${min} is not a valid min value.`;
    if (!IsANumber(max)) throw `RandomInt: ${max} is not a valid max value.`;

    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//taken from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
//This should only be used in non sensitive contexts!
function uuidv4() {//uuid v4 generator.
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }





//Arrays
//======

function MappedArray(array, new_length, min, max) {//function that remaps an array, within the given min and max, to a new length.

    //CHECK VARIABLES
    if ( !IsAnArray(array) )                    throw `MappedArray: ${array} is not an array!`;
    if ( !IsANumber(new_length) )               throw `MappedArray: ${new_length} is not a number!`;
    if ( !IsUndefined(min) && !IsANumber(min) ) throw `MappedArray: ${min} is not a number!`; //min and max are optional and undefined shouldn't
    if ( !IsUndefined(max) && !IsANumber(max) ) throw `MappedArray: ${max} is not a number!`; //trigger any error.
    for (var i=0; i< array.length; i++) {
        if ( IsUndefined(array[i]) ) throw `MappedArray: the value ${i} of the array is undefined or null!`
    }

    //DEFINITIONS
    if ( IsUndefined(min) || IsUndefined(max) ) {//if min or max not specified.
        min = 0;
        max = array.length-1;
    }

    var new_array = [];
    var step = (   (max-min+1) / new_length   ) * new_length / (new_length-1);//range length / new length.
    //Proportionality to one less equal part (* new_length / (new_length-1)) is here so the step goes up to the last
    //value of the array when dividing the range into equal parts. (as the final increment would otherwise stop 1 equal part before the last value).

    var increment = min;//we start a the minimum of the range

    //We want to take at equal distance a "new_length" number of values in the old array, from min to max.
    //In order to know how much we need to increment, we create a step.
    //If the range length is inferior than the new length, step < 1 since we have to get some values multiple times
    //to match the new length.
    //If the range length is superior than the new length, step > 1 since we have to skip some values to match the new length.




    //ARRAY CREATION
    for (var i = 0; i<new_length; i++) {
        if (increment === array.length) {     new_array.push(  array[ parseInt(increment-1) ]  )     }
            else                        {     new_array.push(  array[ parseInt(increment) ]    )     }
        increment += step;
    }

    //RETURN THE NEW ARRAY TO THE CALL
    return new_array;
}


function LinearToLog(array) {//redistributes the indexes in a logarithmic base 10 scale
    if (!IsAnArray(array)) throw `LinearToLog: ${array} is not a valid array.`;

    var length = array.length;
    var base_l = 1/Math.log(length); //so the new index without scaling is always between 0 and 1
    var log_array = [];
    var non_empty_indexes = [];

    //re-index
    for (var i=0; i<length; i++) {
        log_index = Math.floor( Math.log(i+1)*base_l * length ); //pos * scale
        log_array[log_index] = array[i];
        
        //flag non empty indexes at the same time.
        //it can be done here as log_index grow faster than i.
        if (!IsUndefined(log_array[i])) non_empty_indexes.push(i);
    }

    //interpolate empty indexes
    var j = 0;
    //index 0 is defined and is a starting point for the first interpolation (j=0 to j+1 = 1)
    //If "i" was starting to 0 an unecessary increment would be performed, as the loop would think there was an
    //interpolation done before index 0.
    for (var i=1; i<length; i++) {
        if (IsUndefined(log_array[i])) {
            //change of area when the right boundary is bypassed.
            //if (i >= non_empty_indexes[j+1]) j++;

            var interpolate = [ log_array[non_empty_indexes[j]], log_array[non_empty_indexes[j+1]] ]; //values to interpolate between.

            var from = interpolate[0];
            var to = interpolate[1];
            var start_index = non_empty_indexes[j];
            var end_index = non_empty_indexes[j+1];
            var current_index = i;
            log_array[i] = from + ((current_index - start_index) / (end_index - start_index)) * (to - from);
            /*
            interpolation between y1 and y2
            x = current index (i)
            x1 = index of y1
            x2 = index of y2
            k = interpolated value
            k = y1 + (x-x1)/(x2-x1) * (y2-y1);
            k = left_value + current_pos/total_length * distance_between_values
            
            example: interpolate from 5 to 10 on array[5,?,?,10]
            x1 = 0 and x2 = 3 (indexes)
            3-0 = 3 steps to reach 10 from 5.
            (array[0] = 5 + 0/3*5 = 5)
            array[1] = 5 + (1-0)/(3-0) * (10-5) = 5 + (1/3 * 5) = 6,6666...
            array[2] = 5 + (2-0)/(3-0) * (10-5) = 5 + (2/3 * 5) = 8.3333...
            (array[3] = 5 + 3/3 * 5 = 10)
            */
        } else {
            //change of area when the right boundary is bypassed.
            j++;
        }
    }

    return log_array;
}


function InInterval(value, interval, type) {//returns if the given value is in the interval [min,max] included or excluded;
    if (!IsANumber(value)) throw `InInterval: ${value} is not a number`;
    if (!IsAnArray(interval)) throw `InInterval: ${interval} is not a valid array`;
    if (!IsUndefined(interval) && interval[0] > interval[1]) throw `InInterval: ${interval} has values in the wrong order. It must be [min,max], min<max`;
    if (IsUndefined(type) || (type !== "included" && type !== "excluded")) throw `InInterval: ${type} is not a valid type. It must be "included" or "excluded"!`;

    switch (type) {
        case "included":
            return (   (value >= interval[0]) && (value <= interval[1])   );
        case "excluded":
            return (   (value > interval[0])  && (value < interval[1])   );
        default:
            throw `InInterval: ${type} is not a valid interval type! (included or excluded)`
    }
}











//Variable type tests
//===================

function IsANumber(value) {//returns true if the given variable is a number.
    return (typeof value === "number" && !isNaN(value));
}

function IsAnInt(value) {//returns true if the given variable is an integer. (IsANumber() included in it)
    return( (typeof value === "number") && Number.isInteger(value) );
}

function IsAString(value) {//returns true if the given variable is a string.
    return (typeof value === "string");
}

function IsABoolean(value) {//returns true if the given variable is a boolean. (true or false)
    return ( (value === true) || (value === false) )
}

function IsAnArray(value) {//returns true if the given variable is an array.
    return (  (typeof value === "object")    &&    ( (value instanceof Array) || (value instanceof Uint8Array) )  );
}

function IsAnObject(value) {//returns true if the given variable is an Object of any kind.
    return ( (typeof value === 'object') && (value !== null) )
}

function IsUndefined(value) {//returns true if the given variable is either undefined or null.
    return (  (value===undefined) || (value===null)  );
}

function IsAnElement(value) {//returns true if the given variable is an HTML DOM element.
    return value instanceof HTMLElement;
}