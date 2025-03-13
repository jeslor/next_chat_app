"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginValidator } from "@/lib/validators/loginValidator"
import Link from "next/link"
 

 
const LoginForm =()=> {
    const form = useForm({
        resolver: zodResolver(loginValidator),
        defaultValues: {
            username: "",
            password: "",
        },
    })


    const onSubmit  = async (values:z.infer<typeof loginValidator>) => {}


 
  return (
    <div className="w-full max-w-[400px]">
    <h2 className="text-3xl font-semibold">Welcome back!</h2>
    <p className="text-sm font-semibold pb-[4rem]">Enter your credentials to access your account</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="opacity-90">Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
             
              <FormMessage className="text-red-600 text-[9px]" />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
              <FormLabel className="opacity-90">Password</FormLabel>
              <Link className="text-blue-500 text-[10px] font-semibold" href={'/forgotpassword'}>Forgot password</Link>
              </div>
              <FormControl>
                <Input placeholder="password" {...field} type="password"  className="text-[20px]"/>
              </FormControl>
             
              <FormMessage className="text-red-600 text-[9px]" />
            </FormItem>
          )}
        />
        <button
          type="submit"
            className="mainBtn w-full py-2"
        >
            Login now
        </button>
      </form>
    </Form>
    <div className="text-center pt-10">
      <p>Don't have an account? <Link href="/sign_up" className="text-primary6 font-semibold">Sign up</Link></p>
    </div>
    </div>
  )
}


export default LoginForm
