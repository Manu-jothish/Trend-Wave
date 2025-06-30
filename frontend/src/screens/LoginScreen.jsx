import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser] = useLoginUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password }).unwrap();
      await dispatch(setCredentials({ ...data }));
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
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

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
