import { json, useLoaerData } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";
import { parseAbi } from "viem";
import {
  useKernelClient,
  useDisconnectKernelClient,
  useSendUserOperation,
  useCreateKernelClientPasskey,
} from "@zerodev/waas";
import { useState } from "react";
export const meta: MetaFunction = () => {
  return [
    { title: "ZeroDev Waas" },
    { name: "description", content: "ZeroDev using waas sdk" },
  ];
};
export async function loader() {
  return json({
    ENV: {
      BUNDLER_URL: process.env.BUNDLER_URL,
      PAYMASTER_URL: process.env.PAYMASTER_URL,
      PASSKEY_SERVER_URL: process.env.PASSKEY_SERVER_URL,
    },
  });
}
export default function Waas() {
  const { connectRegister, isPending, connectLogin } =
    useCreateKernelClientPasskey({
      version: "v3",
    });
  const { address, isConnected } = useKernelClient();
  const { disconnect } = useDisconnectKernelClient();
  const {
    data,
    write,
    isPending: isUserOpPending,
  } = useSendUserOperation({
    // paymaster: {
    //   type: "SPONSOR",
    // },
  });
  const tokenAddress = "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B";
  const abi = parseAbi(["function mint(address _to, uint256 amount) public"]);

  const [username, setUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    connectRegister({ username });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={connectLogin}>Login</button>
      {!isConnected ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={isPending}
          >
            {isPending ? "Connecting..." : "Create Smart Account"}
          </button>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <p>{`Smart Account Address: ${address}`}</p>
          <div className="flex flex-row justify-center items-center gap-4">
            <button
              onClick={disconnect}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Disconnect
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              disabled={isUserOpPending}
              onClick={() => {
                write([
                  {
                    address: tokenAddress,
                    abi: abi,
                    functionName: "mint",
                    args: [address, 1],
                    value: BigInt(0),
                  },
                ]);
              }}
            >
              {isUserOpPending ? "Minting..." : "Mint"}
            </button>
          </div>
          {data && <p>{`UserOp Hash: ${data}`}</p>}
        </div>
      )}
    </div>
  );
}
