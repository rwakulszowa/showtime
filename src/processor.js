var processor= { };

processor.digCallTree = function(data) {

    function dig(node) {
        var dug = Array.isArray(node.children) ? node.children.map(dig) : [];
        var flattened = [].concat.apply([], dug);
        flattened.forEach(d => d.splice(0, 0, null));
        return Array.concat([[node.input]], flattened, [[node.output]]);
    }

    return dig(data);
}

processor.digObjectTree = function(obj) {

    function isObject(o) {
        return o !== null &&
            !Array.isArray(o) &&
            typeof o === "object";
    }

    function moveMatrix(mat) {
        mat.forEach(col => col.splice(0, 0, null));
        return mat;
    }

    function dig(obj) {
        var vals = Object.keys(obj).sort().map(k => obj[k]);

        var dug = vals.map(function(v) {
            return isObject(v) ? moveMatrix(dig(v)) : [[v]];
        });

        var flattened = [].concat.apply([], dug);
        return flattened;
    }

    return dig(obj);

}

processor.wrapArray = function(arr) {
    return [arr];
}

export default processor;