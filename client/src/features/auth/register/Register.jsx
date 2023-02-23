import { useSignUpMutation } from "features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "common/utils/Regex"; 

const Register = () => {
  const navigate = useNavigate();

  const [signUp] = useSignUpMutation();

  const { register, handleSubmit, reset, formState: { errors }} = useForm();

  const onSubmit = async (data) => {
    try {
      await signUp(data).unwrap();
      reset();
      navigate("/");
    } catch (err) { 
      console.log(err) 
    }
  };

  const content = (
    <section className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="username" { ...register("username", { 
              required: true,
              minLength: 4,
              maxLength: 12,
              pattern: USERNAME_REGEX
            })}
            autoComplete="off"
          />
          {errors.username && 
            <span className="danger" aria-label="assertive">Username should contain between 4 to 12 characters</span>
          }
        </div>

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

        <button type="submit">Submit</button>
        <p className="login-link">Already have an account ? <Link to="/">Login</Link></p>
      </form>
    </section>
  );

  return content;
};

export default Register;
