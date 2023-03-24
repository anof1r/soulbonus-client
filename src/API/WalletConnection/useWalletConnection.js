
export const checkWalletConnection = async () => {
    if (window.ethereum) {
        const walletAddress = await window.ethereum.request({
            method: 'eth_accounts'
        })
        if (walletAddress.length) {
            let provider;
            if (window.ethereum.providers?.length) {
                provider = window.ethereum.selectedProvider;
            } else {
                provider = window.ethereum;
            }
            setListeners(provider)
            return {
                address: walletAddress[0],
                type: provider.isCoinbaseWallet ? 'coinbase' : 'metamask',
            }
        }
    }
}

export const requestEth = async (walletType) => {
    let provider;
    if (window.ethereum.providers?.length) {
        if (walletType === 'metamask') {
            provider = window.ethereum.providers.find(provider => provider?.isMetaMask)
        } else if (walletType === 'coinbase') {
            provider = window.ethereum.providers.find(provider => provider?.isCoinbaseWallet)
        }
    } else {
        provider = window.ethereum;
    }
    const walletAddress = await provider.request({
        method: 'eth_requestAccounts'
    })
    setListeners(provider)
    return {
        address: walletAddress[0],
        type: walletType,
    }
}

function setListeners(provider) {
    provider.on('accountsChanged', async (accounts) => {
        if (accounts.length) {
            const account = accounts[0]
            console.log(account);
        } else {
            window.location.replace("/");
        }
    })
    provider.on('chainChanged', (chainId) => {
        console.log(chainId);
    })
}






