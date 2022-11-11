import { MainRoutes } from "./routes";

function App() {
  return (
    <div
      className="App"
      onClick={() => {
        const active = document.querySelector(".backlog-sento");
        if (active) active.style.display = "none";
      }}
    >
      <MainRoutes />
    </div>
  );
}

export default App;
