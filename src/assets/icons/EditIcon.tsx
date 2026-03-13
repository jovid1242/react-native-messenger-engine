import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

interface EditIconProps {
  color?: string;
  width?: number;
  height?: number;
}

const PATH =
  'M11.1593 4.3799L2.12218 13.417C1.91589 13.6233 1.8 13.9031 1.8 14.1948L1.8 15.9019C1.8 15.9572 1.84477 16.0019 1.9 16.0019H3.6071C3.89884 16.0019 4.17863 15.8861 4.38492 15.6798L13.422 6.64264L11.1593 4.3799ZM12.4321 3.10711L14.6948 5.36985L15.8262 4.23848C16.0605 4.00416 16.0605 3.62426 15.8262 3.38995L14.412 1.97574C14.1777 1.74142 13.7978 1.74142 13.5634 1.97574L12.4321 3.10711ZM0.849388 12.1442L12.2907 0.702944C13.2279 -0.234315 14.7475 -0.234314 15.6848 0.702944L17.099 2.11716C18.0362 3.05442 18.0362 4.57401 17.099 5.51127L5.65772 16.9526C5.11386 17.4964 4.37623 17.8019 3.6071 17.8019L1.9 17.8019C0.850661 17.8019 4.63615e-07 16.9513 2.52881e-07 15.9019L0 14.1948C-1.2644e-07 13.4257 0.305534 12.6881 0.849388 12.1442Z';

export const EditIcon = memo<EditIconProps>(
  ({ color = '#5159F6', width = 6, height = 6 }) => (
    <Svg
      width={width}
      height={height}
      style={{ width, height, maxWidth: width, maxHeight: height }}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path fillRule="evenodd" clipRule="evenodd" d={PATH} fill={color} />
    </Svg>
  )
);
