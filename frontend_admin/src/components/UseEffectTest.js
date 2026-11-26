import { useEffect } from "react";

function App() {

  useEffect(function() {
    console.log("Hello");
  });

  return (
    <div>
      <h1>Hello Students</h1>
    </div>
  );
}

export default App;