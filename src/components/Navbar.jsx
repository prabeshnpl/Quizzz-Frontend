import { Link } from "react-router-dom";

const Navbar = ()=>{
    return (
        <nav className="bg-black text-white flex h-12 w-screen justify-between px-12 items-center m-0 border-b-1 border-white">
                  <h2 className="text-xl">Quiz</h2>
                  <ul className="flex justify-evenly space-x-10 text-lg">
                    <li><Link to="/" className="tet hover:underline hover:text-sky-700">Home</Link></li>
                     <li><Link to="/Score-Board" className="tet hover:underline hover:text-sky-700">Score-Board</Link></li>
                    <li><Link to="/about" className="tet hover:underline hover:text-sky-700">About</Link></li>
                  </ul>
        </nav>
    )
}
export default Navbar;