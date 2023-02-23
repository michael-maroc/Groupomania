import { useLoginMutation } from "features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { EMAIL_REGEX, PASSWORD_REGEX } from "common/utils/Regex"; 
// import Banner from "/images/icon-left-font-monochrome-black.svg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  
  const { register, handleSubmit, reset, formState: { errors }} = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
        dispatch(setCredentials({ token: result.accessToken }));
        reset();
        navigate("/home");
    } catch (err) { 
      console.log(err) 
    }
  };

  const content = (
    <section className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" { ...register("email", { 
              required: true, 
              pattern: EMAIL_REGEX
            })}
            autoComplete="off"
          />
          {errors.email && 
            <span className="danger" aria-label="assertive">Please input a valid email address</span>
          }
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" { ...register("password", { 
              required: 'password is required', 
              minLength: 4,
              maxLength: 15,
              pattern: PASSWORD_REGEX
            })}
            autoComplete="off"
          />
          {errors.password && 
            <span className="danger" aria-label="assertive">Password should contain between 4 to 15 characters</span>
          }
        </div>

        <button type="submit" value="Submit">Submit</button>
        <p className="register-link">Need an account ? <Link to="/register">Sign Up</Link></p>
      </form>
    </section>
  );

  return content;
};

export default Login;
