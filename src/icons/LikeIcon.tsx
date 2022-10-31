import COLOR from '@styles/colors';
import React from 'react';

interface Props {
  isLike: boolean;
}

const Like = ({ isLike }: Props) => {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill={isLike ? COLOR.RED : COLOR.BG}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5263 2.4309L17.5273 2.43188C19.4921 4.35933 19.4885 7.33453 17.531 9.24587L17.5308 9.24602L10.0003 16.6021L2.4697 9.24602L2.46955 9.24587C0.511576 7.33408 0.508839 4.35888 2.46921 2.4358L2.46921 2.4358L2.47068 2.43435C2.92995 1.98195 3.47755 1.62151 4.08257 1.37489C4.68746 1.12834 5.33707 1.00074 5.99385 1C7.15455 1.0002 8.35664 1.58593 9.33197 2.46198L10.0001 3.0621L10.6683 2.46206C11.6438 1.5861 12.8461 1.00033 14.0069 1C14.6628 1.00055 15.3116 1.12775 15.9159 1.37371C16.5202 1.61972 17.0673 1.97939 17.5263 2.4309Z"
        stroke={isLike ? COLOR.RED : COLOR.CHARCOAL}
        strokeWidth="2"
      />
    </svg>
  );
};

export default Like;
