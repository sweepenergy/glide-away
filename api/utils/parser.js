exports.filterStatus = (obj) => {
    return Object.keys(obj)
        .filter((key) => key !== "status")
        .reduce((o, key) => {
            o[key] = obj[key];
            return o;
        }, {});
};
