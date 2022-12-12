const Region = require("./region");

/**A simplified version of WeatherLog to be displayed as a list.
 * It is meant to be lightweight therefore its simplified
 * @todo Make it an extension of Base class
*/
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
        
    toJson = () =>JSON.parse(JSON.stringify(this));
}

/**A more detailed version of WeatherLogList
 * It is a complete version of a Log. 
 * @todo Make it an extension of Base class
*/
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
        
    toJson = ()=>JSON.parse(JSON.stringify(this));
}

/**This class is the implementation of a Log Parameter 
 * @todo Make it an extension of Base class
*/
class WeatherLogParameter{
    constructor(object){
        if(!object.name)
            throw("Invalid Name")
        if(!object.unit)
            throw("Invalid Unit")
        /**Parameter Name for example: Temperature or Humidity */
        this.name = object.name;
        /**Parameter Unit for example: °C or mm */
        this.unit = object.unit;
        /**Parameter Value for example 10 or 22*/
        this.value = object?.value ?? 0;
    }
}

/**This is an internal class only  used to group Logs by Day 
 * @todo Make it an extension of Base class
*/
class WeatherDayLog{
    constructor(object){
        if(object == null)
            throw("Invalid List of WeatherLogs");
        /**Log Id */
        this.id = object.id ?? null;
        /**Log Date of creation */
        this.date = object.dateTime;
        /**Log DateTime of creation */
        this.dateTime = new Date(object.dateTime);
        /**List of Logs generated in that Date */
        this.logs = object.logs;
        /**Regions*/
        this.regions = [ Region.RegionCode("*****")];
    }
    toJson(){
        return JSON.parse(JSON.stringify(this));
    }
}

/**Internal function to group logs by Date */
function groupByDateTime (xs) {
    var teste = xs.reduce(function(rv, x) {
     var date = new Date(x.dateTime).toISOString().substring(0,10);
     (rv[date] = rv[date] || []).push(x);
      return Object.assign(rv);
    }, {});
    teste = Object.entries(teste).map(e => ({dateTime:e[0],logs :e[1]}));
    return teste.map(r => new WeatherDayLog(r).toJson()); 
  };

module.exports = {WeatherLogList,WeatherLog,WeatherLogParameter,groupByDateTime}
