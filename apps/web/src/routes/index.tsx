import { Container, Stack, Text, Title } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return (
    <Container size="sm" py="xl">
      <Stack>
        <Title order={1}>TAMID Matching Platform</Title>
        <Text c="dimmed">Matching TAMID chapters, companies, and staff.</Text>
      </Stack>
    </Container>
  );
}
