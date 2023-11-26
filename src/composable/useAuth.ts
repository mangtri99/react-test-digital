import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import useFetch from "./useFetch";

interface Login {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { $fetch } = useFetch();

  // sign in user
  const login = async (data: Login) => {
    await $fetch("/login", {
      method: "POST",
      data: data
    })
      .then((res) => {
        setToken(res.data.data.token); // set token
        setUser(res.data.data.user); // set user
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    
  };

  // logout user
  const logout = async () => {
    await $fetch("/logout", {
      method: "POST"
    }).then(() => {
      setToken(null);
      setUser(null);
      navigate("/login", { replace: true });
    }).catch((err) => {
      setError(err.response.data.message);
    });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      error,
      login,
      logout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, error, token]
  );
  return {
    ...value
  }
};