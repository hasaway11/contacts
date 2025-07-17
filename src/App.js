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
import ContactList2 from './pages/ContactList2';
import ContactList3 from './pages/ContactList3';
import ContactWrite2 from './pages/ContactWrite2';
import ContactWrite3 from './pages/ContactWrite3';

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
            <Route path="/list2" element={<ContactList2 />} />
            <Route path="/list3" element={<ContactList3 />} />
            <Route path="/read" element={<ContactRead />} />
            <Route path="/write" element={<ContactWrite />} />
            <Route path="/write2" element={<ContactWrite2 />} />
            <Route path="/write3" element={<ContactWrite3 />} />
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
