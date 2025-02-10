// Navigation System
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.page-section');
    
    function hideAllSections() {
        sections.forEach(section => {
            section.classList.remove('active');
        });
    }

    function removeActiveFromNav() {
        navItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    function showSection(sectionId) {
        hideAllSections();
        removeActiveFromNav();

        // Show selected section
        const section = document.querySelector(sectionId);
        if (section) {
            section.classList.add('active');
        }

        // Update nav item
        const navItem = document.querySelector(`[href="${sectionId}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }
    }

    // Add click handlers to nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            showSection(targetId);
        });
    });

    // Show initial section
    const hash = window.location.hash || '#main';
    showSection(hash);
});

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

    // Initialize task verification when page loads
    const taskVerification = new TaskVerification();
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

    async completeTask(taskId, points) {
        if (this.userData.completedTasks.includes(taskId)) {
            return false;
        }

        const taskVerification = new TaskVerification();
        let isVerified = false;

        // Task türüne göre doğrulama yap
        switch (taskId) {
            case 'twitter':
                isVerified = await taskVerification.checkTwitterFollow();
                break;
            case 'telegram-channel':
                isVerified = await taskVerification.checkTelegramChannel();
                break;
            case 'telegram-group':
                isVerified = await taskVerification.checkTelegramGroup();
                break;
            case 'discord':
                isVerified = await taskVerification.checkDiscordJoin();
                break;
        }

        if (isVerified) {
            this.userData.completedTasks.push(taskId);
            this.userData.totalPoints += points;
            this.saveUserData();
            return true;
        }

        showNotification('Please complete the task first!');
        return false;
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
    button.addEventListener('click', async (e) => {
        const taskItem = e.target.closest('.task-item');
        const taskId = taskItem.dataset.taskId;
        const points = parseInt(taskItem.querySelector('.task-points').textContent);
        
        button.disabled = true;
        button.textContent = 'Verifying...';

        if (await userManager.completeTask(taskId, points)) {
            showNotification(`Task completed! Earned ${points} points!`);
            button.textContent = 'Completed';
        } else {
            button.disabled = false;
            button.textContent = 'Verify';
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

// Sosyal medya görevleri için kontrol fonksiyonları
class TaskVerification {
    constructor() {
        this.BOT_TOKEN = '7940510295:AAHSTbB-TPOCQdWtIBthuJyTwjoy9YR11eA';
        this.initializeVerifyButtons();
    }

    initializeVerifyButtons() {
        document.querySelectorAll('.task-action-verify').forEach(button => {
            const taskItem = button.closest('.task-item');
            const taskId = taskItem.dataset.taskId;
            
            // Add click event listener
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                
                // Open bot in new tab
                window.open(`https://t.me/flox_verify_bot?start=verify_${taskId}`, '_blank');
            });
        });
    }

    async verifyTask(taskId) {
        const verifyButton = document.querySelector(`[data-task-id="${taskId}"] .task-action-verify`);
        verifyButton.disabled = true;
        verifyButton.textContent = 'Verifying...';

        try {
            const response = await fetch(`https://api.telegram.org/bot${this.BOT_TOKEN}/getChatMember`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: this.getChatId(taskId),
                    user_id: tg.initDataUnsafe?.user?.id
                })
            });

            const data = await response.json();
            
            if (data.ok && ['member', 'administrator', 'creator'].includes(data.result?.status)) {
                verifyButton.textContent = 'Completed';
                const points = parseInt(verifyButton.closest('.task-item').querySelector('.task-points').textContent);
                await userManager.addPoints(points);
                showNotification(`Task completed! Earned ${points} points!`);
                return true;
            }
            
            verifyButton.disabled = false;
            verifyButton.textContent = 'Verify';
            showNotification('Please join first!');
            return false;
        } catch (error) {
            console.error('Verification failed:', error);
            verifyButton.disabled = false;
            verifyButton.textContent = 'Verify';
            showNotification('Verification failed. Please try again.');
            return false;
        }
    }

    async checkVerificationStatus(taskId) {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 20; // 60 saniye max bekleme süresi

            const checkInterval = setInterval(async () => {
                attempts++;
                try {
                    const response = await fetch(`https://api.telegram.org/bot${this.BOT_TOKEN}/getChatMember`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            chat_id: this.getChatId(taskId),
                            user_id: tg.initDataUnsafe?.user?.id
                        })
                    });

                    const data = await response.json();
                    
                    if (data.ok && ['member', 'administrator', 'creator'].includes(data.result?.status)) {
                        clearInterval(checkInterval);
                        resolve(true);
                        return;
                    }

                    if (attempts >= maxAttempts) {
                        clearInterval(checkInterval);
                        resolve(false);
                    }
                } catch (error) {
                    console.error('Status check failed:', error);
                    clearInterval(checkInterval);
                    resolve(false);
                }
            }, 3000); // Her 3 saniyede bir kontrol et
        });
    }

    getChatId(taskId) {
        switch (taskId) {
            case 'telegram_channel':
                return '@floxcommunityc';
            case 'telegram_group':
                return '@floxcommunity';
            default:
                return '';
        }
    }
}

// Event listeners for verify buttons
document.querySelectorAll('.task-action-verify').forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const taskItem = e.target.closest('.task-item');
        const taskId = taskItem.dataset.taskId;
        
        const verification = new TaskVerification();
        await verification.verifyTask(taskId);
    });
});

// Task butonları için event listener
document.querySelectorAll('.task-action').forEach(button => {
    button.addEventListener('click', async (e) => {
        const taskItem = e.target.closest('.task-item');
        const taskId = taskItem.dataset.taskId;
        const points = parseInt(taskItem.querySelector('.task-points').textContent);
        
        button.disabled = true;
        button.textContent = 'Verifying...';

        const taskVerification = new TaskVerification();
        const isVerified = await taskVerification.verifyTask(taskId);

        if (isVerified) {
            await userManager.completeTask(taskId, points);
            showNotification(`Task completed! Earned ${points} points!`);
            button.textContent = 'Completed';
        } else {
            button.disabled = false;
            button.textContent = 'Verify';
            showNotification('Please complete the task first!');
        }
    });
});

// TaskVerification instance'ını oluştur
const taskVerification = new TaskVerification();
