import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GiCash } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export function SignUp() {
  const [selectedRole, setSelectedRole] = useState();
  const handleChange = (value) => {
    setSelectedRole(value);
  };
  console.log(selectedRole);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
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
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone No.</Label>
                <Input id="phone" name="phone" type="text" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="PIN">PIN (5 digits)</Label>
                <Input id="PIN" name="pin" type="password" required />
              </div>
              <div className="grid gap-2">
                <Select name="role" onValueChange={handleChange}>
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
