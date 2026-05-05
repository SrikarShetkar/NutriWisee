import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./pages/SplashScreen";
import { LandingPageV2 } from "./pages/LandingPageV2";
import { LoginPage } from "./pages/LoginPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
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
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/landing",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPageV2 },
    ],
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { path: "login", Component: LoginPage },
      { path: "signup", Component: LoginPage }, // Reuse LoginPage for signup
      { path: "admin/login", Component: AdminLoginPage },
      {
        path: "admin/dashboard",
        Component: () => (
          <AdminProtectedRoute>
            <AdminDashboardPage />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "profile",
        Component: () => (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        Component: () => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "recipes",
        Component: () => (
          <ProtectedRoute>
            <RecipeFinderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "comparison",
        Component: () => (
          <ProtectedRoute>
            <ComparisonPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "tips",
        Component: () => (
          <ProtectedRoute>
            <NutritionTipsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "analyzer",
        Component: () => (
          <ProtectedRoute>
            <FoodAnalyzerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "seasonal",
        Component: () => (
          <ProtectedRoute>
            <SeasonalFoodsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "swaps",
        Component: () => (
          <ProtectedRoute>
            <FoodSwapsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "health",
        Component: () => (
          <ProtectedRoute>
            <DiseasePrecautionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "vitamins",
        Component: () => (
          <ProtectedRoute>
            <VitaminSourcesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);