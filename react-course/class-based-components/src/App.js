import ErrorBoundary from './components/ErrorBoundary';
import Users from './components/Users';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Users />
      </ErrorBoundary>
    </div>
  );
}

export default App;
