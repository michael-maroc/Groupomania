
import { useLoginMutation } from "../authApiSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.scss";
import { emailCheck, passwordCheck } from "../../../common/utils/Regex"; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const resetErrMsg = () => setErrMsg("");

  const { register, handleSubmit, reset, formState: { errors }} = useForm();
  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
        dispatch(setCredentials({ token: result.accessToken }));
        reset();
        navigate("/home");
    } catch (err) {
      if (!err?.originalStatus) setErrMsg("No Server Response");
      else if (err.originalStatus === 400) return setErrMsg("All fields are required");
      else if (err.originalStatus === 401) return setErrMsg("Unauthorized");
      else setErrMsg("Login Failed");
    }
  };

  const content = (
    <section className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errMsg && <p className="errMsg form-error">{errMsg}</p>}
        <h1>Login</h1>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" { ...register("email", { 
              required: 'email is required', 
              pattern: { value: emailCheck, message: "please enter a valid email" }
            })}
            onChange={resetErrMsg}
            autoComplete="off"
          />
          {errors.email?.message && 
            <p className="errMsg" aria-label="assertive">{errors.email?.message}</p>
          }
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" { ...register("password", { 
              required: 'password is required', 
              pattern: { value: passwordCheck, message: "please enter a valid password" }
            })}
            onChange={resetErrMsg}
            autoComplete="off"
          />
          {errors.password?.message &&
            <p className="errMsg" aria-label="assertive">{errors.password?.message}</p>
          }
        </div>

        <button type="submit">Submit</button>
        <span>Need an account ? <Link to="/register">Sign Up</Link></span>
      </form>
    </section>
  );

  return content;
};

export default Login;
