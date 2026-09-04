import { Suspense } from "react";
import { RouterProvider } from "react-router";
import router from "./router";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
