import { useEffect, useState } from "react";
import { Bookmark, Home, Search, LogOut, Plus, Star, Users, GitFork } from "lucide-react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Get logged in user
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Not logged in", err);
        window.location.href = "/login";
      });

    // Get my projects
    axios
      .get("http://localhost:5000/api/projects/my", { withCredentials: true })
      .then((res) => setMyProjects(res.data))
      .catch((err) => console.error("Error fetching my projects", err));

    // Get all projects
    axios
      .get("http://localhost:5000/api/projects/all")
      .then((res) => setAllProjects(res.data))
      .catch((err) => console.error("Error fetching all projects", err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/auth/logout", { withCredentials: true })
      .then(() => {
        window.location.href = "http://localhost:5173";
      })
      .catch((err) => console.error("Error logging out", err));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-slate-300 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-700/50 fixed h-screen flex flex-col">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Project Matchmaker
          </h2>
          <p className="text-slate-400 text-xs mt-1">Find your perfect project</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('explore')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'explore'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
              >
                <Search className="w-5 h-5" />
                <span className="font-medium">Explore</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('saved')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'saved'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
              >
                <Bookmark className="w-5 h-5" />
                <span className="font-medium">Saved</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 mb-4 p-3 bg-slate-800/30 rounded-lg">
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full ring-2 ring-purple-500/50"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{user.username}</p>
              <p className="text-xs text-slate-400">Developer</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user.username}! 👋
            </h1>
            <p className="text-slate-400">
              Here's what's happening with your projects today
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/submit'}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium shadow-lg shadow-purple-500/50 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Your Projects</p>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <GitFork className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{myProjects.length}</p>
            <p className="text-xs text-slate-500 mt-1">Active repositories</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Matches Found</p>
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <Star className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{allProjects.length}</p>
            <p className="text-xs text-slate-500 mt-1">Recommended for you</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Contributors</p>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">12</p>
            <p className="text-xs text-slate-500 mt-1">Active collaborators</p>
          </div>
        </div>

        {/* My Projects Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            My Projects
            <span className="text-sm font-normal text-slate-400">({myProjects.length})</span>
          </h3>
          {myProjects.length === 0 ? (
            <div className="bg-slate-800/30 backdrop-blur-sm border-2 border-dashed border-slate-700 rounded-xl p-12 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitFork className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-slate-400 mb-4">You haven't submitted any projects yet.</p>
              <button
                onClick={() => window.location.href = '/submit'}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
              >
                Create your first project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 group"
                >
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {project.forks}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recommended Projects Section */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            Recommended for You
            <span className="text-sm font-normal text-slate-400">({allProjects.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProjects.map((project) => (
              <div
                key={project._id}
                className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/20"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-bold text-white hover:text-pink-400 transition-colors cursor-pointer">
                    {project.name}
                  </h4>
                  <button className="text-slate-400 hover:text-pink-400 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-3 text-sm">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Users className="w-4 h-4" />
                    {project.owner?.username || "Unknown"}
                  </span>
                  {project.match && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1 text-green-400">
                        <Star className="w-4 h-4 fill-green-400" />
                        {project.match}% Match
                      </span>
                    </>
                  )}
                </div>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 text-white rounded-lg transition-all">
                  View Project
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;