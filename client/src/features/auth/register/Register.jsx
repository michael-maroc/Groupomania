import { useSignUpMutation } from "../authApiSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "../../../common/utils/Regex"; 

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
              required: 'username is required', 
              pattern: { 
                value: USERNAME_REGEX, 
                message: "please enter a valid username" 
              }
            })}
            autoComplete="off"
          />
          {errors.username?.message && 
            <p className="danger" aria-label="assertive">{errors.username?.message}</p>
          }
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" { ...register("email", { 
              required: 'email is required', 
              pattern: { 
                value: EMAIL_REGEX, 
                message: "please enter a valid email" 
              }
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
                message: "please enter a valid password" 
              } 
            })}
            autoComplete="off"
          />
          {errors.password?.message && 
            <p className="danger" aria-label="assertive">{errors.password?.message}</p>
          }
        </div>

        <button type="submit">Submit</button>
        <span>Already have an account ? <Link to="/">Login</Link></span>
      </form>
    </section>
  );

  return content;
};

export default Register;
