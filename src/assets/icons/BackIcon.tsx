import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

interface BackIconProps {
  color?: string;
  width?: number;
  height?: number;
}

const BACK_PATH =
  'M10.3595 0.380524C10.9226 0.910447 10.9494 1.79647 10.4195 2.35951L3.32255 9.9L10.4195 17.4405C10.9494 18.0035 10.9226 18.8896 10.3595 19.4195C9.79647 19.9494 8.91044 19.9226 8.38052 19.3595L0.38052 10.8595C-0.12684 10.3204 -0.12684 9.47956 0.38052 8.94049L8.38052 0.440493C8.91044 -0.12255 9.79647 -0.149399 10.3595 0.380524Z';

export const BackIcon = memo<BackIconProps>(
  ({ color = '#5159F6', width = 11, height = 20 }) => (
    <Svg width={width} height={height} viewBox="0 0 11 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d={BACK_PATH}
        fill={color}
      />
    </Svg>
  )
);
