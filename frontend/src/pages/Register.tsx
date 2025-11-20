import { useState } from "react"
import { Link } from "react-router-dom";
import { authStore } from "../store/authStore";
import { Mail, UserRound, MessageCircle, KeyRound, Eye, EyeOff, LoaderCircle } from "lucide-react";
import AuthImage from "../components/AuthImage";
import  toast  from "react-hot-toast";
import type { RegisterUser}  from "../types"



const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ formData, setFormData ] = useState<RegisterUser>({
    fullName: "" ,
    email: "" ,
    password: "" ,
  });

  const { register, isRegister} = authStore();

  const validForm = () => {

    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validSuccess = validForm();

    if (validSuccess === true) register(formData)
  }


 return ( 
      <main className="min-h-screen grid lg:grid-cols-2">
         { /*left */ }
         <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
              {/*logo*/}
              <div className="text-center mb-6">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="size-8" />
                  </div>
                  <h1 className="lg:text-3xl md:text-2xl font-semibold tracking-widest">Create Account</h1>
                  <p className="text-base-content/70 tracking-wider">Get started free account</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium tracking-wide text-xl">Full Name
                    </span>
                   </label>
                   <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserRound className="size-5 text-base-content/35"/>
                    </div>
                    <input type="text"
                       className="input input-bordered rounded-3xl w-full pl-10" 
                       placeholder="John Doe"
                       value={formData.fullName}
                       onChange={(e) => setFormData({...formData, fullName:e.target.value})}/>
                   </div>

                     <label className="label">
                    <span className="label-text font-medium tracking-wide text-xl">Email
                    </span>
                   </label>
                   <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="size-5 text-base-content/35"/>
                    </div>
                    <input type="text"
                       className="input input-bordered rounded-3xl w-full pl-10" 
                       placeholder="you@email.com"
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email:e.target.value})}/>
                   </div>

                     <label className="label">
                    <span className="label-text font-medium tracking-wide text-xl">Password
                    </span>
                   </label>
                   <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="size-5 text-base-content/35"/>
                    </div>
                    <input type= {showPassword ? "text" : "password"}
                       className="input input-bordered rounded-3xl w-full pl-10" 
                       placeholder="********"
                       value={formData.password}
                       onChange={(e) => setFormData({...formData, password:e.target.value})}/>

                       <button 
                         type="button"
                         className="flex items-centar absolute inset-y-0 right-0 p-3"
                         onClick={(() => setShowPassword(!showPassword))}>
                         
                         {showPassword ? 
                                 (<Eye className="size-5 text-base/40"/>) 
                                 : 
                                 (<EyeOff className="size-5 text-base/40"/>)}
                       </button>
                   </div>   
                 </div>
                 <button
                    type= "submit" 
                    className="btn btn-primary w-full rounded-3xl lg:text-lg tracking-wide"
                    disabled={isRegister}>
                    {isRegister 
                       ? (
                           <>
                             <LoaderCircle className="size-4 animate-spin"/>
                           </>
                         ) 
                       : (
                           "Create Account"
                         )}   
                 </button>
              </form> 

              <div className="text-center">
                <p className="text-base-content/60">
                  Already have an account{" "}
                  <Link to={"/login"} className="link link-primary">
                       Log in
                  </Link>
                </p>
              </div>
            </div> 
         </div>
           {/* right */}
           <AuthImage />
      </main>
  );
}
 
export default Register;