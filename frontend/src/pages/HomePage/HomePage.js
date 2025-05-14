import NavBar from "../../components/NavBar";
import Calendar from "../../components/Calendar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <NavBar showButtons={false} />
      <div className="home-page-container">
        <h1>Welcome to the Home Page</h1>
        <p>This is the content of the home page.</p>
        <div className="calendar-container">
          <Calendar />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
