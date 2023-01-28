
import { useLoginMutation } from "../authApiSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../common/utils/Regex"; 

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
              required: 'email is required', 
              pattern: { 
                value: EMAIL_REGEX, 
                message: "please enter a valid email" }
            })}
            autoComplete="off"
          />
          {errors.email?.message && 
            <p className="danger" aria-label="assertive">{errors.email?.message}</p>
          }
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" { ...register("password", { 
              required: 'password is required', 
              pattern: { 
                value: PASSWORD_REGEX, 
                message: "please enter a valid password" }
            })}
            autoComplete="off"
          />
          {errors.password?.message && 
            <p className="danger" aria-label="assertive">{errors.password?.message}</p>
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
