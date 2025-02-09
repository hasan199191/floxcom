// TON Connect entegrasyonu için ayrı script
document.addEventListener('DOMContentLoaded', function() {
    try {
        // TON Connect başlatma
        const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: 'tonconnect-manifest.json',
            buttonRootId: 'connect-container'
        });

        console.log('TON Connect UI initialized'); // Debug için

        // Wallet bağlantı durumunu dinle
        tonConnectUI.onStatusChange((wallet) => {
            console.log('Wallet status changed:', wallet); // Debug için
            const walletMessage = document.querySelector('.wallet-message');
            
            if (wallet) {
                walletMessage.textContent = `Connected: ${wallet.account.address.slice(0, 8)}...${wallet.account.address.slice(-6)}`;
            } else {
                walletMessage.textContent = 'Please connect your wallet';
            }
        });
    } catch (error) {
        console.error('TON Connect initialization error:', error);
    }
}); 