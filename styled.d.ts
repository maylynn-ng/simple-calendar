import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    heights: {
      hour: string;
    };
    borderRadius: string;
    eventColors: {
      yellow: string;
      beige: string;
      lightBlue: string;
      darkBlue: string;
      brown: string;
    };
  }
}
