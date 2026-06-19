/*
  --- DATA: Healthier Suggestions ---
  Maps common food keywords to healthier alternatives.
  Used by the HealthierSuggestion component to provide
  context-aware recommendations based on logged meals.
*/

const suggestions = [
  {
    keywords: ["burger", "hamburger", "cheeseburger"],
    alternative: "Turkey burger on a lettuce wrap",
    method: "Grill instead of frying. Skip the cheese or use a thin slice.",
    savings: 200,
  },
  {
    keywords: ["pizza"],
    alternative: "Cauliflower crust pizza with veggie toppings",
    method: "Use thin crust, load with vegetables, and limit cheese.",
    savings: 180,
  },
  {
    keywords: ["fries", "french fries"],
    alternative: "Baked sweet potato wedges",
    method: "Bake at 400°F instead of deep frying. Season with herbs.",
    savings: 150,
  },
  {
    keywords: ["soda", "cola", "coke", "pepsi"],
    alternative: "Sparkling water with lemon",
    method: "Replace sugary drinks with flavored sparkling water.",
    savings: 140,
  },
  {
    keywords: ["fried chicken", "chicken nuggets", "nuggets"],
    alternative: "Grilled chicken breast or baked chicken tenders",
    method: "Bake with panko coating instead of deep frying.",
    savings: 170,
  },
  {
    keywords: ["taco", "burrito"],
    alternative: "Lettuce wrap taco with lean protein",
    method: "Use lettuce instead of tortilla. Choose grilled over fried.",
    savings: 120,
  },
  {
    keywords: ["sandwich", "sub"],
    alternative: "Open-faced sandwich on whole grain bread",
    method: "Use one slice of bread. Add extra veggies, less mayo.",
    savings: 130,
  },
  {
    keywords: ["pasta", "spaghetti", "noodles"],
    alternative: "Zucchini noodles or whole wheat pasta",
    method: "Use spiralized vegetables. Choose tomato sauce over cream.",
    savings: 160,
  },
  {
    keywords: ["ice cream"],
    alternative: "Frozen Greek yogurt or banana nice cream",
    method: "Blend frozen bananas for a creamy texture without added sugar.",
    savings: 150,
  },
  {
    keywords: ["donut", "doughnut", "pastry", "muffin"],
    alternative: "Whole grain toast with almond butter",
    method: "Choose whole grains and natural fats over refined sugar.",
    savings: 180,
  },
  {
    keywords: ["chips", "nachos"],
    alternative: "Air-popped popcorn or baked veggie chips",
    method: "Season popcorn with nutritional yeast instead of butter.",
    savings: 120,
  },
  {
    keywords: ["candy", "chocolate", "sweets"],
    alternative: "Dark chocolate (70%+) or fresh berries",
    method: "Choose small portions of dark chocolate for antioxidants.",
    savings: 100,
  },
  {
    keywords: ["pancake", "waffle"],
    alternative: "Oat flour pancakes with fresh fruit",
    method: "Use oats and banana as a base. Top with berries, not syrup.",
    savings: 140,
  },
  {
    keywords: ["rice", "fried rice"],
    alternative: "Cauliflower rice or brown rice",
    method: "Pulse cauliflower in a food processor. Stir-fry with veggies.",
    savings: 110,
  },
  {
    keywords: ["steak", "beef"],
    alternative: "Grilled salmon or lean sirloin",
    method: "Choose lean cuts. Grill instead of pan-frying in butter.",
    savings: 130,
  },
];

// Find the best suggestion for a food item
export const getSuggestion = (foodItem) => {
  const lower = foodItem.toLowerCase();
  const match = suggestions.find((s) =>
    s.keywords.some((keyword) => lower.includes(keyword))
  );

  if (match) return match;

  // Default suggestion when no specific match is found
  return {
    alternative: "A lighter version with more vegetables",
    method: "Grill or bake instead of frying. Add a side salad.",
    savings: 100,
  };
};
