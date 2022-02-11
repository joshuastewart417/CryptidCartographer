import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";
import "../index.css"

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const user = { name, imageUrl, email };
      register(user, password)
        .then(() => history.push("/"));
    }
 };

  return (
    <Form className="register_form" onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="name">Name: </Label>
          <Input id="name" required type="text" onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email: </Label>
          <Input id="email" required type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageUrl">Profile Image URL: </Label>
          <Input id="imageUrl" required type="text" onChange={e => setImageUrl(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password: </Label>
          <Input id="password" required type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password: </Label>
          <Input id="confirmPassword" required type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button color="danger">Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
