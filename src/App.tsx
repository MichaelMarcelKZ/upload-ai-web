import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";

import { PromptContextProvider } from "./contexts/PromptContext";

export function App() {

  return (
    <BrowserRouter>
      <PromptContextProvider>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </PromptContextProvider>
    </BrowserRouter>
  )
}
