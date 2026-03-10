import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

interface ForwardIconProps {
  color?: string;
  width?: number;
  height?: number;
}

const PATH =
  'M16.3652 4.36321C16.7166 4.01174 17.2865 4.01174 17.638 4.36321L21.638 8.36321C21.9894 8.71468 21.9894 9.28453 21.638 9.63601L17.638 13.636C17.2865 13.9875 16.7166 13.9875 16.3652 13.636C16.0137 13.2845 16.0137 12.7147 16.3652 12.3632L18.8288 9.89961H7.50156C5.51334 9.89961 3.90156 11.5114 3.90156 13.4996C3.90156 15.4878 5.51334 17.0996 7.50156 17.0996H12.0016C12.4986 17.0996 12.9016 17.5026 12.9016 17.9996C12.9016 18.4967 12.4986 18.8996 12.0016 18.8996H7.50156C4.51923 18.8996 2.10156 16.4819 2.10156 13.4996C2.10156 10.5173 4.51922 8.09961 7.50156 8.09961H18.8288L16.3652 5.63601C16.0137 5.28453 16.0137 4.71469 16.3652 4.36321Z';

export const ForwardIcon = memo<ForwardIconProps>(
  ({ color = '#5159F6', width = 20, height = 20 }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path fillRule="evenodd" clipRule="evenodd" d={PATH} fill={color} />
    </Svg>
  )
);
