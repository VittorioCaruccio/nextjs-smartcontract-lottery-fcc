import { ConnectButton } from "web3uikit"
export default function Header() {
  return (
    <div className="border-b-2 flex flex-row border-blue-100">
      <h1 className="font-mono py-4 px-4 font-bold text-3xl animate-pulse text-blue-500 ">Decentralized Lottery</h1>
      <div class="ml-auto py-2 px-4 "><ConnectButton moralisAuth={false} /></div>
      </div>
    
  )
}
