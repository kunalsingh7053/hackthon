import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loader from "./components/Loader";
import NavBar from "./components/Navbar";
import Mainroute from "./routes/Mainroute";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <BrowserRouter>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        {showLoader && <Loader setShowLoader={setShowLoader} />}
        {!showLoader && (
          <>
            <NavBar />
            <Mainroute /> {/* Saare route yaha render honge */}
          </>
        )}
      </main>
    </BrowserRouter>
  );
}

export default App;
