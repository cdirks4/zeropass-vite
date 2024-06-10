import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useRouteLoaderData,
} from "@remix-run/react";
import "../tailwind.css";
import { http } from "viem";
import { ZeroDevProvider, createConfig } from "@zerodev/waas";
import { sepolia } from "viem/chains";
export async function loader() {
  return json({
    ENV: {
      PROJECT_ID: process.env.PROJECT_ID,
      BUNDLER_URL: process.env.BUNDLER_URL,
      PAYMASTER_URL: process.env.PAYMASTER_URL,
      PASSKEY_SERVER_URL: process.env.PASSKEY_SERVER_URL,
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { ENV } = useRouteLoaderData("root") as {
    ENV: {
      BUNDLER_URL: string;
      PAYMASTER_URL: string;
      PASSKEY_SERVER_URL: string;
      PROJECT_ID: string;
    };
  };
  const config = createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(),
    },
    projectIds: {
      [sepolia.id]: ENV.PROJECT_ID,
    },
  });

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100">
        <ZeroDevProvider config={config}>{children}</ZeroDevProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
