import { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Logg inn",
  description: "Gave Register Administrasjons Dashbord",
};
export default function Page() {
  return <SignIn />;
}
