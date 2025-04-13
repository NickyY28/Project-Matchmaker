// src/pages/Login.jsx
function Login() {
    const handleLogin = () => {
      window.location.href = "http://localhost:5000/auth/github";
    };
  
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h1>Project Matchmaker</h1>
        <p>Find open source issues made for you</p>
        <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
          Login with GitHub
        </button>
      </div>
    );
  }
  
  export default Login;
  