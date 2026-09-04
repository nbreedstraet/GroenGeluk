import { createBrowserRouter, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/navigation";
import Home from "./pages/Home/home";
import About from "./pages/About/about";
import News from "./pages/News/news";
import NewsDetail from "./pages/News/news-detail";
import Calendar from "./pages/Calendar/calendar";
import EventDetail from "./pages/Calendar/event-detail";
import CalendarSubmit from "./pages/Calendar/submitPage";
import Werking from "./pages/Werking/werking";
import Support from "./pages/Support/support";
import Volunteers from "./pages/Volunteers/volunteers";
import SubmitPage from "./pages/News/submitPage";
import Cause from "./pages/Cause/cause";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navigation />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "news", element: <News /> },
      { path: "news/:id", element: <NewsDetail /> },
      { path: "calendar", element: <Calendar /> },
      { path: "calendar/:id", element: <EventDetail /> },
      { path: "calendar/submit62026042", element: <CalendarSubmit /> },
      { path: "werking", element: <Werking /> },
      { path: "support", element: <Support /> },
      { path: "volunteers", element: <Volunteers /> },
      { path: "news/submit24062026", element: <SubmitPage /> },
      { path: "cause", element: <Cause /> },
    ],
  },
]);

export default router;
