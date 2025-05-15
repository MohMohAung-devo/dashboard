import Layout from "./layout";
import { Home } from "./page/dashbaord/Home";
import Product from "./page/product/Product";
import User from "./page/user/User";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "./useContext";
import { AuthProvider } from "./services/authContext";
import Chat from "./page/chat/Chat";
import ProtectRoutes from "./components/ProtectRoutes";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="" element={<ProtectRoutes />}>
              <Route path="" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/user" element={<User />} />
                <Route path="/chat" element={<Chat />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
