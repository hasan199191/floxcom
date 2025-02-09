document.addEventListener('DOMContentLoaded', function() {
    try {
        // TON Connect başlatma
        const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: '/floxcom/tonconnect-manifest.json', // Manifest yolunu düzelttik
            buttonRootId: 'connect-container',
            language: 'en',
            uiPreferences: {
                theme: 'DARK',
                colorsSet: {
                    connectButton: {
                        background: '#0066FF',
                        foreground: '#FFFFFF'
                    }
                }
            }
        });

        console.log('TON Connect UI initialized'); // Debug için

        // Wallet sayfasına geçildiğinde butonu güncelle
        const walletTab = document.querySelector('[data-page="wallet"]');
        if (walletTab) {
            walletTab.addEventListener('click', () => {
                setTimeout(() => {
                    tonConnectUI.connectButton?.update();
                }, 100);
            });
        }

        // Wallet bağlantı durumunu dinle
        tonConnectUI.onStatusChange((wallet) => {
            console.log('Wallet status changed:', wallet); // Debug için
            const walletMessage = document.querySelector('.wallet-message');
            const walletInfo = document.querySelector('.wallet-info');
            
            if (wallet) {
                walletMessage.textContent = `Connected: ${wallet.account.address.slice(0, 8)}...${wallet.account.address.slice(-6)}`;
                if (walletInfo) {
                    walletInfo.style.display = 'block';
                }
            } else {
                walletMessage.textContent = 'Please connect your wallet';
                if (walletInfo) {
                    walletInfo.style.display = 'none';
                }
            }
        });
    } catch (error) {
        console.error('TON Connect initialization error:', error);
    }
}); 