// gluestack-ui.config.ts

import {createConfig, Theme} from "@gluestack-style/react";
import {config} from "@gluestack-ui/config";
import {Components} from "@gluestack-style/react/lib/typescript/types";

export const gooberConfig = createConfig({
    ...config,
    tokens: {
        ...config.tokens,
        colors: {
            ...config.tokens.colors,
            // replacing primary color
            primary0: '#ffffff',   // white
            primary50: '#e6e6e6',  // very light gray
            primary100: '#cccccc', // lighter gray
            primary200: '#b3b3b3', // light gray
            primary300: '#999999', // medium light gray
            primary400: '#808080', // gray
            primary500: '#666666', // medium dark gray
            primary600: '#4d4d4d', // dark gray
            primary700: '#333333', // darker gray
            primary800: '#1a1a1a', // very dark gray
            primary900: '#0d0d0d', // nearly black
            primary950: '#000000', // black
            secondary0: 'white'
        },
    },
});

type Config = typeof gooberConfig;

