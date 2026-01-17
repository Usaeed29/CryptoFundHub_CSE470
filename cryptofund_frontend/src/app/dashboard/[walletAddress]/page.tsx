'use client';
import { client } from "@/app/client";
import { CROWDFUNDING_FACTORY } from "@/app/constants/contracts";
import { MyCampaignCard } from "@/components/MyCampaignCard";
import { useState } from "react";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useActiveAccount, useReadContract } from "thirdweb/react";

export default function DashboardPage() {
  const account = useActiveAccount();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Factory contract (Sepolia)
  const contract = getContract({
    client,
    chain: sepolia,
    address: CROWDFUNDING_FACTORY,
  });

  // Get campaigns for the connected user
  const {
    data: myCampaigns,
    isLoading: isLoadingMyCampaigns,
    refetch,
  } = useReadContract({
    contract,
    method:
      "function getUserCampaigns(address _user) view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: [account?.address as string],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 mt-16 sm:px-6 lg:px-8">
      <div className="flex flex-row justify-between items-center mb-8">
        <p className="text-4xl font-semibold">Dashboard</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Create Campaign
        </button>
      </div>

      <p className="text-2xl font-semibold mb-4">My Campaigns:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {!isLoadingMyCampaigns && (
          myCampaigns && myCampaigns.length > 0 ? (
            myCampaigns.map((campaign: any, index: number) => (
              <MyCampaignCard
                key={index}
                contractAddress={campaign.campaignAddress}
              />
            ))
          ) : (
            <p>No campaigns</p>
          )
        )}
      </div>

      {isModalOpen && (
        <CreateCampaignModal
          setIsModalOpen={setIsModalOpen}
          refetch={refetch}
          factoryContract={contract} // 👈 pass the factory contract down
        />
      )}
    </div>
  );
}

type CreateCampaignModalProps = {
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
  factoryContract: any;
};

const CreateCampaignModal = ({
  setIsModalOpen,
  refetch,
  factoryContract,
}: CreateCampaignModalProps) => {
  const account = useActiveAccount();
  const [isDeployingContract, setIsDeployingContract] = useState<boolean>(false);
  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [campaignGoal, setCampaignGoal] = useState<number>(1);
  const [campaignDeadline, setCampaignDeadline] = useState<number>(1);

  // NOTE: If your Solidity expects goal in wei, convert here:
  // import { toWei } from "thirdweb/utils";
  // const goalForContract = toWei(campaignGoal.toString());
  const goalForContract = campaignGoal;

  const handleDeployContract = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }
    setIsDeployingContract(true);
    try {
      console.log("Creating campaign via factory...");

      const tx = prepareContractCall({
        contract: factoryContract,
        method:
          "function createCampaign(string,string,uint256,uint256) returns (address)",
        params: [
          campaignName,
          campaignDescription,
          goalForContract,
          campaignDeadline,
        ],
      });

      await sendTransaction({ transaction: tx, account });

      alert("Campaign created successfully!");
      await refetch(); // 👈 actually re-fetch the list
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create campaign. Check console for details.");
    } finally {
      setIsDeployingContract(false);
    }
  };

  const handleCampaignGoal = (value: number) => {
    setCampaignGoal(Math.max(1, value));
  };

  const handleCampaignLengthChange = (value: number) => {
    setCampaignDeadline(Math.max(1, value));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-100 p-6 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Create a Campaign</p>
          <button
            className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="flex flex-col">
          <label>Campaign Name:</label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Campaign Name"
            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
          />

          <label>Campaign Description:</label>
          <textarea
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
            placeholder="Campaign Description"
            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
          />

          <label>Campaign Goal:</label>
          <input
            type="number"
            value={campaignGoal}
            onChange={(e) => handleCampaignGoal(parseInt(e.target.value || "1", 10))}
            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
          />

          <label>Campaign Length (Days)</label>
          <input
            type="number"
            value={campaignDeadline}
            onChange={(e) =>
              handleCampaignLengthChange(parseInt(e.target.value || "1", 10))
            }
            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
          />

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleDeployContract}
            disabled={isDeployingContract}
          >
            {isDeployingContract ? "Creating Campaign..." : "Create Campaign"}
          </button>
        </div>
      </div>
    </div>
  );
};
