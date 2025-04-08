import Layout from "./layout";
import { Home } from "./page/dashbaord/Home";

import { Product } from "./page/product/Product";
import User from "./page/user/User";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "./useContext";
import Chat from "./page/chat/Chat";
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/user" element={<User />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
