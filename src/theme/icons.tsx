import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

export type IconName =
  | 'paw'
  | 'droplet'
  | 'book'
  | 'star'
  | 'heart'
  | 'sparkles'
  | 'coffee'
  | 'activity'
  | 'plus'
  | 'minus'
  | 'chevron-left'
  | 'chevron-right'
  | 'x'
  | 'check'
  | 'calendar-heart'
  | 'list-check'
  | 'mountain'
  | 'camera'
  | 'confetti';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  filled?: boolean;
};

export function Icon({ name, size = 18, color = '#5A524D', filled = false }: IconProps) {
  const stroke = filled
    ? { fill: color, stroke: 'none' }
    : {
        fill: 'none',
        stroke: color,
        strokeWidth: 2,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
      };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'paw' && (
        <>
          <Ellipse cx={6} cy={10.6} rx={1.95} ry={2.7} fill={color} />
          <Ellipse cx={9.8} cy={7.2} rx={2.05} ry={2.95} fill={color} />
          <Ellipse cx={14.2} cy={7.2} rx={2.05} ry={2.95} fill={color} />
          <Ellipse cx={18} cy={10.6} rx={1.95} ry={2.7} fill={color} />
          <Path
            d="M12 12.1c-3.2 0-5.7 2.3-5.7 4.9 0 1.8 1.4 2.9 3.1 2.9 .95 0 1.35-.38 1.85-.63.3-.15.5-.24.75-.24s.45.09.75.24c.5.25.9.63 1.85.63 1.7 0 3.1-1.1 3.1-2.9 0-2.6-2.5-4.9-5.7-4.9z"
            fill={color}
          />
        </>
      )}
      {name === 'droplet' && (
        <Path d="M12 2.7S5.5 9.7 5.5 14a6.5 6.5 0 0 0 13 0c0-4.3-6.5-11.3-6.5-11.3z" {...stroke} />
      )}
      {name === 'book' && (
        <>
          <Path
            d="M12 6.5C10.4 5 8 4.5 4 4.5v13c4 0 6.4.5 8 2 1.6-1.5 4-2 8-2v-13c-4 0-6.4.5-8 2z"
            {...stroke}
          />
          <Path d="M12 6.5v13" {...stroke} />
        </>
      )}
      {name === 'star' && (
        <Path
          d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.9l-5.8 3.1 1.1-6.5L1.6 9.4l6.5-.9L12 2.6z"
          {...stroke}
        />
      )}
      {name === 'heart' && (
        <Path
          d="M20.8 8.6c0-2.6-2-4.6-4.5-4.6-1.6 0-3.1.9-4.3 2.6C10.7 4.9 9.2 4 7.6 4 5.2 4 3.2 6 3.2 8.6c0 4 4 6.9 8.8 11.4 4.8-4.5 8.8-7.4 8.8-11.4z"
          {...stroke}
        />
      )}
      {name === 'sparkles' && (
        <>
          <Path d="M12 3l1.8 4.9L18.8 9.5l-5 1.6L12 16l-1.8-4.9L5.2 9.5l5-1.6L12 3z" {...stroke} />
          <Path d="M18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" {...stroke} />
        </>
      )}
      {name === 'coffee' && (
        <>
          <Path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8z" {...stroke} />
          <Path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" {...stroke} />
          <Path d="M7 2.6c-.4 1 .4 1.6 0 2.6M11 2.6c-.4 1 .4 1.6 0 2.6" {...stroke} />
        </>
      )}
      {name === 'activity' && <Path d="M3 12h4l2.5-7 4 14 2.5-7H21" {...stroke} />}
      {name === 'plus' && <Path d="M12 5v14M5 12h14" {...stroke} />}
      {name === 'minus' && <Path d="M5 12h14" {...stroke} />}
      {name === 'chevron-left' && <Path d="M15 18l-6-6 6-6" {...stroke} />}
      {name === 'chevron-right' && <Path d="M9 18l6-6-6-6" {...stroke} />}
      {name === 'x' && <Path d="M18 6L6 18M6 6l12 12" {...stroke} />}
      {name === 'check' && <Path d="M20 6L9 17l-5-5" {...stroke} />}
      {name === 'calendar-heart' && (
        <>
          <Rect x={4} y={5} width={16} height={16} rx={2} {...stroke} />
          <Path d="M4 9.5h16M8 3v3M16 3v3" {...stroke} />
          <Path
            d="M12 18c-1.8-1.3-2.8-2.3-2.8-3.6a1.5 1.5 0 0 1 2.8-.7 1.5 1.5 0 0 1 2.8.7c0 1.3-1 2.3-2.8 3.6z"
            {...stroke}
          />
        </>
      )}
      {name === 'list-check' && (
        <>
          <Path d="M10 6h10M10 12h10M10 18h10" {...stroke} />
          <Path d="M3.5 6l1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2" {...stroke} />
        </>
      )}
      {name === 'mountain' && <Path d="M3 20h18L14 6l-3.4 6-2.1-3L3 20z" {...stroke} />}
      {name === 'camera' && (
        <>
          <Path d="M4 8h3l1.5-2h7L18 8h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" {...stroke} />
          <Circle cx={12} cy={13.5} r={3.3} {...stroke} />
        </>
      )}
      {name === 'confetti' && (
        <>
          <Path d="M12 13V3.5" {...stroke} />
          <Path d="M12 13l7.5 5" {...stroke} />
          <Path d="M12 13l-7.5 5" {...stroke} />
          <Path d="M12 13l9-2.5" {...stroke} />
          <Path d="M12 13l-9-2.5" {...stroke} />
          <Circle cx={4} cy={4.5} r={0.9} fill={color} />
          <Circle cx={20} cy={5.5} r={0.9} fill={color} />
          <Circle cx={19.5} cy={19} r={0.9} fill={color} />
        </>
      )}
    </Svg>
  );
}
