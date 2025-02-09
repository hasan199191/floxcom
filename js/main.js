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