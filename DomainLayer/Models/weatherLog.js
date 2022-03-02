const Region = require("./region");

class WeatherLogList{
    constructor(object){
        if(object?.dateTime != undefined && isNaN(Date.parse(object.dateTime)))
            throw "Invalid Date";
        if(object?.regions == undefined || !Array.isArray(object.regions))
            throw "Regions cannot be null or empty.";
        this.id = object.id ?? null;
        this.dateTime = new Date(object.dateTime).toJSON() ?? new Date().toJSON() ;
        this.regions = object.regions.map((p)=> Region.RegionCode(p));
    }
        
    toJson(){
        return JSON.parse(JSON.stringify(this));
    }
}

class WeatherLog extends WeatherLogList{
    constructor(object){
        super(object)
        if(!object.userId)
            throw "Invalid UserId";
        if(object?.parameters == undefined || !Array.isArray(object.parameters))
            throw "Parameters cannot be null or empty.";

        this.userId = object.userId; 
        this.parameters =object.parameters.map((p) => new WeatherLogParameter(p));
    }
        
    toJson(){
        return JSON.parse(JSON.stringify(this));
    }
}

class WeatherLogParameter{
    constructor(object){
        if(!object.name)
            throw("Invalid Name")
        if(!object.unit)
            throw("Invalid Unit")
        if(object.value != undefined && typeof(object.value) != 'number')
            throw("Invalid Value")

        this.name = object.name;
        this.unit = object.unit;
        this.value = object?.value ?? 0;
    }
}


module.exports = {WeatherLogList,WeatherLog,WeatherLogParameter}
