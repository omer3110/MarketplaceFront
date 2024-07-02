import axios from "axios";
import { createContext, useEffect, useState } from "react";

function formatJWTTokenToUser(token) {
  const decodedJwt = _parseJwt(token);
  if (!decodedJwt) return null;

  const {
    payload: { userId },
  } = decodedJwt;
  console.log(userId);
  return { userId };
}

function _parseJwt(token) {
  // split the token into header, payload, and signature
  const [header, payload, signature] = token.split(".");

  // replace URL-safe characters with standard base64 characters
  const fixedHeader = header.replace(/-/g, "+").replace(/_/g, "/");
  const fixedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");

  // decode the header and payload from base64
  const decodedHeader = atob(fixedHeader);
  const decodedPayload = atob(fixedPayload);

  // parse the JSON objects from the decoded header and payload
  const headerObj = JSON.parse(decodedHeader);
  const payloadObj = JSON.parse(decodedPayload);

  // return an object with the decoded header, payload, and signature
  return {
    header: headerObj,
    payload: payloadObj,
    signature,
  };
}

const UserContext = createContext();

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({});
  const URL = "http://localhost:3000/api/auth/";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found");
      return;
    }

    const { userId } = formatJWTTokenToUser(token) || {};
    if (!userId) {
      console.warn("Invalid token format or userId not found");
      return;
    }

    async function fetchUser() {
      try {
        const response = await axios.get(URL + userId);
        console.log(response.data);
        setLoggedInUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
