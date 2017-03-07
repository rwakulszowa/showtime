var analyzer = { };

//TODO: clean this mess up -> just useful helpers / factories
analyzer.hasKeys = function(o, keys) {
    var keys = keys.sort();
    var oKeys = Object.keys(o);
    return keys.every(k => oKeys.indexOf(k) != -1);
}

analyzer.isObject = function(o) {
    return o !== null &&
        !Array.isArray(o) &&
        typeof o === "object";
}

analyzer.isNumericArray = function(data) {
    return Array.isArray(data) &&
        data.every(d => Number.isFinite(d));
}

analyzer.isXYArray = function(data) {
    if (Array.isArray(data) && data.length > 0) {
        return data.every(d => analyzer.hasKeys(d, ["x", "y"]));
    } else {
        return false;
    }
}

analyzer.isXYZArray = function(data) {
    if (Array.isArray(data) && data.length > 0) {
        return data.every(d => analyzer.hasKeys(d, ["x", "y", "z"]));
    } else {
        return false;
    }
}

analyzer.isXYZWArray = function(data) {
    if (Array.isArray(data) && data.length > 0) {
        return data.every(d => analyzer.hasKeys(d, ["x", "y", "z", "w"]));
    } else {
        return false;
    }
}

analyzer.isNodeTree = function(data) {
    return analyzer.isObject(data) &&
        analyzer.hasKeys(data, ["value"]);
}

analyzer.isNodesEdges = function(data) {
    return analyzer.isObject(data) &&
        analyzer.hasKeys(data, ["nodes", "links"]) &&
        [data.nodes, data.links].every(d => Array.isArray(d));
}

export default analyzer;
