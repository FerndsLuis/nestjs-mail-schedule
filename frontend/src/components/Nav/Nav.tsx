import { Button, NavLogo } from 'components';

export function Nav() {
  return (
    <nav className="w-full h-20 bg-gray-100 border-b border-gray-200">
      <div className="w-full h-full max-w-7xl m-auto flex items-center justify-between">
        <NavLogo />
        <Button variant="primary">Escrever Agora</Button>
      </div>
    </nav>
  );
}
