/*
  --- DATA FILE ---
  Restaurant data stored in a separate file for reusability.
  Each restaurant has an id for navigation and a description for the details screen.
*/

const restaurants = [
  {
    id: "1",
    name: "McDonald's",
    healthyScore: 5,
    recommendedMeal: "Grilled Chicken Sandwich",
    calories: 380,
    description:
      "McDonald's offers some lighter menu options including grilled chicken sandwiches and salads for those looking to make better choices on the go.",
  },
  {
    id: "2",
    name: "Subway",
    healthyScore: 8,
    recommendedMeal: "Veggie Delight Sub",
    calories: 230,
    description:
      "Subway lets you build your own sub with fresh vegetables and lean proteins. The Veggie Delight is one of the lowest calorie options available.",
  },
  {
    id: "3",
    name: "Chipotle",
    healthyScore: 7,
    recommendedMeal: "Chicken Burrito Bowl",
    calories: 510,
    description:
      "Chipotle uses real ingredients with no artificial flavors. A burrito bowl without the tortilla saves calories while keeping the flavor.",
  },
  {
    id: "4",
    name: "Chick-fil-A",
    healthyScore: 6,
    recommendedMeal: "Grilled Nuggets",
    calories: 140,
    description:
      "Chick-fil-A's grilled nuggets are a protein-packed option with significantly fewer calories than their fried counterpart.",
  },
  {
    id: "5",
    name: "Wendy's",
    healthyScore: 5,
    recommendedMeal: "Apple Pecan Salad",
    calories: 340,
    description:
      "Wendy's Apple Pecan Salad combines fresh greens, apple slices, and pecans for a satisfying and nutritious fast food meal.",
  },
  {
    id: "6",
    name: "Taco Bell",
    healthyScore: 4,
    recommendedMeal: "Black Bean Crunchwrap",
    calories: 450,
    description:
      "Taco Bell's vegetarian menu offers plant-based protein swaps. The Black Bean Crunchwrap is a filling option with less saturated fat.",
  },
];

export default restaurants;
