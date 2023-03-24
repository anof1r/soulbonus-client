import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useSelector } from 'react-redux';
import { useContractRead } from "wagmi";
import { useContractEvent } from "wagmi";
import Soulbonus from "./../Soulbonus.json";




export const useReadNameCompany = () => {
  const SoulbonusAddress = useSelector(
    (state) => state.wallet.contractAddress
  );
  const { data, isError, status } = useContractRead({
    address: SoulbonusAddress,
    abi: Soulbonus.abi,
    functionName: "name",
  });
  const [
    nameCompanyAppData,
    nameCompanyError,
    nameCompanyStatus,
  ] = [data, isError, status];
  console.log(nameCompanyStatus);
  return {
    nameCompanyAppData,
    nameCompanyError,
    nameCompanyStatus
  }

}



export const useReadBasicToConvertCompany = () => {
  const SoulbonusAddress = useSelector(
    (state) => state.wallet.contractAddress
  );
  const { data, isError, status } = useContractRead({
    address: SoulbonusAddress,
    abi: Soulbonus.abi,
    functionName: "basicToConvert",
  });
  const [
    basicToConvertAppData,
    basicToConvertError,
    basicToConvertLoading,
  ] = [data, isError, status];
  return{
    basicToConvertAppData,
    basicToConvertError,
    basicToConvertLoading
  }

}


export const useGetUserBalanceBasicApp = (userAddress) => {
  const SoulbonusAddress = useSelector(
    (state) => state.wallet.contractAddress
  );
  const { data, isError, status } = useContractRead({
    address: SoulbonusAddress,
    abi: Soulbonus.abi,
    functionName: "getUserBalanceBasic",
    args: [userAddress],
  });
  const [
    userBalanceBasicAppData,
    userBalanceBasicAppIsError,
    userBalanceBasicAppIsLoading,
  ] = [data, isError, status];
  return {
      userBalanceBasicAppData,
      userBalanceBasicAppIsError,
      userBalanceBasicAppIsLoading
    }
  ;
};
export const useGetUserBalanceSuper = (userAddress) => {
  const SoulbonusAddress = useSelector(
    (state) => state.wallet.contractAddress
  );
  const { data, isError, status } = useContractRead({
    address: SoulbonusAddress,
    abi: Soulbonus.abi,
    functionName: "getUserBalanceSuper",
    args: [userAddress],
  });
  const [
    userBalanceSuperAppData,
    userBalanceSuperAppIsError,
    userBalanceSuperAppIsLoading,
  ] = [data, isError, status];
  return {
    userBalanceSuperAppData,
    userBalanceSuperAppIsError,
    userBalanceSuperAppIsLoading
  }
  ;
};
export const useTotalBasic = () => {
  const SoulbonusAddress = useSelector(
    (state) => state.wallet.contractAddress
  );
  const { data, isError, isLoading } = useContractRead({
    address: SoulbonusAddress, // paste address
    abi: Soulbonus.abi, // paste ABI
    functionName: "totalBasic",
  });
  const [totalBasicData, totalBasicIsError, totalBasicIsLoading] = [
    data,
    isError,
    isLoading,
  ];
  return { totalBasicData, totalBasicIsError, totalBasicIsLoading };
};

export function useTotalSuper() {
  const SoulbonusAddress = useSelector(
    (state) => state.wallet.contractAddress
  );
  const { data, isError, isLoading } = useContractRead({
    address: SoulbonusAddress, // paste address
    abi: Soulbonus.abi, // paste ABI
    functionName: "totalSuper",
  });
  const [totalSuperData, totalSuperIsError, totalSuperIsLoading] = [
    data,
    isError,
    isLoading,
  ];
  return { totalSuperData, totalSuperIsError, totalSuperIsLoading };
}
//getUri
export function useGetURIBasic() {
  const SoulbonusAddress = useSelector(
    (state) => state.wallet.contractAddress
  );
  const { data, isError, isLoading } = useContractRead({
    address: SoulbonusAddress, // paste address
    abi: Soulbonus.abi, // paste ABI
    functionName: "getTokenUri",
    args: ["0"],
  });
  const [URIBasicData] = [data];
  return [URIBasicData];
}
export function useGetURISuper() {
  const SoulbonusAddress = useSelector(
    (state) => state.wallet.contractAddress
  );
  const { data, isError, isLoading } = useContractRead({
    address: SoulbonusAddress, // paste address
    abi: Soulbonus.abi, // paste ABI
    functionName: "getTokenUri",
    args: ["1"],
  });
  const [URISuperData] = [data];
  return [URISuperData];
}

export const useEvents = (setbBasicToken, basicToken, setSuperToken, superToken, userAddress) => {
  const SoulbonusAddress = useSelector(
    (state) => state.wallet.contractAddress
  );
  const toast = useToast();
  const BasicTokenMintedEvent = useContractEvent({
    address: SoulbonusAddress,
    abi: Soulbonus.abi,
    eventName: "BasicTokenMinted",
    listener(to) {
      console.log(to);
      if (userAddress == to) {

        setbBasicToken({ ...basicToken, _hex: Number(basicToken._hex) + 1 })
        toast({
          isClosable: true,
          render: () => (
            <Box
              color="white"
              textAlign="center"
              p={5}
              borderRadius="10px"
              bg="purple.800"
            >
              Token minted to {`${to.substring(0, 5)}...${to.substring(37, 42)}`}!
            </Box>
          ),
        });
      }
    },
  });
  const TokensUpgradedEvent = useContractEvent({
    address: SoulbonusAddress,
    abi: Soulbonus.abi,
    eventName: "TokensUpgraded",
    listener(to) {
      if (userAddress == to) {
        setSuperToken({ ...superToken, _hex: Number(superToken._hex) + 1 })
        toast({
          isClosable: true,
          render: () => (
            <Box
              color="white"
              textAlign="center"
              p={5}
              borderRadius="10px"
              bg="purple.800"
            >
              Token upgraded to {`${to.substring(0, 5)}...${to.substring(37, 42)}`}!
            </Box>
          ),
        });
      }
    },
  });
  const SuperTokenBurnedEvent = useContractEvent({
    address: SoulbonusAddress,
    abi: Soulbonus.abi,
    eventName: "SuperTokenBurned",
    listener(from) {
      if (userAddress == from) {
        toast({
          render: () => (
            <Box
              color="white"
              textAlign="center"
              p={5}
              borderRadius="10px"
              bg="purple.800"
            >
              Token burned from {`${from.substring(0, 5)}...${from.substring(37, 42)}`}!
            </Box>
          ),
        });
      }
    },
  });
};
