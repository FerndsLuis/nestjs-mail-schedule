import classNames from 'classnames';
import React from 'react';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'primary' | 'light' | 'dark';
  children: React.ReactNode;
  onClick?: VoidFunction;
};

export function Button({ type, variant, children, onClick }: Props) {
  let bgColor = 'text-black';
  if (variant === 'dark') bgColor = 'bg-primaryDark text-white';
  if (variant === 'primary')
    bgColor =
      'bg-primary hover:bg-primaryLight active:bg-primaryDark transition-all text-white';
  if (variant === 'light') bgColor = 'bg-primaryLight text-white';

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames('py-2 px-4 rounded-md text-sm', bgColor)}
    >
      {children}
    </button>
  );
}
