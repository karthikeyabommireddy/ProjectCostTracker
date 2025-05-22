import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Group,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser, selectUser } from "../features/authSlice";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email
      }));
      
      showNotification({
        title: "Signup Successful",
        message: "Welcome aboard!",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Signup Failed",
        message: error.message,
        color: "red",
      });
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email
      }));
      
      showNotification({
        title: "Login Successful",
        message: "Welcome back!",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Login Failed",
        message: error.message,
        color: "red",
      });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    showNotification({
      title: "Logged Out",
      message: "See you soon!",
      color: "blue",
    });
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Project Tracker Auth</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
          mt="md"
        />
        <Group grow mt="lg">
          <Button onClick={handleLogin} color="teal">
            Login
          </Button>
          <Button onClick={handleSignup} color="blue">
            Signup
          </Button>
        </Group>

        {user && (
          <Button color="red" fullWidth mt="lg" onClick={handleLogout}>
            Logout ({user.email})
          </Button>
        )}
      </Paper>
    </Container>
  );
}

export default AuthForm;
