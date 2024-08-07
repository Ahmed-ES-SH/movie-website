import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth_context } from "../context/Auth_Context";
import Loading from "../components/Loading";
import Cookie from "universal-cookie";

const Sign_in = () => {
  const { signin, loading, setloading, currentuser } = Auth_context();
  const navegate = useNavigate();
  const cookie = new Cookie();
  const input_style =
    "  w-[90%] p-2 bg-secendary  rounded-2xl focus:bg-secendary outline-transparent     foucs:outline  invalid:outline-red-400 valid:outline-main_blue text-white text-[19px] duration-300   ";
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [cheaked, setcheaked] = useState(false);

  const handelchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    if (cheaked) {
      window.localStorage.setItem("user", JSON.stringify(form));
      cookie.set("user", currentuser.accessToken);
    }
    try {
      setloading(true);
      await signin(form.email, form.password);

      navegate("/");
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  return (
    <div className='parent my-5 bg-[url("https://flixtv.volkovdesign.com/main/img/bg.jpg")] flex items-center justify-center h-screen  w-full bg-cover bg-no-repeat bg-center  '>
      {loading && <Loading />}
      <div
        style={{
          boxShadow:
            "0px 1px 6px 0px #2f80ed , 0px 1px 6px 0px #2f80ed , 0px 1px 6px 0px #2f80ed,0px 1px 6px 0px #2f80ed",
        }}
        className="container shadow-main_blue pb-3 shadow-sm  px-15 m-auto w-[32%] max-lg:w-[98%] rounded-md h-fit bg-main "
      >
        <div className="logo  w-full">
          <img
            className="p-2 pt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/movie-app-82b85.appspot.com/o/logo.svg?alt=media&token=14f085bd-4e84-4041-9393-06e1d438fad5"
            alt="logo"
          />
        </div>
        <div className="input-faild w-full   flex items-center justify-center  flex-col gap-5  pt-6 ">
          <form
            onSubmit={handelsubmit}
            className="input-faild w-full   flex items-center justify-center  flex-col gap-5  "
          >
            <input
              required
              className={`${input_style}`}
              type="email"
              placeholder="Email"
              name="email"
              onChange={handelchange}
            />

            <input
              required
              minLength={4}
              className={`${input_style}`}
              type="password"
              placeholder="password"
              name="password"
              onChange={handelchange}
            />
            <div className="check_box p-3 flex items-center self-start ml-3 gap-3 ">
              <input
                onChange={(e) => setcheaked(e.target.checked)}
                className=" duration-300"
                type="checkbox"
                name="remember"
                id="remember"
              />

              <label htmlFor="remember" className="text-white">
                Remember me
              </label>
            </div>
            <input
              className={`w-[90%] p-2 rounded-2xl hover:bg-white hover:text-black duration-300 text-[20px] cursor-pointer  bg-main_blue text-white`}
              type="submit"
              value={"sign in"}
            />
          </form>
          <h1 className="text-white text-[20px]  p-1">or</h1>
          <div className="social flex items-center gap-5">
            <div className="icon-facbook duration-300 cursor-pointer hover:bg-white hover:text-black py-2 px-10 text-white rounded-xl bg-[#3b5999]">
              <i className="fa-brands fa-facebook-f"></i>
            </div>
            <div className="icon-twitter duration-300 cursor-pointer hover:bg-white hover:text-black py-2 px-10 text-white rounded-xl bg-[#1da1f2]">
              <i className="fa-brands fa-twitter"></i>
            </div>
            <div className="icon-Gmail duration-300 cursor-pointer hover:bg-white hover:text-black py-2 px-10 text-white rounded-xl bg-[#df4a32]">
              <i className="fa-brands fa-google"></i>
            </div>
          </div>
          <h1 className="text-white">
            Dont have an acount ?
            <Link className="text-blue-800 px-1 " to="/signup">
              Sign up !
            </Link>
          </h1>
          <Link to={"/email"} className="text-blue-800">
            Forget password ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sign_in;
