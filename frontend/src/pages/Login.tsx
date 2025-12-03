import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, KeyRound, Eye, EyeOff,MessageCircle,LoaderCircle} from "lucide-react";
import { authStore } from "../store/authStore";
import type { LoginUser } from "../types";
import AuthImage from "../components/AuthImage";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const {login, isLogin} = authStore()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(formData);

  }
 return ( 
      <main className="min-h-screen grid lg:grid-cols-2">
        { /*left */ }
        <div className="flex flex-col justify-center items-center p-8 sm:p-12">
          <div className="w-full max-w-md space-y-8">
          {/*logo*/}
          <div className="text-center mb-6 pt-12 sm:pt-0">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
               <MessageCircle className="size-8"/>
              </div>
              <h1 className="lg:text-3xl md:text-2xl font-semibold tracking-widest">Log In</h1>
              <p className="text-base-content/70 tracking-wider">Get started log in</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium tracking-wide text-xl">Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="size-5 text-base-content/35"/>
                </div>
                <input type="text" 
                   className="input input-bordered rounded-3xl w-full pl-10" 
                   placeholder="you@email.com"
                   value={formData.email}
                   onChange={((e) => 
                   setFormData({...formData, email:e.target.value}))}/>
              </div>

               <label className="label">
                <span className="label-text font-medium tracking-wide text-xl">Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <KeyRound className="size-5 text-base-content/35"/>
                </div>
                <input type={showPassword ? "text" : "password"} 
                   className="input input-bordered rounded-3xl w-full pl-10"
                   placeholder="********" 
                   value={formData.password}
                   onChange={((e) => 
                   setFormData({...formData, 
                   password: e.target.value}))}/>

                   <button
                     type="button"
                     className="flex items-centar absolute inset-y-0 right-0 p-3"
                     onClick={(() => 
                     setShowPassword(!showPassword))}>
                     {showPassword ? 
                             (<Eye 
                              className="size-5 text-base/40"/>)
                             :
                             (<EyeOff 
                              className="size-5 text-base/40"/>)}
                   </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full rounded-3xl lg:text-lg tracking-wide"
              disabled={isLogin}>
                {isLogin ?
                    (<><LoaderCircle 
                       className="size-4 animate-spin"/></>)
                    :
                    ("Log in")}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
               Don&apos;t have an account?{" "}
               <Link to={"/register"}
                    className="link link-primary">
                      Register
               </Link>
            </p>
          </div>
         </div>
        </div>
         {/*right*/}
         <AuthImage />
      </main>
  );
}
 
export default Login;