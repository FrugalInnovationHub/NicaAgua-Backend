class Notification{
    constructor(regions,title,body){
        this._regions = new Set(regions);
        this.body = body;
        this.title = title;
    }

    addRegion(region){
        this._regions.add(region)
    }

    get regions(){return Array.from(this._regions)}
}

module.exports = Notification;