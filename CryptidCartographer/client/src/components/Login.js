import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import "../index.css"

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <div className="login_container">
      <div className="login_quote">
        <h4><i>"Mystery creates wonder, and wonder is the basis of man's desire to understand."</i></h4>
        <h5>~ Neil Armstrong</h5>
      </div>
      <Form className="login_form" onSubmit={loginSubmit}> 
        <fieldset>
          <FormGroup>
            <Label for="email">Email: </Label>
            <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password: </Label>
            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button>Login</Button>
          </FormGroup>
          <em>
            Not registered? <Link to="register">Register</Link>
          </em>
        </fieldset>
      </Form>
    </div>
  );
}