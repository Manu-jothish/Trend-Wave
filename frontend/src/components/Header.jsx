import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const { userData } = useSelector((state) => state.auth);
  
  const {cartItems}=useSelector((state)=>state.cart)
  console.log(cartItems);
  

  const logoutHandler = async () => {};

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            TREND WAVE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={"/cart"}>
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </Badge>
                )}
              </Nav.Link>

              {userData ? (
                <>
                  <NavDropdown title={userData.name} id="username">
                    <NavDropdown.Item as={Link} to={"/profile"}>
                      Profile
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={logoutHandler}>
                      logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              )}

              {userData && userData.isAdmin && (
                <>
                  <NavDropdown title={"Admin"} id="adminname">
                    <NavDropdown.Item as={Link} to={"/admin/productlist"}>
                      Products
                    </NavDropdown.Item>

                    <NavDropdown.Item as={Link} to={"/admin/orderlist"}>
                      Orders
                    </NavDropdown.Item>

                    <NavDropdown.Item as={Link} to={"/admin/userlist"}>
                      Users
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
