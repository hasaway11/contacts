import './App.css';

import Header from './fragments/Header'
import Nav from './fragments/Nav'
import Aside from './fragments/Aside'
import Footer from './fragments/Footer'

import ContactList from './pages/ContactList';
import ContactRead from './pages/ContactRead';
import ContactWrite from './pages/ContactWrite';
import ContactUpdate from './pages/ContactUpdate';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <main>
        <Aside />
        <section>
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/read" element={<ContactRead />} />
            <Route path="/write" element={<ContactWrite />} />
            <Route path="/update" element={<ContactUpdate />} />
          </Routes>
        </section>
        <Aside />
      </main>
      <Footer />
    </div>
  );
}

export default App;
