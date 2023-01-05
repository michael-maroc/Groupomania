import { useSignUpMutation } from "../authApiSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./register.scss";

const Register = () => {
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const resetErrMsg = () => setErrMsg("");

  const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data) => {
    try {
      await signUp(data)
        .unwrap()
        .then((res) => {
          console.log(res);
          navigate("/");
          reset();
        });
    } catch (err) {
      if (!err?.originalStatus) setErrMsg("No Server Response");
      else if (err.originalStatus === 400) return setErrMsg("Bad credentials");
      else if (err.originalStatus === 401) return setErrMsg("Unauthorized");
      else setErrMsg("Login Failed");
    }
  };

  const content = (
    <section className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errMsg && <p className="errMsg form-error">{errMsg}</p>}
        <h1>Register</h1>

        <label htmlFor="username">Username: </label>
        <input type="username" {...register("username")} onChange={resetErrMsg} />
        <p className="errMsg" aria-label="assertive">
          {errors.username?.message}
        </p>

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
          Already have an account ? <Link to="/">Login</Link>
        </span>
      </form>
    </section>
  );

  return content;
};

export default Register;
