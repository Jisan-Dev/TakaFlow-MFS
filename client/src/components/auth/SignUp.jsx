import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GiCash } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAxiosPublic from '@/hooks/useAxiosPublic';

export function SignUp() {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState();

  const handleChange = (value) => {
    setSelectedRole(value);
  };
  console.log(selectedRole);

  const schema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    phone: z.string().refine((val) => /^\+?[\d\s\-()]{10,20}$/.test(val), {
      message: 'Invalid phone number',
    }),
    pin: z.string().refine((val) => /^[0-9]{5}$/.test(val), {
      message: 'Invalid PIN. It must be exactly 5 digits.',
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submitHandler = async (data) => {
    data.role = selectedRole;
    try {
      console.log(data);
      const { data: result } = await axiosPublic.post('/users', data);
      console.log(result);
      navigate('/login', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-800">
      <Card className="mx-auto w-96 bg-purple-100 shadow-2xl ">
        <CardHeader>
          <div>
            <div className="w-full flex my-3 justify-center items-center">
              <Link to={'/'} className="text-3xl font-bold font-ibmsans flex items-center gap-1 text-indigo-600">
                <GiCash className="text-4xl" /> TakaFlow
              </Link>
            </div>
          </div>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register('name')} type="text" required />
                {errors.name && <div className="text-red-500 text-xs"> {errors.name?.message} </div>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register('email')} type="email" required />
                {errors.email && <div className="text-red-500 text-xs"> {errors.email?.message} </div>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone No.</Label>
                <Input id="phone" {...register('phone')} type="text" required />
                {errors.phone && <div className="text-red-500 text-xs"> {errors.phone?.message} </div>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pin">PIN (5 digits)</Label>
                <Input id="pin" {...register('pin')} type="password" required />
                {errors.pin && <div className="text-red-500 text-xs"> {errors.pin?.message} </div>}
              </div>
              <div className="grid gap-2">
                <Select onValueChange={handleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already an account?{' '}
            <Link to={'/login'} className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
