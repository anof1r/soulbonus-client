const walletState = {
  contractAddress: '0x25F927a1B954842719D9d62FB3f565284deB1816',
  pinataLink: 'QmYDGFMDcQTGShjG9ijF5e2RV2qLGCYH7kX7vucCNU4XaD',
  address: null,
  type: null,
};

export const walletReducer = (state = walletState, action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload.address,
        type: action.payload.type,
      };
    case "CHANGE_CONTRACT_ADDRESS":
      return {
        ...state,
        contractAddress: action.payload.contractAddress,
      };
    case "CHANGE_PINATA_LINK":
      return {
        ...state,
        pinataLink: action.payload.pinataLink,
      };
    case "CHANGE_CONTRACT_ADDRESS":
      return {
        ...state,
        contractAddress: action.payload.contractAddress,
      };
    case "CHANGE_COMPANY_SETTINGS":
      return {
        ...state,
        companyName: action.payload.localStateCompanyName,
        companyImage: action.payload.localStateImage,
      };
    case "CHANGE_BONUS_DETAILS":
      return {
        ...state,
        bgColorCompany: action.payload.localColor,
        countSilverToMintGold: action.payload.sliderValue,
        GoldBonusDescription: action.payload.localBonusDescription,
        bonusImg: action.payload.localStateBonusImg,
      };
    case "LOGOUT":
      return {
        ...state,
        address: null,
        type: null,
      };
    default:
      return state;
  }
};
