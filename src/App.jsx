import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { XPProvider } from './context/XPContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import FasesXP from './pages/FasesXP/FasesXP';
import ActivityDetail from './pages/ActivityDetail/ActivityDetail';
import Iteraciones from './pages/Iteraciones/Iteraciones';
import Calendario from './pages/Calendario/Calendario';
import Artefactos from './pages/Artefactos/Artefactos';
import './App.css';

function App() {
  return (
    <XPProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fases" element={<FasesXP />} />
            <Route path="/actividad/:activityId" element={<ActivityDetail />} />
            <Route path="/iteraciones" element={<Iteraciones />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/artefactos" element={<Artefactos />} />
          </Routes>
        </Layout>
      </Router>
    </XPProvider>
  );
}

export default App;
