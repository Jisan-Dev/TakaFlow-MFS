import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GiCash } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-800">
      <Card className="mx-auto max-w-sm bg-purple-100 shadow-2xl ">
        <CardHeader>
          <div>
            <div className="w-full flex my-3 justify-center items-center">
              <Link to={'/'} className="text-3xl font-bold font-ibmsans flex items-center gap-1 text-indigo-600">
                <GiCash className="text-4xl" /> TakaFlow
              </Link>
            </div>
          </div>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email/mobile no. and PIN no. below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="emailOrPhone">Email/Phone No.</Label>
              <Input id="emailOrPhone" type="text" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="PIN">PIN</Label>
              <Input id="PIN" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to={'/sign-up'} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
