import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Dashboard } from "./pages/Dashboard";
import { RecipeFinderPage } from "./pages/RecipeFinderPage";
import { ComparisonPage } from "./pages/ComparisonPage";
import { NutritionTipsPage } from "./pages/NutritionTipsPage";
import { FoodAnalyzerPage } from "./pages/FoodAnalyzerPage";
import { SeasonalFoodsPage } from "./pages/SeasonalFoodsPage";
import { FoodSwapsPage } from "./pages/FoodSwapsPage";
import { DiseasePrecautionsPage } from "./pages/DiseasePrecautionsPage";
import { VitaminSourcesPage } from "./pages/VitaminSourcesPage";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: LoginPage },
      { path: "profile", Component: ProfilePage },
      { path: "dashboard", Component: Dashboard },
      { path: "recipes", Component: RecipeFinderPage },
      { path: "comparison", Component: ComparisonPage },
      { path: "tips", Component: NutritionTipsPage },
      { path: "analyzer", Component: FoodAnalyzerPage },
      { path: "seasonal", Component: SeasonalFoodsPage },
      { path: "swaps", Component: FoodSwapsPage },
      { path: "health", Component: DiseasePrecautionsPage },
      { path: "vitamins", Component: VitaminSourcesPage },
    ],
  },
]);