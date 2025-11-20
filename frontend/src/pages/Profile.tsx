import {UserRound, Mail, Camera, SquarePen } from "lucide-react";
import { useState} from "react";
import { authStore } from "../store/authStore";


const Profile = () => {

 const [ selectedImg, setSelectedImg ] = useState<string | null>(null);
 
 const { authUser, isUpdateProfile, updateProfile } = authStore();
 const [ updateFullName, setUpdateFullName ] = useState(authUser?.fullName || "");


 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
   if(!file) return;

   const raeder = new FileReader();

   raeder.readAsDataURL(file);

   raeder.onload = async () => {
     const base64  = raeder.result;

     setSelectedImg(base64 as string)
     await updateProfile({ profilePic: base64 as string});
 
   }
 }

 const handleUpdateFullName = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    
    await updateProfile({ fullName: updateFullName })
   
 }

 return ( 
     <main className="h-screen pt-28">
        <div className="max-w-3xl  mx-auto p-14 py-8 ">
          <div className="bg-base-200 rounded-2xl p-6 space-y-8 text-center">
            <h1 className="font-semibold text-3xl letter -tracking-tight ">Profile</h1>
            <p className="mt-3 -tracking-tight">Your information</p>

            <div className="relative flex items-center rounded-full p-0.3 w-24 h-24 mx-auto bg-primary">
             
              <img src={selectedImg  || authUser?.profilePic  || "/avatar.png" } 
                  alt="Profile"
                  className="object-cover rounded-full w-24 h-24"/>

              <label htmlFor="avatar-upload" 
                     className={
                      `transition-all duration-200 cursor-pointer
                      ${isUpdateProfile ? "animate-pulse pointer-events-none" : " "}`
                      }>
                
               <div className="absolute bottom-0 right-0">
              
                <Camera  className="size-9 text-primary "/>
                <input 
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdateProfile}/>
              
              
              </div>
              </label>
            </div>

           <div className="form-control p-6"> 
                 
                   <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserRound className="size-5 text-base-content/35"/>
                       
                     </div>
                     <input type="text"
                       className="input input-bordered rounded-3xl w-full pl-10" 
                       value={updateFullName }
                       onChange={((e) => setUpdateFullName(e.target.value))}
                        />
                      
                       <div className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer ">
                        <SquarePen 
                            className="size-8"
                            onClick={handleUpdateFullName}/>
                       </div>
                    </div>
                    
                     <div className="relative mt-6">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="size-5 text-base-content/35"/>
                        
                     </div> 
                     <input type="text"
                        className="input input-bordered rounded-3xl w-full  pl-10 text-base-content/65 text-lg"
                        value={authUser?.email}
                        readOnly/>
                    </div>
                </div>

                <div className="mt-6  rounded-3xl p-5">
                   <h2 className="text-lg font-medium mb-4">Account information</h2>
                   <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span>Member Since</span>
                        <span className="text-slate-300">
                          {authUser?.createdAt && new Date(authUser.createdAt).toLocaleDateString('en-GB')}

                        </span>
                      
                    </div>
                   </div>
                </div>   
              </div>  
          </div>
       
     </main>
  );
}
 
export default Profile;