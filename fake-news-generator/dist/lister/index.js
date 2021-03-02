"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registry = void 0;
const action_1 = require("./action");
const elever_1 = require("./elever");
const famous_1 = require("./famous");
const place_1 = require("./place");
const thing_1 = require("./thing");
const udsagnord_1 = require("./udsagnord");
exports.registry = new Map([
    ["famous", famous_1.famous],
    ["udsagnsord", udsagnord_1.udsagnord],
    ["action", action_1.action],
    ["place", place_1.place],
    ["thing", thing_1.things],
    ["elev", elever_1.elever],
]);
