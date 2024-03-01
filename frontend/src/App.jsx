import "./App.css";

function navigate(url) {
  window.location.href = url;
}

async function auth() {
  const response = await fetch(`http://127.0.0.1:5000/request`, {
    method: "post",
  });
  const data = await response.json();
  
  navigate(data.url);
  console.log("🚀 - data:", data);
}

function App() {
  return (
    <>
      <h1>Sign in</h1>
      <button type="button" onClick={() => auth()}>
        Click me to sign in
      </button>
    </>
  );
}

export default App;
