import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis, useMoralisSubscription } from "react-moralis"
import { contractAddresses, abi } from "../constants"
import { ethers } from "ethers"
import { Checkmark, useNotification } from "web3uikit"

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const [entranceFee, setEntranceFee] = useState("0")
  const [numPlayers, setNumPlayers] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0")
  const dispatch = useNotification()

  const THIRTYSECONDSINMS = 1 * 1 * 2 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()
  const dateTimeAfterlotterytime = NOW_IN_MS + THIRTYSECONDSINMS

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi, //
    contractAddress: contractAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  })

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi, //
    contractAddress: contractAddress,
    functionName: "getEntranceFee",
    params: {},
  })

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi, //
    contractAddress: contractAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi, //
    contractAddress: contractAddress,
    functionName: "getRecentWinner",
    params: {},
  })

  const { runContractFunction: getRaffleState } = useWeb3Contract({
    abi: abi, //
    contractAddress: contractAddress,
    functionName: "getRaffleState",
    params: {},
  })

  async function updateRaffleState() {
    const updateState = await getRaffleState()
    console.log(updateState)
  }

  useState(() => {
    updateRaffleState()
  }, [])

  async function updateUI() {
    const updateEntranceFee = (await getEntranceFee()).toString()
    setEntranceFee(updateEntranceFee)
    const updateNumPlayers = (await getNumberOfPlayers()).toString()
    setNumPlayers(updateNumPlayers)
    const updateRecentWinner = (await getRecentWinner()).toString()
    setRecentWinner(updateRecentWinner)
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
      if (typeof window !== "undefined") {
        if (window.localStorage.getItem("Connected")) {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner() //signer preso dal wallet di chi si connette
          const contract = new ethers.Contract(contractAddress.toString(), abi, signer)
          console.log(contract.fulfillRandomWords)
        }
      }
    }
  }, [isWeb3Enabled])

  const handleSuccess = async (tx) => {
    await tx.wait(1)
    handleNewnotification(tx)
    updateUI()
  }

  const handleNewnotification = () => {
    dispatch({
      type: "info",
      title: "Tx correctly executed",
      message: "You correctly entered the Raffle",
      position: "topR",
      icon: <Checkmark fontSize="50px" color="#000000" title="Check Icon" />,
    })
  }

  return contractAddress ? (
    <div className="p-5 font-mono">
      Let's jump in the fairest Ethereum-based raffle---{">"}{" "}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto, ml-10"
        onClick={async () => {
          await enterRaffle({
            onSuccess: handleSuccess,
            onError: (error) => {
              console.log(error)
            },
          })
        }}
        disabled={isLoading || isFetching}
      >
        {isLoading || isFetching ? (
          <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
        ) : (
          <div>Enter Raffle</div>
        )}
      </button>
      <div className="border-b-2 flex flex-row border-blue-100">
        <h2 className="font-mono animate-pulse text-blue-500 ">Lottery Info</h2>{" "}
      </div>
      <div className="font-mono">
        EntranceFee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
      </div>{" "}
      <div className="font-mono">Number of Players: {numPlayers} </div>
      <div className="font-mono">Last Winner: {recentWinner} </div>
      <div>WHATS'APPPPPPPPPP</div>
    </div>
  ) : (
    <div>No valid raffle address has been found</div>
  )
}
