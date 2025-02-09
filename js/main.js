document.addEventListener('DOMContentLoaded', function() {
    // Tüm nav-item'ları seç
    const navItems = document.querySelectorAll('.nav-item');

    
    
    // Her nav-item için click event listener ekle
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Aktif nav-item'ı güncelle
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            tg.setHeaderColor('bg_color'); // 'bg_color', Telegram tema rengini kullanır

            
            // Hangi sayfanın gösterileceğini belirle
            const pageId = this.getAttribute('data-page');
            
            // Tüm sayfaları gizle
            document.querySelectorAll('.page-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Seçilen sayfayı göster
            document.getElementById(pageId).style.display = 'block';
        });
    });
});

// Telegram WebApp başlatma
const tg = window.Telegram.WebApp;
// Header rengini siyah yap


// WebApp'i başlat
tg.expand(); // Mini App'i tam ekran yap

// Telegram tema renklerini uygula
document.documentElement.style.setProperty('--accent-color', tg.themeParams.button_color || '#0066FF');
document.documentElement.style.setProperty('--text-color', tg.themeParams.text_color || '#FFFFFF');
document.documentElement.style.setProperty('--bg-color', tg.themeParams.bg_color || '#000000');

// Telegram kullanıcı bilgilerini al
const user = tg.initDataUnsafe?.user;
if (user) {
    // Kullanıcı bilgilerini güncelle
    const userTag = document.querySelector('.user-tag');
    if (userTag) {
        userTag.textContent = `@${user.username || 'anonymous'}`;
    }
    
    // Referral linkini güncelle
    const shareLink = document.querySelector('.share-link input');
    if (shareLink) {
        shareLink.value = `https://t.me/flox_bot/start?ref=${user.id}`;
    }
}

// OG Role Task için tıklama olayı
document.querySelector('.airdrop-task').addEventListener('click', () => {
    // Telegram botuna yönlendir
    window.open('https://t.me/flox_bot?start=og_role', '_blank');
});

// MainButton'ı göster (isteğe bağlı)
tg.MainButton.setText('Get OG Role').show();
tg.MainButton.onClick(() => {
    window.open('https://t.me/flox_bot?start=og_role', '_blank');
});

// Tema değişikliklerini dinle
tg.onEvent('themeChanged', () => {
    document.documentElement.style.setProperty('--accent-color', tg.themeParams.button_color || '#0066FF');
    document.documentElement.style.setProperty('--text-color', tg.themeParams.text_color || '#FFFFFF');
    document.documentElement.style.setProperty('--bg-color', tg.themeParams.bg_color || '#000000');
});

// Bot API entegrasyonu için yardımcı fonksiyon
async function sendTelegramMessage(method, data) {
    const BOT_TOKEN = '7298089680:AAGsZ4iTN1R-zuG2BDGu5lVL1MQJB_tOPcU';
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// Task tamamlama işlevini güncelle
async function completeTask(taskId, button) {
    if (!userState.completedTasks.includes(taskId)) {
        try {
            // Telegram bot'una task tamamlama bildirimi gönder
            await sendTelegramMessage('sendMessage', {
                chat_id: user.id,
                text: `Task completed: ${taskId}`
            });
            
            userState.balance += 20000;
            userState.completedTasks.push(taskId);
            saveUserState();
            updateUI();
            
            button.textContent = 'Completed';
            button.disabled = true;
            
            showNotification('Task completed! +20000 points');
        } catch (error) {
            console.error('Task completion failed:', error);
            showNotification('Task verification failed. Please try again.', 'error');
        }
    }
}
