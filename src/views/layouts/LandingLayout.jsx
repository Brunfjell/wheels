import { Outlet } from "react-router-dom";

export default function LandingLayout() {
  return (
    <div>
      <header>
        <h1>Welcome to Fleet Management</h1>
      </header>
      <Outlet />
    </div>
  );
}
