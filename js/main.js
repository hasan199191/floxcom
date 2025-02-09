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

// Kullanıcı verilerini yönetmek için class
class UserManager {
    constructor() {
        this.userData = {
            totalPoints: 0,          // Ana bakiye
            farmingPoints: 0,        // Farming ile biriken puan
            lastClaimTime: Date.now(), // Son claim zamanı
            farmRate: 0.3,           // Saniye başına kazanılan puan
        };
        this.loadUserData();
        this.startFarmingTimer();
    }

    loadUserData() {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            this.userData = JSON.parse(savedData);
        }
    }

    saveUserData() {
        localStorage.setItem('userData', JSON.stringify(this.userData));
    }

    // Farming puanlarını hesapla
    calculateFarmingPoints() {
        const now = Date.now();
        const secondsElapsed = (now - this.userData.lastClaimTime) / 1000;
        return secondsElapsed * this.userData.farmRate;
    }

    // Claim işlemi
    claimPoints() {
        const farmedPoints = Math.floor(this.calculateFarmingPoints() * 1000) / 1000;
        if (farmedPoints > 0) {
            this.userData.totalPoints += farmedPoints;
            this.userData.lastClaimTime = Date.now();
            this.saveUserData();
        }
        return farmedPoints;
    }

    updateUI() {
        // Ana bakiye güncelleme
        const balanceAmount = document.querySelector('.balance-amount');
        if (balanceAmount) {
            const total = Math.floor(this.userData.totalPoints * 1000) / 1000;
            const mainPart = Math.floor(total);
            const decimalPart = (total - mainPart).toFixed(3).substring(2);
            balanceAmount.innerHTML = `${mainPart}<span class="decimal">.${decimalPart}</span>`;
        }

        // Farming miktarı güncelleme
        const farmingAmount = document.querySelector('.farming-amount');
        if (farmingAmount) {
            const currentFarming = this.calculateFarmingPoints();
            farmingAmount.textContent = currentFarming.toFixed(3);
        }

        // Progress bar güncelleme
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            const progress = Math.min((this.calculateFarmingPoints() / 100) * 100, 100);
            progressFill.style.width = `${progress}%`;
        }
    }

    startFarmingTimer() {
        setInterval(() => {
            this.updateUI();
        }, 1000); // Her saniye güncelle
    }
}

// UserManager'ı başlat
const userManager = new UserManager();

// Claim butonu için event listener
document.getElementById('claimBtn').addEventListener('click', () => {
    const earned = userManager.claimPoints();
    showNotification(`Claimed ${earned.toFixed(3)} points!`);
});

// Task butonları için event listener
document.querySelectorAll('.task-action').forEach(button => {
    button.addEventListener('click', (e) => {
        const taskId = e.target.closest('.task-item').dataset.taskId;
        const points = parseInt(e.target.closest('.task-item').querySelector('.task-points').textContent);
        
        if (userManager.completeTask(taskId, points)) {
            showNotification(`Earned ${points} points!`);
            button.disabled = true;
            button.textContent = 'Completed';
        }
    });
});

// Her 5 saniyede bir UI'ı güncelle
setInterval(() => {
    userManager.updateUI();
}, 5000);

// Bildirim gösterme fonksiyonu
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
