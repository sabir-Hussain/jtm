import { AuthButton } from "@/components/auth-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth-helpers";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <main className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Welcome</h1>
          <AuthButton />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
            <CardDescription>
              Your passwordless authentication system is set up and ready to use.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">You are signed in!</p>
                <div className="rounded-md bg-muted p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  {user.name && (
                    <p className="text-sm">
                      <span className="font-medium">Name:</span> {user.name}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  You are not signed in. Click the "Sign in" button above to get started.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
