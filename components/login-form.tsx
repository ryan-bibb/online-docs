'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '@/lib/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <Card className="w-96">
      <CardHeader>Log In</CardHeader>
      <form action={action}>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Input name="userName" placeholder="Username" autoComplete="username" />
            {state?.errors?.userName && (
              <p className="text-destructive text-sm">{state.errors.userName}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            {state?.errors?.password && (
              <p className="text-destructive text-sm">{state.errors.password}</p>
            )}
          </div>
          {state?.message && <p className="text-destructive text-sm">{state.message}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-3 items-stretch">
          <Button disabled={pending} type="submit">
            Log In
          </Button>
          <p className="text-muted-foreground text-sm text-center">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
