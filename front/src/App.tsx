import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';

const App = () => {
  return (
    <div className="bg-zinc-900 text-zinc-100 h-screen">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
