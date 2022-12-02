import { useSignUpMutation } from "../authApiSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const onInputChanged = () => setErrMsg("");

  const schema = yup.object({
    username: yup.string().min(4).max(12).required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(12),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data) => {
    await signUp(data).then((res) => {
      if (res.error?.originalStatus === 400) return setErrMsg(res.error.data.message);
      else if (res.error?.originalStatus === 401) return setErrMsg(res.error.data.message);
      else if (res.error?.originalStatus === 409) return setErrMsg(res.error.data.message);
      else if (res.error?.originalStatus === 500) return setErrMsg("Username should contain between 4 and 12 characters");
      else {
        // navigate("/");
        // reset();
        console.log("All good");
      }
    });
  };

  const content = (
    <section className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errMsg && <p className="errMsg form-error">{errMsg}</p>}
        <h1>Register</h1>

        <label htmlFor="username">Username: </label>
        <input type="username" {...register("username")} onChange={onInputChanged} />
        <p className="errMsg" aria-label="assertive">
          {errors.username?.message}
        </p>

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
          Already have an account ? <Link to="/">Login</Link>
        </span>
      </form>
    </section>
  );

  return content;
};

export default Register;
