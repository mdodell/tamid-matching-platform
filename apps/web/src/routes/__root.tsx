import { theme } from '../theme';
import mantineCss from '@mantine/core/styles.css?url';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TAMID Matching Platform' },
    ],
    // Mantine styles must come before any app styles.
    links: [{ rel: 'stylesheet', href: mantineCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <HeadContent />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}
