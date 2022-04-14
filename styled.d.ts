import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    heights: {
      hour: string;
    };
    borderRadius: {
      large: string;
      small: string;
    };

    colors: {
      primary: string;
      secondary: string;
      muted: string;
      white: string;
      offWhite: string;
      red: string;
    };
    eventColors: {
      '0': string;
      '1': string;
      '2': string;
      '3': string;
      '4': string;
    };
  }
}
