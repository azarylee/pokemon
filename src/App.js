import "./styles.css";
import Header from "./Header";
import Content from "./Content";
import Alarm from "./Alarm";
import Search from "./Search";

export default function App() {
  return (
    <div className="App">
      <Search />
      <Alarm />
      <Header />
      <Content />
    </div>
  );
}
