import NodeCache from "node-cache";

const cache = new NodeCache({
    stdTTL: 60, // Cache 60 seconds
    checkperiod: 120 // Check expired cache every 2 minutes
});

export default cache;