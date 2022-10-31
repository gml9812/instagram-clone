import COLOR from '@styles/colors';
import React from 'react';

const AccountIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 11C12.3261 11 13.5979 10.4732 14.5355 9.53553C15.4732 8.59785 16 7.32608 16 6C16 4.67392 15.4732 3.40215 14.5355 2.46447C13.5979 1.52678 12.3261 1 11 1C9.67392 1 8.40215 1.52678 7.46447 2.46447C6.52678 3.40215 6 4.67392 6 6C6 7.32608 6.52678 8.59785 7.46447 9.53553C8.40215 10.4732 9.67392 11 11 11ZM14.3333 6C14.3333 6.88405 13.9821 7.7319 13.357 8.35702C12.7319 8.98214 11.8841 9.33333 11 9.33333C10.1159 9.33333 9.2681 8.98214 8.64298 8.35702C8.01786 7.7319 7.66667 6.88405 7.66667 6C7.66667 5.11594 8.01786 4.2681 8.64298 3.64298C9.2681 3.01786 10.1159 2.66667 11 2.66667C11.8841 2.66667 12.7319 3.01786 13.357 3.64298C13.9821 4.2681 14.3333 5.11594 14.3333 6ZM21 19.3333C21 21 19.3333 21 19.3333 21H2.66667C2.66667 21 1 21 1 19.3333C1 17.6667 2.66667 12.6667 11 12.6667C19.3333 12.6667 21 17.6667 21 19.3333ZM19.3333 19.3267C19.3317 18.9167 19.0767 17.6833 17.9467 16.5533C16.86 15.4667 14.815 14.3333 11 14.3333C7.18333 14.3333 5.14 15.4667 4.05333 16.5533C2.92333 17.6833 2.67 18.9167 2.66667 19.3267H19.3333Z"
        fill={COLOR.CHARCOAL}
        stroke={COLOR.CHARCOAL}
        strokeWidth="0.3"
      />
    </svg>
  );
};

export default AccountIcon;
