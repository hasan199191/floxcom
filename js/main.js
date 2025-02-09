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

// Bottom bar rengini siyah yap
tg.setBackgroundColor('#000000'); // Bottom bar rengini siyah yap


// Telegram tema renklerini al
const bgColor = tg.themeParams.bg_color || '#000000'; // Varsayılan olarak siyah

// Arka plan rengini uygula
document.body.style.backgroundColor = bgColor;
            
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

// WebApp'i başlat ve tema ayarlarını yap
window.Telegram.WebApp.ready();

// Header ve arka plan rengini siyah yap
tg.setHeaderColor('#000000');
tg.setBackgroundColor('#000000');

// Temayı強制的に dark mode yap
tg.themeParams.bg_color = '#000000';
tg.themeParams.text_color = '#FFFFFF';
tg.themeParams.hint_color = '#999999';
tg.themeParams.link_color = '#FFFFFF';
tg.themeParams.button_color = '#FFFFFF';
tg.themeParams.button_text_color = '#000000';

// WebApp'i genişlet
tg.expand();

// CSS değişkenlerini güncelle
document.documentElement.style.setProperty('--primary-color', '#000000');
document.documentElement.style.setProperty('--bg-color', '#000000');
document.documentElement.style.setProperty('--text-color', '#FFFFFF');
document.documentElement.style.setProperty('--accent-color', '#FFFFFF');

// Tema kontrolü için yeni kod
window.Telegram.WebApp.ready();
const colorScheme = window.Telegram.WebApp.colorScheme;

if (colorScheme === 'dark') {
  document.body.classList.add('dark-theme');
}

// Header rengini siyah yap


// WebApp'i başlat
tg.expand(); // Mini App'i tam ekran yap

// Telegram tema renklerini uygula
document.documentElement.style.setProperty('--accent-color', '#FFFFFF'); // Mavi yerine beyaz
document.documentElement.style.setProperty('--text-color', '#FFFFFF');
document.documentElement.style.setProperty('--bg-color', '#000000');

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

// MainButton'ı gizle (eski kodu kaldır veya yoruma al)
// tg.MainButton.setText('Get OG Role').show();
// tg.MainButton.onClick(() => {
//     window.open('https://t.me/flox_bot?start=og_role', '_blank');
// });

// Bottom bar rengini siyah yap
tg.setBackgroundColor('#000000');
tg.setHeaderColor('#000000');

// Tema değişikliklerini dinle
tg.onEvent('themeChanged', () => {
    document.documentElement.style.setProperty('--accent-color', '#FFFFFF'); // Mavi yerine beyaz
    document.documentElement.style.setProperty('--text-color', '#FFFFFF');
    document.documentElement.style.setProperty('--bg-color', '#000000');
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
