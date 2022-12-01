import { useLoginMutation } from "../authApiSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    await login(data).then((res) => {
      console.log(res);
      dispatch(setCredentials({ token: res.data }));
      navigate("/home");
    });
  };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>

        <label htmlFor="email">Email: </label>
        <input type="email" {...register("email")} />
        <p className="errMsg">{errors.email?.message}</p>

        <label htmlFor="password">Password: </label>
        <input type="password" {...register("password")} />
        <p className="errMsg">{errors.password?.message}</p>

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
