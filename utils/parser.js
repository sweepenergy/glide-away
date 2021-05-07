exports.filterStatus = (obj) => {
    if (obj.status !== "ok") return obj;
    
    return Object.keys(obj)
        .filter((key) => key !== "status")
        .reduce((o, key) => {
            o[key] = obj[key];
            return o;
        }, {});
};

exports.removeTimestamps = (arr) => {
    return arr.map((idx) => idx[1]);
}