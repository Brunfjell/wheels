import { Outlet } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { SiVite, SiNodedotjs, SiGithub, SiGit } from "react-icons/si";

export default function LandingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="navbar bg-base-200 shadow-md">
        <div className="flex-1">
          <img 
            src="/TurnWheel.png" 
            className="h-8 w-auto" 
            alt="App Logo"
          />
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> 
            </svg>
          </button>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6 bg-base-300">
        <div className="w-full max-w-3xl p-8">
          <Outlet /> 
        </div>
      </main>

      <footer className="p-4 py-10 text-center text-sm bg-base-200">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
            <div>
              <p className="font-semibold">&copy; {new Date().getFullYear()} BRUNFJELL</p>
              <p>All rights reserved.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold">Made by</p>
                <a 
                  href="https://brunfjell.github.io/brunfjell-portfolio/" 
                  className="font-bold font-sans text-lg text-center" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  BRUNFJELL
                </a>
              </div>
              <div>
                <p className="font-bold">Made with</p>
                <div className="flex items-center gap-2">
                  <FaReact className="h-6 w-6" />
                  <SiVite className="h-6 w-6" />
                  <SiNodedotjs className="h-6 w-6" />
                  <SiGithub className="h-6 w-6" />
                  <SiGit className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
      </footer>
    </div>
  );
}
