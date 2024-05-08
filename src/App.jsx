import { Provider } from 'react-redux';
import store from './redux/store';
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import CustomNavbar from './components/CustomNavbar'
import Home from './views/Home'
import Footer from './components/Footer'
import Login from './views/Login'
// import Contact from './views/Contact'
import Register from './views/Register'
import ProductDetails from './views/ProductDetails'
import Cart from './views/Cart'
import Admin from './views/adminDashboard/Admin'
import Contact from './views/Contact'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './views/userDashboard/User'
import Vegetables from './views/Vegetables'
import Fruits from './views/Fruits'
import Farmer from './views/farmerDashboard/Farmer'
import Wishlist from './views/Wishlist';
import Checkout from './views/Checkout';
import OrderDetails from './views/OrderDetails';

function App() {

  return (
    <Provider store={store}>
      <Container>
        <CustomNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product-details/:productId' element={<ProductDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path="/cart/*" element={<Cart />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/farmer/*" element={<Farmer/>} />
          <Route path="/vegetables" element={<Vegetables />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/checkout/*" element={<Checkout/>} />
          <Route path="/order-details" element={<OrderDetails/>} />




        </Routes>
      </Container>
      <Footer />
      <ToastContainer />
    </Provider>
  )
}

export default App
