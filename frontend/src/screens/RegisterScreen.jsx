import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useRegisterUserMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [useRegister] = useRegisterUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        let data = await useRegister({ name, password, email }).unwrap()
        navigate("/login")
        toast.success('Registered')
      } else {
        toast.error("password is incorrect")
      }
    } catch (error) {
      toast.error()
    }
  };
  let isLoading = false;
  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={registerHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          Register
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={"/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
