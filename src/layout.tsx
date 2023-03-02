import { PropsWithChildren } from "react";
import Navbar from "./components/navbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="container">
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  )
}