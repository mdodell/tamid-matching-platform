import {
  Anchor,
  Box,
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { schemaResolver, useForm } from '@mantine/form';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/login')({
  head: () => ({ meta: [{ title: 'Log in | TAMID Matching Platform' }] }),
  component: Login,
});

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').pipe(z.email('Enter a valid email address')),
  password: z.string().min(1, 'Password is required'),
});

type LoginValues = z.infer<typeof loginSchema>;

// Stub: will be wired to the API in a later ticket.
function handleLogin(values: LoginValues) {
  console.info('Login submitted (stub)', { email: values.email });
}

function Login() {
  const form = useForm<LoginValues>({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: schemaResolver(loginSchema, { sync: true }),
  });

  return (
    <Center mih="100dvh" p={{ base: 'sm', sm: 'xl' }}>
      <Paper w="100%" maw={420} p={{ base: 'md', sm: 'xl' }} radius="md" withBorder shadow="sm">
        <form
          onSubmit={form.onSubmit((values) =>
            handleLogin({ ...values, email: values.email.trim() }),
          )}
          noValidate
        >
          <Stack gap="md">
            <div>
              <Title order={1} size="h2">
                Log in
              </Title>
              <Text c="dimmed" size="sm" mt={4}>
                Welcome back to the TAMID Matching Platform.
              </Text>
            </div>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              type="email"
              inputMode="email"
              autoComplete="email"
              withAsterisk
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            {/* Link sits on the label row but stays outside the <label>, so the
                input's accessible name is just "Password". */}
            <Box pos="relative">
              <PasswordInput
                label="Password"
                placeholder="Your password"
                autoComplete="current-password"
                withAsterisk
                key={form.key('password')}
                {...form.getInputProps('password')}
              />
              <Anchor href="/forgot-password" size="sm" pos="absolute" top={0} right={0}>
                Forgot password?
              </Anchor>
            </Box>
            <Button type="submit" fullWidth>
              Log in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
