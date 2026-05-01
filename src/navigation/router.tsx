import { createBrowserRouter } from 'react-router-dom'
import App from '../app/App.tsx'
import GamePage from "../features/game/GamePage.tsx";
import AboutPage from "../features/about/AboutPage.tsx";
import ExplanationPage from "../features/explanation/ExplanationPage.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: GamePage },
      { path: 'about', Component: AboutPage },
      { path: 'explanation', Component: ExplanationPage },
    ]
  }
])
