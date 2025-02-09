document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Initialize TON Connect
        window.tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: 'https://hasan199191.github.io/my-ton-app/tonconnect-manifest.json',
            buttonRootId: 'connect-container',
            uiPreferences: {
                theme: TON_CONNECT_UI.THEME.DARK
            }
        });

        console.log('TON Connect UI initialized');

        // Listen for wallet connection status changes
        tonConnectUI.onStatusChange(async (wallet) => {
            const walletInfo = document.getElementById('wallet-info');
            const walletAddress = document.getElementById('wallet-address');
            
            if (wallet) {
                console.log('Wallet connected:', wallet);
                const address = wallet.account.address;
                const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
                
                walletAddress.textContent = `Connected: ${shortAddress}`;
                walletInfo.style.display = 'block';

                // Optional: Fetch balance
                try {
                    const balance = await tonConnectUI.provider.getBalance(address);
                    document.getElementById('wallet-balance').textContent = 
                        `Balance: ${balance} TON`;
                } catch (error) {
                    console.error('Error fetching balance:', error);
                }
            } else {
                console.log('Wallet disconnected');
                walletInfo.style.display = 'none';
                walletAddress.textContent = '';
                document.getElementById('wallet-balance').textContent = '';
            }
        });

    } catch (error) {
        console.error('TON Connect initialization error:', error);
    }
}); 