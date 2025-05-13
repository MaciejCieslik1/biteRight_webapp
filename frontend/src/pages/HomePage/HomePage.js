import NavBar from "../../components/NavBar";
import Calendar from "../../components/Calendar";

const HomePage = () => {
  return (
    <div>
      <NavBar showButtons={false} />
      <div className="home-page-container">
        <h1>Welcome to the Home Page</h1>
        <p>This is the content of the home page.</p>
      </div>
      <Calendar />
    </div>
  );
};
export default HomePage;
