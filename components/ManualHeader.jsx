import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
  //enableWeb3 = equivalent in raw ethers of try{ethereum.request()}
  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis()

  useEffect(() => {
    if (isWeb3Enabled) return
    if(typeof window !== "undefined"){
        if(window.localStorage.getItem("Connected")){
            enableWeb3()}
        }
  }, [isWeb3Enabled])

  useEffect(()=>{ Moralis.onAccountChanged((account)=>{
    console.log("Account changed to ", account)
    if(account == null){
        if(window !== "undefined"){
            window.localStorage.removeItem("Connected")
            deactivateWeb3()
            console.log("Null account has found")
        }
    }
  })

  }, [])

  //no dependecy array: run anytime something re-renders. You can have circular renders
  //blank dependency array: run anytime there's a manual reload
  //object in dependency array: run anytime something in the array changes

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3()
            if(typeof window !== "undefined"){
                window.localStorage.setItem("Connected", "Injected")
            }
          }}
          disabled = {isWeb3EnableLoading}
        >         
          connect
        </button>
      )}
    </div>
  )
}
