/*
  --- DATA FILE ---
  Restaurant data matching the Better Choices web application.
  Each restaurant includes healthierOption, healthierTip, and topHealthyItems.
*/

const restaurants = [
  {
    id: "1",
    name: "McDonald's",
    slug: "mcdonalds",
    healthyScore: 5,
    recommendedMeal: "Grilled Chicken Sandwich",
    calories: 380,
    description:
      "McDonald's offers some lighter menu options including grilled chicken sandwiches and salads for those looking to make better choices on the go.",
    healthierOption: {
      meal: "Artisan Grilled Chicken Sandwich (no mayo)",
      calories: 300,
    },
    healthierTip: "Skip the mayo and swap fries for a side salad to save over 200 calories.",
    topHealthyItems: [
      { meal: "Side Salad", calories: 15 },
      { meal: "Fruit & Yogurt Parfait", calories: 150 },
      { meal: "Egg McMuffin", calories: 300 },
      { meal: "Artisan Grilled Chicken Sandwich (no mayo)", calories: 300 },
      { meal: "4-Piece Chicken McNuggets", calories: 170 },
      { meal: "Hamburger", calories: 250 },
      { meal: "Apple Slices", calories: 15 },
      { meal: "Southwest Grilled Chicken Salad", calories: 350 },
      { meal: "Filet-O-Fish", calories: 390 },
      { meal: "Grilled Chicken Snack Wrap", calories: 260 },
    ],
  },
  {
    id: "2",
    name: "Subway",
    slug: "subway",
    healthyScore: 8,
    recommendedMeal: "Veggie Delight Sub",
    calories: 230,
    description:
      "Subway lets you build your own sub with fresh vegetables and lean proteins. The Veggie Delight is one of the lowest calorie options available.",
    healthierOption: {
      meal: "Veggie Delight Salad",
      calories: 60,
    },
    healthierTip: "Choose a salad bowl instead of bread, and use vinegar instead of creamy dressings.",
    topHealthyItems: [
      { meal: "Veggie Delight Salad", calories: 60 },
      { meal: "Black Forest Ham Mini Sub", calories: 180 },
      { meal: "Turkey Breast Sub (6-inch)", calories: 280 },
      { meal: "Veggie Delight Sub (6-inch)", calories: 230 },
      { meal: "Oven Roasted Chicken Sub (6-inch)", calories: 320 },
      { meal: "Grilled Chicken Salad", calories: 130 },
      { meal: "Rotisserie Chicken Sub (6-inch)", calories: 350 },
      { meal: "Black Forest Ham Sub (6-inch)", calories: 290 },
      { meal: "Sweet Onion Chicken Teriyaki Sub (6-inch)", calories: 370 },
      { meal: "Turkey Breast & Ham Sub (6-inch)", calories: 290 },
    ],
  },
  {
    id: "3",
    name: "Chipotle",
    slug: "chipotle",
    healthyScore: 7,
    recommendedMeal: "Chicken Burrito Bowl",
    calories: 510,
    description:
      "Chipotle uses real ingredients with no artificial flavors. A burrito bowl without the tortilla saves calories while keeping the flavor.",
    healthierOption: {
      meal: "Chicken Salad Bowl (no sour cream, no cheese)",
      calories: 360,
    },
    healthierTip: "Skip the sour cream and cheese, choose fajita veggies as a topping, and go easy on rice.",
    topHealthyItems: [
      { meal: "Side of Black Beans", calories: 130 },
      { meal: "Chicken Salad (no dressing)", calories: 200 },
      { meal: "Sofritas Salad Bowl", calories: 345 },
      { meal: "Chicken Burrito Bowl (no rice, no cheese)", calories: 360 },
      { meal: "Steak Salad Bowl", calories: 400 },
      { meal: "Kids Chicken Quesadilla", calories: 300 },
      { meal: "Veggie Bowl (no sour cream)", calories: 380 },
      { meal: "Chicken Soft Tacos (3)", calories: 480 },
      { meal: "Side of Fajita Veggies", calories: 20 },
      { meal: "Chips & Fresh Tomato Salsa", calories: 300 },
    ],
  },
  {
    id: "4",
    name: "Chick-fil-A",
    slug: "chick-fil-a",
    healthyScore: 6,
    recommendedMeal: "Grilled Nuggets",
    calories: 140,
    description:
      "Chick-fil-A's grilled nuggets are a protein-packed option with significantly fewer calories than their fried counterpart.",
    healthierOption: {
      meal: "Grilled Nuggets with Superfood Side",
      calories: 220,
    },
    healthierTip: "Pair with the Kale Crunch Side instead of fries, and use the lighter honey mustard sauce.",
    topHealthyItems: [
      { meal: "Grilled Nuggets (8-count)", calories: 140 },
      { meal: "Kale Crunch Side", calories: 120 },
      { meal: "Grilled Chicken Sandwich", calories: 320 },
      { meal: "Market Salad (no dressing)", calories: 340 },
      { meal: "Grilled Chicken Cool Wrap", calories: 350 },
      { meal: "Fruit Cup", calories: 50 },
      { meal: "Chicken Noodle Soup (medium)", calories: 200 },
      { meal: "Egg White Grill", calories: 300 },
      { meal: "Greek Yogurt Parfait", calories: 230 },
      { meal: "Spicy Southwest Salad (no dressing)", calories: 370 },
    ],
  },
  {
    id: "5",
    name: "Wendy's",
    slug: "wendys",
    healthyScore: 5,
    recommendedMeal: "Apple Pecan Salad",
    calories: 340,
    description:
      "Wendy's Apple Pecan Salad combines fresh greens, apple slices, and pecans for a satisfying and nutritious fast food meal.",
    healthierOption: {
      meal: "Apple Pecan Salad (half dressing)",
      calories: 250,
    },
    healthierTip: "Use only half the dressing packet — the full serving adds almost 100 extra calories.",
    topHealthyItems: [
      { meal: "Jr. Hamburger", calories: 250 },
      { meal: "Grilled Chicken Wrap", calories: 270 },
      { meal: "Apple Pecan Salad (half dressing)", calories: 250 },
      { meal: "Parmesan Caesar Salad (no dressing)", calories: 250 },
      { meal: "Plain Baked Potato", calories: 270 },
      { meal: "Chili (small)", calories: 170 },
      { meal: "4-Piece Chicken Nuggets", calories: 170 },
      { meal: "Grilled Chicken Sandwich", calories: 370 },
      { meal: "Apple Bites", calories: 35 },
      { meal: "Southwest Avocado Salad (no dressing)", calories: 380 },
    ],
  },
  {
    id: "6",
    name: "Taco Bell",
    slug: "taco-bell",
    healthyScore: 4,
    recommendedMeal: "Black Bean Crunchwrap",
    calories: 450,
    description:
      "Taco Bell's vegetarian menu offers plant-based protein swaps. The Black Bean Crunchwrap is a filling option with less saturated fat.",
    healthierOption: {
      meal: "Black Bean Soft Taco (Fresco Style)",
      calories: 160,
    },
    healthierTip: "Order 'Fresco Style' to replace cheese and sauces with fresh pico de gallo.",
    topHealthyItems: [
      { meal: "Black Bean Soft Taco (Fresco Style)", calories: 160 },
      { meal: "Chicken Soft Taco (Fresco Style)", calories: 150 },
      { meal: "Bean Burrito (Fresco Style)", calories: 340 },
      { meal: "Veggie Power Bowl", calories: 430 },
      { meal: "Crunchy Taco", calories: 170 },
      { meal: "Chicken Chipotle Melt", calories: 200 },
      { meal: "Black Beans & Rice", calories: 190 },
      { meal: "Soft Taco Supreme (Fresco)", calories: 180 },
      { meal: "Spicy Tostada", calories: 210 },
      { meal: "Mini Chicken Quesadilla", calories: 210 },
    ],
  },
];

export default restaurants;
