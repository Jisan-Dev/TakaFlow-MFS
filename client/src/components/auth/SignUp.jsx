import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GiCash } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import PersonalModal from "./PersonalModal";
import AgentModal from "./AgentModal";

export function SignUp() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState();
  const { setUpdate, setLoading, createUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };
  const handleAgentModalClose = () => {
    setIsAgentModalOpen(false);
  };

  const handleChange = (value) => {
    setSelectedRole(value);
  };
  console.log(selectedRole);

  const schema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    phone: z.string().refine((val) => /^\+?[\d\s\-()]{10,20}$/.test(val), {
      message: "Invalid phone number",
    }),
    pin: z.string().refine((val) => /^[0-9]{5}$/.test(val), {
      message: "Invalid PIN. It must be exactly 5 digits.",
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submitHandler = async (data) => {
    if (!selectedRole) {
      return toast.error("Please Provide your Account Type");
    }
    data.role = selectedRole;
    data.status = selectedRole === "personal" ? "verified" : "pending";
    data.balance = (selectedRole === "personal" && 100.0) || (selectedRole === "agent" && 1000.0);
    try {
      setLoading(true);
      console.log(data);
      const result = await createUser(data);
      console.log(result);
      console.log(result.status);
      if (result.status === 200 && result.data?.status === "verified") {
        setIsModalOpen(true);
        setUpdate((prev) => !prev);
        // navigate('/');
      } else if (result.status === 200 && result.data?.status !== "verified") {
        setIsAgentModalOpen(true);
        reset();
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.error(error.response.data.message || "User already exist");
      } else {
        toast.error("Something went wrong, please try again later");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-800">
      <Card className="mx-auto w-96 bg-purple-100 shadow-2xl ">
        <CardHeader>
          <div>
            <div className="w-full flex my-3 justify-center items-center">
              <Link to={"/"} className="text-3xl font-bold font-ibmsans flex items-center gap-1 text-indigo-600">
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
                <Input id="name" {...register("name")} type="text" required />
                {errors.name && <div className="text-red-500 text-xs"> {errors.name?.message} </div>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} type="email" required />
                {errors.email && <div className="text-red-500 text-xs"> {errors.email?.message} </div>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone No.</Label>
                <Input id="phone" {...register("phone")} type="text" required />
                {errors.phone && <div className="text-red-500 text-xs"> {errors.phone?.message} </div>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pin">PIN (5 digits)</Label>
                <Input id="pin" {...register("pin")} type="password" required />
                {errors.pin && <div className="text-red-500 text-xs"> {errors.pin?.message} </div>}
              </div>
              <div className="grid gap-2">
                <Select onValueChange={handleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Account Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select your account type</SelectLabel>
                      <SelectItem value="personal">Personal</SelectItem>
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
            Already an account?{" "}
            <Link to={"/login"} className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
      <PersonalModal isOpen={isModalOpen} onClose={handleModalClose} />
      <AgentModal isOpen={isAgentModalOpen} onClose={handleAgentModalClose} />
    </div>
  );
}
