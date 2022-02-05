import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactList from "./features/contactList/ContactList";
import Modals from "./features/modals";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Modals/>
          <ContactList />
      </header>
    </div>
  );
}

export default App;
