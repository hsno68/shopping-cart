import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav.jsx";

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Outlet />
    </div>
  );
}
