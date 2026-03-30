import { useState } from 'react';
import { SimulationPage } from './pages/SimulationPage';
import { LandingPage } from './pages/LandingPage';
import { lessons } from './content/lessons';

function App() {
  const [view, setView] = useState<'landing' | 'simulation'>('landing');
  const [mode, setMode] = useState<'guided' | 'sandbox'>('sandbox');
  const [guidedLessonId, setGuidedLessonId] = useState<string | undefined>();

  const startGuided = (lessonId: string) => {
    setMode('guided');
    setGuidedLessonId(lessonId);
    setView('simulation');
  };

  const startSandbox = () => {
    setMode('sandbox');
    setGuidedLessonId(undefined);
    setView('simulation');
  };

  return (
    <>
      {view === 'landing' ? (
        <LandingPage 
          onStartGuided={() => startGuided(lessons[0].id)} 
          onStartSandbox={startSandbox} 
        />
      ) : (
        <SimulationPage 
          mode={mode}
          lessonId={guidedLessonId}
          onNextLesson={(nextId) => setGuidedLessonId(nextId)}
          onExit={() => setView('landing')} 
        />
      )}
    </>
  );
}

export default App;
