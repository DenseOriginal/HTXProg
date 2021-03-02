import { action } from "./action";
import { elever } from "./elever";
import { famous } from "./famous";
import { place } from "./place";
import { things } from "./thing";
import { udsagnord } from "./udsagnord";

export const registry = new Map<string, string[]>([
    ["famous", famous],
    ["udsagnsord", udsagnord],
    ["action", action],
    ["place", place],
    ["thing", things],
    ["elev", elever],
]);

