import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductAddScreen from "./screens/Admin/ProductAddScreen";

function App() {
  return (

    <>
    <Header/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen/>} />
            <Route path="/admin/addproduct" element ={<ProductAddScreen/>} />
          </Routes>
        </Container>
      </main>

      <ToastContainer />
      <Footer/>
    </>
  );
}

export default App;
