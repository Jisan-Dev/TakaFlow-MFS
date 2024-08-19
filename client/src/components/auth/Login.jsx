import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GiCash } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const schema = z.object({
  phoneOrEmail: z.string().refine((val) => /^\+?[\d\s\-()]{10,20}$|^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(val), { message: 'Invalid email or phone number' }),
  pin: z.string().refine((val) => /^[0-9]{5}$/.test(val), {
    message: 'Invalid PIN. It must be exactly 5 digits.',
  }),
});

export function Login() {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submitHandler = async (data) => {
    console.log(data);
    const { data: formData } = await axiosPublic.post('/login', data);
    console.log('formData', formData);
    const { data: tokenData } = await axiosSecure.post('/jwt', { phoneOrEmail: data.phoneOrEmail });
    console.log('tokenData', tokenData);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-800">
      <form onSubmit={handleSubmit(submitHandler)}>
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
                <Input id="emailOrPhone" {...register('phoneOrEmail')} type="text" required />
                {errors.phoneOrEmail && <div className="text-red-500 text-xs"> {errors.phoneOrEmail?.message} </div>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="PIN">PIN</Label>
                <Input id="PIN" {...register('pin')} type="password" required />
                {errors.pin && <div className="text-red-500 text-xs"> {errors.pin?.message} </div>}
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
      </form>
    </div>
  );
}
