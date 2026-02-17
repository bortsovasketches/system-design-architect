export const ROSETTA_STONE: Record<string, { analogy: string; explanation: string }> = {
    "Backend": {
        analogy: "The Kitchen",
        explanation: "Where the heavy lifting happens. Cooks (servers) prepare the order using ingredients (data)."
    },
    "Frontend": {
        analogy: "The Dining Room",
        explanation: "What the customer sees and interacts with. It must be clean, well-lit, and comfortable."
    },
    "API": {
        analogy: "The Waiter",
        explanation: "Takes your order (request) to the kitchen and brings back the food (response). You don't go into the kitchen yourself."
    },
    "Database": {
        analogy: "The Pantry / Fridge",
        explanation: "Where ingredients (data) are stored excessively organized so cooks can find them instantly."
    },
    "Load Balancer": {
        analogy: "The Hostess",
        explanation: "Decides which waiter allows you to sit where, ensuring no waiter is overwhelmed."
    },
    "Cache": {
        analogy: "The Buffet Line",
        explanation: "Pre-cooked food ready to grab instantly, so you don't have to wait for the kitchen every time."
    },
    "CDN": {
        analogy: "Delivery Trucks",
        explanation: "Warehouses near your house that stock popular items so you don't have to drive to the main factory."
    },
    "Microservices": {
        analogy: "Food Court Stations",
        explanation: "One station for Pizza, one for Sushi. If the Pizza oven breaks, you can still get Sushi."
    },
    "Monolith": {
        analogy: "One Giant Pot",
        explanation: "Everything is cooked in one pot. Efficient for small meals, but if you burn the soup, you ruin everything."
    }
};

// Helper to normalize keys for case-insensitive matching
export const getAnalogy = (term: string) => {
    const key = Object.keys(ROSETTA_STONE).find(k => k.toLowerCase() === term.toLowerCase());
    return key ? ROSETTA_STONE[key] : null;
};
