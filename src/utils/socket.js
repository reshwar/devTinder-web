import { io } from "socket.io-client"
import { BASE_URL } from "./constants"

function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Check if the cookie starts with the given name
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null; // Cookie not found
  }
  
  // Example of usage
//   let myCookieValue = getCookie("token");
//   if (myCookieValue) {
//       console.log("Cookie value:", myCookieValue);
//   } else {
//       console.log("Cookie not found");
//   }
  

export const createSocketConection = (userId)=>{
    return io(BASE_URL,{auth:{
        token: getCookie("token"),
        userId
    }})
}

