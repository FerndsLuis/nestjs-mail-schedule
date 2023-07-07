import { AppContexts } from 'contexts';
import { AppRouters } from 'router';

export default function App() {
  return (
    <AppContexts>
      <AppRouters />
    </AppContexts>
  );
}
