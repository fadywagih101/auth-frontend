import { useNavigate } from "react-router-dom";

function Application() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session (e.g., localStorage or cookie)
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to the application.</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Application;
