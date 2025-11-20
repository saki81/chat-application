import chatImage from "../assets/chat-right-side.svg"

const AuthImage = () => {
 return ( 
      <div className="p-10 min-h-8 flex">
         <img src= {chatImage} className="fill-red" />
      </div>
  );
}
 
export default AuthImage;