import classNames from 'classnames';
import { useNavMobileContext } from 'contexts';
import { useNavigate } from 'react-router-dom';

type Props = {
  variant?: 'default' | 'primary';
  children: React.ReactNode;
  to: string;
};

export function NavMobileItem({ children, variant = 'default', to }: Props) {
  const navigate = useNavigate();
  const { setIsVisible } = useNavMobileContext();

  let bgColor =
    'bg-white text-black hover:bg-gray-100 active:bg-gray-200 transition-all text-black';
  if (variant === 'primary') {
    bgColor =
      'bg-primary hover:bg-primaryLight active:bg-primaryDark transition-all text-white';
  }

  function handleButtonClick() {
    setIsVisible(false);
    navigate(to);
  }

  return (
    <button
      onClick={handleButtonClick}
      className={classNames(
        'w-full p-4 border-b border-gray-100 flex items-stretch',
        bgColor
      )}
    >
      {children}
    </button>
  );
}
