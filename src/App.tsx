import { useState } from 'react';
import { SimulationPage } from './pages/SimulationPage';
import { LandingPage } from './pages/LandingPage';

function App() {
  const [view, setView] = useState<'landing' | 'simulation'>('landing');

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onStart={() => setView('simulation')} />
      ) : (
        <SimulationPage />
      )}
    </>
  );
}

export default App;
