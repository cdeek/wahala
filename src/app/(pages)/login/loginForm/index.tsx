"use client";

import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";
// import { Message } from '@/components/Message'
import { useAuth } from "../../../_providers/Auth";

import "./style.css";

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams();
  const allParams = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";
  const redirect = useRef(searchParams.get("redirect"));
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>();

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data);
        if (redirect?.current) router.push(redirect.current as string);
        else router.push("/");
      } catch (err) {
        console.log(err);
        setError(
          "There was an error with the credentials provided. Please try again.",
        );
      }
    },
    [login, router],
  );

  return (
    <Card className="formContainer">
      <CardHeader>
        <CardTitle className="formTitle">
          <h4>Welcome</h4>
          <Image
            src="/assets/icons/hand-wave.png"
            alt="icon"
            width={39}
            height={30}
          />
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {/* <Message error={error} className="message" /> */}
          <Input
            name="email"
            label="Email Address"
            required
            register={register}
            error={errors.email}
            type="email"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            required
            register={register}
            error={errors.password}
          />
          <Button
            type="submit"
            appearance="default"
            label={isLoading ? "Processing" : "Login"}
            disabled={isLoading}
            className="submit"
          />
        </form>
      </CardContent>
      <CardFooter className="">
        <Link href={`/create-account${allParams}`}>Create an account</Link>
        <br />
        <Link href={`/recover-password${allParams}`}>
          Recover your password
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
