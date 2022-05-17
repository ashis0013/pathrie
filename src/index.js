"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleDict = exports.setDictionary = exports.getValue = void 0;
const root = {
    route: '',
    label: '',
    onFind: (val) => val,
    children: []
};
function insert(node, routePaths, label, index, onFindCallback = null) {
    if (index >= routePaths.length)
        return;
    const childIndex = node.children.map((node) => node.route).indexOf(routePaths[index]);
    if (childIndex < 0) {
        node.children.push({
            route: routePaths[index],
            label: index === routePaths.length - 1 ? label : '',
            onFind: onFindCallback !== null && onFindCallback !== void 0 ? onFindCallback : ((val) => val),
            children: []
        });
    }
    insert(node.children[childIndex < 0 ? node.children.length - 1 : childIndex], routePaths, label, index + 1, onFindCallback);
}
function query(node, routePaths, index) {
    const childIndex = node.children.map((node) => node.route).indexOf(routePaths[index]);
    return (index !== routePaths.length - 1 && childIndex >= 0) ? query(node.children[childIndex], routePaths, index + 1) : node.onFind(node.label);
}
function getValue(path, onFindCallback = null) {
    var _a;
    if (((_a = root.children) === null || _a === void 0 ? void 0 : _a.length) === 0) {
        Object.keys(appDict).forEach((key) => insert(root, key.split('/'), appDict[key], 0, onFindCallback));
    }
    return query(root, `${path}/`.split('/'), 0);
}
exports.getValue = getValue;
function setDictionary(dict) {
    appDict = dict;
}
exports.setDictionary = setDictionary;
let appDict = {};
exports.sampleDict = {
    '/workspace': 'workspaces-tools',
    '/app/workspaces-tools': 'workspaces-tools',
    '/insights': 'insights'
};
