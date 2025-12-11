// src/pages/Login.jsx
function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center p-16 relative bg-gradient-to-br from-indigo-950 to-indigo-900">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-20 mix-blend-overlay"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop)' }}
        />

        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 relative z-10">
          Project Matchmaker
        </h1>
        <p className="text-2xl text-slate-300 max-w-xl leading-relaxed relative z-10">
          Connect with open source projects that match your skills. Find your next contribution today.
        </p>
      </div>

      {/* Login Section */}
      <div className="flex-none w-[500px] bg-neutral-900 flex items-center justify-center border-l border-white/10">
        <div className="w-[350px] text-center p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
          <h2 className="text-3xl font-semibold mb-8 text-white">Welcome Back</h2>
          <button
            onClick={handleLogin}
            className="btn-primary w-full"
          >
            <svg height="20" width="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Sign in with GitHub
          </button>
          <p className="mt-6 text-sm text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
