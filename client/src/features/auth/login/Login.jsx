import { useLoginMutation } from "../authApiSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const onInputChanged = () => setErrMsg("");

  const schema = yup.object({
    email: yup.string().email(),
    password: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    await login(data).then((res) => {
      if (res.error?.status === 400) return setErrMsg(res.error.data.message);
      else if (res.error?.status === 401) return setErrMsg(res.error.data.message);
      else if (res.error?.status === 500) return setErrMsg("Server error");
      else {
        dispatch(setCredentials({ token: res.data.accessToken }));
        navigate("/home");
        reset();
      }
    });
  };

  const content = (
    <section className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errMsg && <p className="errMsg form-error">{errMsg}</p>}
        <h1>Login</h1>

        <label htmlFor="email">Email: </label>
        <input type="email" {...register("email")} onChange={onInputChanged} />
        <p className="errMsg" aria-label="assertive">
          {errors.email?.message}
        </p>

        <label htmlFor="password">Password: </label>
        <input type="password" {...register("password")} onChange={onInputChanged} />
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
