import { useSignUpMutation } from "../authApiSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./register.scss";
import { usernameCheck, emailCheck, passwordCheck } from "../../../common/utils/Regex"; 

const Register = () => {
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const resetErrMsg = () => setErrMsg("");

  const { register, handleSubmit, reset,formState: { errors }} = useForm();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (data) => {
    try {
      await signUp(data).unwrap();
      reset();
      navigate("/");
    } catch (err) {
      if (!err?.originalStatus) setErrMsg("No Server Response");
      else if (err.originalStatus === 400) setErrMsg("All fields are required");
      else if (err.originalStatus === 409) setErrMsg("You can't use this email");
      else setErrMsg("Login Failed");
    }
  };

  const content = (
    <section className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errMsg && <p className="errMsg form-error">{errMsg}</p>}
        <h1>Register</h1>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="username" { ...register("username", { 
              required: 'username is required', 
              pattern: { value: usernameCheck, message: "please enter a valid username" }
            })}
            onChange={resetErrMsg}
            autoComplete="off"
          />
          {errors.username?.message && 
            <p className="errMsg" aria-label="assertive">{errors.username?.message}</p>
          }
        </div>

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
        <span>
          Already have an account ? <Link to="/">Login</Link>
        </span>
      </form>
    </section>
  );

  return content;
};

export default Register;
