import { useLoginMutation } from "../authApiSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.scss";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const resetErrMsg = () => setErrMsg("");

  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap()
        dispatch(setCredentials({ token: result.accessToken }));
        navigate("/home");
        reset();
    } catch (err) {
      if (!err?.originalStatus) setErrMsg("No Server Response");
      else if (err.originalStatus === 400) return setErrMsg("Bad credentials");
      else if (err.originalStatus === 401) return setErrMsg("Unauthorized");
      else setErrMsg("Login Failed");
    }
  };

  const content = (
    <section className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errMsg && <p className="errMsg form-error">{errMsg}</p>}
        <h1>Login</h1>

        <label htmlFor="email">Email: </label>
        <input type="email" {...register("email")} onChange={resetErrMsg} />
        <p className="errMsg" aria-label="assertive">
          {errors.email?.message}
        </p>

        <label htmlFor="password">Password: </label>
        <input type="password" {...register("password")} onChange={resetErrMsg} />
        <p className="errMsg" aria-label="assertive">
          {errors.password?.message}
        </p>

        <button type="submit">Submit</button>
        <span>
          Need an account ? <Link to="/register">Sign Up</Link>
        </span>
      </form>
    </section>
  );

  return content;
};

export default Login;
