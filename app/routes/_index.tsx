import { NavLink } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "ZeroDev Vite" },
    { name: "description", content: "ZeroDev demo" },
  ];
};

export default function Index() {
  return (
    <main className="flex items-center justify-center min-h-screen flex-col pb-52 bg-slate-100">
      <h1 className="text-lg font-semibold ">
        Welcome to Account Abstraction(ZeroDev Edition){" "}
      </h1>
      <div className="flex space-x-4 mt-4 ">
        <NavLink to="/core" className="text-blue-500 hover:text-blue-700">
          @zeropass/sdk
        </NavLink>
        <NavLink to="/waas" className="text-blue-500 hover:text-blue-700">
          @zeropass/waas
        </NavLink>
      </div>
    </main>
  );
}
