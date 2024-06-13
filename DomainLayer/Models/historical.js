const { Base } = require("../Utils/propertyValidator");

const validMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
class Historical extends Base{
    constructor(obj){
        super();
        this.community = Object.keys(obj)[0];
        this.month = Object.keys(obj[this.community])[0];
        if(validMonths.indexOf(this.month) == -1) throw Error("Invalid Month");
        const measures = obj[this.community][this.month];
        this.data = Object.keys(measures).map((key) => new HistoricalMeasures(key,measures[key]));
        this.data.sort((a,b) => a.year-b.year);
    }
}

class HistoricalMeasures{
    constructor(key,value){
        if(isNaN(key)) throw Error("Invalid Year");
        if(isNaN(value)) throw Error("Invalid Value");
        this.year = parseInt(key);
        this.value = parseInt(value);
    }
}

module.exports = Historical;