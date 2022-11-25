import { useSignUpMutation } from "../authApiSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";

const Register = () => {
  const navigate = useNavigate();

  const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data) => {
    await signUp(data).then((res) => console.log(res));
    navigate("/");
  };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="register">
      <div className="register-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Register</h1>

          <label htmlFor="username">Username: </label>
          <input type="username" {...register("username")} />
          <p className="errMsg">{errors.username?.message}</p>

          <label htmlFor="email">Email: </label>
          <input type="email" {...register("email")} />
          <p className="errMsg">{errors.email?.message}</p>

          <label htmlFor="password">Password: </label>
          <input type="password" {...register("password")} />
          <p className="errMsg">{errors.password?.message}</p>

          <button type="submit">Submit</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </section>
  );

  return content;
};

export default Register;
