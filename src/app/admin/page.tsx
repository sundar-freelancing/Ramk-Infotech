"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ADMIN_CREDENTIALS } from "./adminConstants";
import { Switch } from "@/components/ui/switch";
import useAppConfigStore from "@/store/appConfigStore";
import Link from "next/link";
import { updateAppConfigStatus } from "@/firebase/firebaseService";

interface FormData {
  email: string;
  password: string;
}

const Page = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id, appStatus, toggleAppStatus } = useAppConfigStore();

  const handleToggleAppStatus = async () => {
    toggleAppStatus();
    await updateAppConfigStatus(id, {
      enabled: !appStatus.enabled,
      reason: !appStatus.enabled
        ? "Admin made the app inactive due to some reason"
        : "",
    });
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (
      data.email === ADMIN_CREDENTIALS.email &&
      data.password === ADMIN_CREDENTIALS.password
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return isLoggedIn ? (
    <div>
      <h1>Admin Dashboard</h1>
      <p>{appStatus ? "App is active" : "App is inactive"}</p>
      <Switch
        checked={appStatus.enabled}
        onCheckedChange={handleToggleAppStatus}
      />
      <Link href="/">Home</Link>
    </div>
  ) : (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Page;
