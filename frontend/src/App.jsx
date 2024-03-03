import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // Initialize Google Sign-In
    const initGoogleSignIn = () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2.init({
          client_id:
            "785712156720-k9s354vbqhdc69ei7mm3vdjhc630ht2l.apps.googleusercontent.com", // Replace with your actual Google OAuth client ID
        });
      });
    };
    // Load Google SDK script asynchronously
    const loadGoogleSdk = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/platform.js";
      script.onload = initGoogleSignIn;
      document.body.appendChild(script);
    };

    loadGoogleSdk();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const googleAuth = window.gapi.auth2.getAuthInstance();
      const googleUser = await googleAuth.signIn();
      console.log("🚀 - googleUser:", googleUser);

      const idToken = googleUser.getAuthResponse().id_token;
      console.log("🚀 - idToken:", idToken);

      // Now you have the Google ID token, you can send it to your backend
      await sendTokenToBackend(idToken);
    } catch (error) {
      if (error.error === "popup_closed_by_user") {
        console.log("Google Sign-In popup closed by the user.");
        // Handle or ignore this error, depending on your application's requirements
      } else {
        console.error("Error logging in with Google:", error);
        // Handle other errors, e.g., display error message
      }
    }
  };

  const sendTokenToBackend = async (token) => {
    try {
      const googleAuthResponse = await fetch(`/auth/google?token=${token}`);
      if (!googleAuthResponse.ok) {
        throw new Error("Google authentication failed");
      }
      const data = await googleAuthResponse.json();
      console.log(data);
      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      console.error("Error logging in with Google:", error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default App;
