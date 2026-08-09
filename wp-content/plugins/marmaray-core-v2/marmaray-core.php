<?php
/**
 * Plugin Name:       MarmarayApp Çekirdek Eklentisi
 * Plugin URI:        https://marmarayapp.com
 * Description:       Marmaray canlı takip sistemi, sefer saatleri, güzergah haritası ve ücret hesaplama. Yönetim panelinden tüm ayarları düzenleyebilirsiniz.
 * Version:           2.4.0
 * Author:            MarmarayApp Geliştirici Ekibi
 * Author URI:        https://marmarayapp.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       marmarayapp
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Doğrudan erişimi engelle
}

// ============================================================
// SABİTLER
// ============================================================
define( 'MARMARAYAPP_VERSION', '2.4.0' );
define( 'MARMARAYAPP_DIR',     plugin_dir_path( __FILE__ ) );
define( 'MARMARAYAPP_URL',     plugin_dir_url( __FILE__ ) );

// ============================================================
// AKTİVASYON / DEAKTİVASYON
// ============================================================
register_activation_hook( __FILE__,   'marmarayapp_activate'   );
register_deactivation_hook( __FILE__, 'marmarayapp_deactivate' );

function marmarayapp_activate() {
    // Varsayılan ayarları kaydet (eğer henüz yoksa)
    $defaults = [
        'duyuru_metni'   => 'Güncel Sefer Duyurusu: Tüm Marmaray seferleri normal zamanında ve planlanan aralıklarla yapılmaktadır. İyi yolculuklar dileriz.',
        'varsayilan_tema' => 'light',
        'sefer_sikligi'  => 'hafta_ici',
        'site_basligi'   => 'MarmarayApp',
        'harita_zoom_min' => 0.55,
        'harita_zoom_max' => 3.0,
        'guncelleme_araligi' => 30,
    ];
    foreach ( $defaults as $anahtar => $deger ) {
        if ( false === get_option( 'marmarayapp_' . $anahtar ) ) {
            add_option( 'marmarayapp_' . $anahtar, $deger );
        }
    }
    
    // Sayfaları otomatik oluştur
    $pages = [
        'rota-planla' => [
            'title' => 'Rota Planla',
            'content' => '[marmaray_rota_planla]'
        ],
        'ucret-hesapla' => [
            'title' => 'Ücret Hesapla',
            'content' => '[marmaray_ucret]'
        ],
        'iletisim' => [
            'title' => 'İletişim',
            'content' => '<h2>Kurumsal İletişim Kanalları</h2><p>MarmarayApp hizmetleriyle ilgili her türlü görüş, öneri, hata bildirimi ve işbirliği teklifleri için bizimle iletişime geçebilirsiniz.</p><h3>Destek ve İletişim Formu</h3><p>Şu an için tüm taleplerinizi <strong>destek@marmarayapp.com</strong> e-posta adresi üzerinden yazılı olarak kabul etmekteyiz. Gelen tüm e-postalar destek ekibimiz tarafından 48 saat içerisinde değerlendirilerek yanıtlanmaktadır.</p><h3>Basın ve Medya</h3><p>Basın bültenleri, röportaj talepleri ve medya kitimiz için lütfen <strong>basin@marmarayapp.com</strong> adresi üzerinden iletişime geçiniz.</p>'
        ],
        'hakkimizda' => [
            'title' => 'Hakkımızda',
            'content' => '<h2>MarmarayApp Hakkında</h2><p>MarmarayApp, Türkiye\'nin en çok kullanılan raylı sistem hatlarından biri olan Marmaray\'ın kullanıcılarına daha şeffaf, hızlı ve güvenilir bilgi sağlamak amacıyla bağımsız geliştiriciler tarafından hayata geçirilmiş bir projedir.</p><h3>Misyonumuz</h3><p>Günlük milyonlarca yolcunun kullandığı bu devasa ağda, sefer saatlerini, istasyonlar arası süreleri ve anlık konumlandırmaları en pratik şekilde sunarak yolcu deneyimini dijitalleştirmeyi hedefliyoruz.</p><h3>Bağımsızlık Beyanı</h3><p>Platformumuz hiçbir resmi kurum, TCDD veya yerel yönetim ile organik veya inorganik bir bağa sahip değildir. Tamamen kamuya açık verilerin matematiksel modellemeler ve algoritmalar ile işlenerek son kullanıcıya sunulmasından ibarettir.</p>'
        ],
        'sponsorluk' => [
            'title' => 'Reklam ve Sponsorluk',
            'content' => '<h2>Sponsorluk ve Reklam Anlaşmaları</h2><p>MarmarayApp, aylık yüz binlerce tekil kullanıcının ziyaret ettiği, spesifik ve hedef kitle odaklı bir platformdur. Markanızın bilinirliğini artırmak ve doğru kitleye ulaşmak için çeşitli sponsorluk modelleri sunmaktayız.</p><h3>Reklam Alanları</h3><p>Platformumuzda, ana sayfa afiş alanları, istasyon detay sayfalarındaki özel bannerlar ve uygulama içi duyuru panoları gibi çeşitli reklam yerleşimleri bulunmaktadır. Her bir reklam alanı, kullanıcı deneyimini bozmayacak şekilde özenle konumlandırılmıştır.</p><p>Sponsorluk dosyası ve fiyatlandırma detayları için lütfen <strong>info@marmarayapp.com</strong> adresine kurum bilgilerinizi içeren bir e-posta gönderiniz.</p>'
        ],
        'gizlilik-sozlesmesi' => [
            'title' => 'Gizlilik Sözleşmesi',
            'content' => '<h2>1. Taraflar ve Kapsam</h2><p>İşbu Gizlilik Sözleşmesi, MarmarayApp Yönetimi ("Biz", "Platform" veya "MarmarayApp") ile uygulamamızı ve web sitemizi ("Hizmetler") kullanan siz değerli ziyaretçilerimiz ("Kullanıcı") arasında, Hizmetlerin kullanımına ilişkin olarak bilgi toplama, işleme, kullanma, aktarma ve koruma uygulamalarımızı belirlemek üzere akdedilmiştir. Hizmetlerimizi kullanarak işbu Gizlilik Sözleşmesinde belirtilen uygulamaları açıkça kabul etmiş olursunuz.</p><h2>2. Toplanan Veriler ve Edinim Yöntemleri</h2><p>MarmarayApp, sunduğu hizmet kalitesini artırmak ve size daha iyi bir deneyim sunabilmek amacıyla sınırlı düzeyde veri toplamaktadır. Toplanan veriler arasında; IP adresiniz, cihaz modeliniz, tarayıcı sürümünüz, işletim sisteminiz ve Hizmetleri kullanım istatistikleriniz yer almaktadır. Sitemiz, Kullanıcıların isim, soyisim, T.C. kimlik numarası, telefon numarası gibi doğrudan kimlik belirleyici hiçbir kişisel verisini talep etmemekte ve kaydetmemektedir.</p><h2>3. Verilerin İşlenme Amacı</h2><p>Toplanan anonim istatistiki veriler, sefer algoritmalarımızın optimize edilmesi, sunucu yükünün dağıtılması, olası yazılımsal hataların (crash) tespiti ve kullanıcı deneyiminin (UI/UX) iyileştirilmesi gibi tamamen teknik amaçlarla kullanılmaktadır.</p><h2>4. Üçüncü Kişilerle Veri Paylaşımı</h2><p>Kullanıcı verileriniz, yasal zorunluluklar hariç olmak kaydıyla kesinlikle üçüncü şahıs veya kurumlarla satılmaz veya ticari amaçla paylaşılamaz. Ancak uygulama hatalarının takibi için Google Analytics ve Firebase Crashlytics gibi bağımsız analiz araçları aracılığıyla anonim veri paylaşımı yapılabilmektedir.</p><h2>5. Yürürlük ve Değişiklikler</h2><p>MarmarayApp Yönetimi, bu sözleşmeyi dilediği zaman tek taraflı olarak güncelleme hakkını saklı tutar. Değişiklikler sitede yayımlandığı an yürürlüğe girer.</p>'
        ],
        'cerez-politikasi' => [
            'title' => 'Çerez Politikası',
            'content' => '<h2>1. Çerez (Cookie) Nedir?</h2><p>Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza (bilgisayar, tablet, mobil cihaz vb.) depolanan küçük boyutlu metin dosyalarıdır. Çerezler, web sitelerinin daha verimli çalışmasını sağlamanın yanı sıra, sizlere daha kişiselleştirilmiş ve hızlı bir internet deneyimi sunmak amacıyla kullanılmaktadır.</p><h2>2. Kullandığımız Çerez Türleri</h2><h3>2.1. Zorunlu Çerezler</h3><p>Web sitemizin temel işlevlerini yerine getirebilmesi için kesinlikle gerekli olan çerezlerdir. Bu çerezler olmadan sitenin bazı bölümleri, örneğin karanlık/aydınlık tema tercihiniz veya dil seçiminiz çalışmayabilir.</p><h3>2.2. Analitik ve Performans Çerezleri</h3><p>Ziyaretçilerin web sitemizi nasıl kullandığını analiz etmek (örneğin en çok hangi sayfalarda vakit geçirildiği, hangi hata mesajlarının alındığı) için kullanılır. Bu çerezler aracılığıyla toplanan tüm bilgiler anonimleştirilerek birleştirilir.</p><h2>3. Çerez Yönetimi ve Reddetme Hakkı</h2><p>Tarayıcınızın ayarlarını değiştirerek çerezleri reddetme veya silme hakkına her zaman sahipsiniz. Chrome, Safari, Firefox gibi popüler tarayıcıların "Ayarlar/Gizlilik" bölümlerinden çerezleri devre dışı bırakabilirsiniz. Ancak çerezlerin engellenmesi durumunda MarmarayApp\'in bazı özelliklerinin (örneğin tema tercihlerinin kaydedilmesi) düzgün çalışmayabileceğini hatırlatmak isteriz.</p>'
        ],
        'kvkk-aydinlatma-metni' => [
            'title' => 'KVKK Aydınlatma Metni',
            'content' => '<h2>1. Veri Sorumlusunun Kimliği</h2><p>6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, MarmarayApp Yönetimi olarak "Veri Sorumlusu" sıfatıyla, işlediğimiz kişisel verilerinizle ilgili olarak sizi aydınlatmak amacıyla bu metni sunuyoruz.</p><h2>2. İşlenen Kişisel Veriler ve İşlenme Amaçları</h2><p>MarmarayApp, kural olarak ziyaretçilerinden doğrudan kişisel veri (ad, soyad, e-posta) talep etmez. İşlenen yegane veriler; IP adresi, cihaz ve tarayıcı bilgileri gibi teknik log kayıtlarıdır. Bu veriler: (i) 5651 sayılı kanun kapsamındaki yasal yükümlülüklerimizin yerine getirilmesi, (ii) sistem güvenliğinin sağlanması, (iii) hizmetlerimizin iyileştirilmesi amacıyla KVKK Madde 5/2 (f) (meşru menfaat) hukuki sebebine dayanılarak işlenmektedir.</p><h2>3. Kişisel Verilerin Aktarılması</h2><p>Söz konusu teknik log kayıtları ve anonim istatistiksel veriler, kanuni yükümlülüklerimizi yerine getirmek amacıyla talep edilmesi halinde yetkili kamu kurum ve kuruluşları (örneğin mahkemeler veya BTK) ile paylaşılabilir. Bunun dışında herhangi bir ticari aktarım yapılmamaktadır.</p><h2>4. KVKK Madde 11 Kapsamındaki Haklarınız</h2><p>Kanun’un 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme haklarına sahiptir. Bu haklarınızı kullanmak için iletişim kanallarımızdan bize ulaşabilirsiniz.</p>'
        ],
        'uygulamayi-indir' => [
            'title' => 'Uygulamayı İndir',
            'content' => '<h2>MarmarayApp Mobil Uygulaması</h2><p>Web sitemizde sunduğumuz tüm özellikleri, hatta daha fazlasını mobil cihazınızda deneyimlemek için MarmarayApp uygulamasını indirebilirsiniz.</p><h3>Neden Mobil Uygulama?</h3><ul><li><strong>Anlık Bildirimler:</strong> Sefer iptalleri, gecikmeler ve önemli duyurulardan anında haberdar olun.</li><li><strong>Çevrimdışı Mod:</strong> Sık kullandığınız rotaları ve saatleri internet bağlantınız olmadan da görüntüleyin.</li><li><strong>Daha Hızlı Performans:</strong> Cihazınızın yerel donanımını kullanarak çok daha akıcı bir harita deneyimi yaşayın.</li></ul><p>Uygulamamız çok yakında Google Play Store ve Apple App Store\'da yerini alacaktır. Gelişmelerden haberdar olmak için sitemizi takipte kalın.</p>'
        ],
        'sikca-sorulan-sorular' => [
            'title' => 'Sıkça Sorulan Sorular',
            'content' => '<h2>Sıkça Sorulan Sorular (S.S.S)</h2><h3>Canlı takip nasıl çalışır?</h3><p>Sistemimiz, iki istasyon arasındaki ortalama seyahat süresini ve trenlerin bilinen kalkış saatlerini baz alarak algoritmik bir konum tahmini yapar. Bu veriler anlık GPS verisi değildir.</p><h3>Uygulamanız ücretli mi?</h3><p>Hayır, MarmarayApp hem web sitesi hem de mobil uygulama olarak tamamen ücretsizdir. Sunucu maliyetleri uygulamada ve sitede gösterilen reklamlar aracılığıyla karşılanmaktadır.</p><h3>Neden bazı saatlerde farklılıklar oluyor?</h3><p>Marmaray hattındaki yolcu biniş/iniş yoğunluğu, kapıların kapanma süresi, makinist değişimleri veya teknik aksaklıklar trenin planlanan saatinden birkaç dakika sapmasına neden olabilir.</p>'
        ],
        'sorumluluk-reddi-beyani' => [
            'title' => 'Sorumluluk Reddi Beyanı',
            'content' => '<h2>Yasal Uyarı ve Sorumluluk Reddi Beyanı</h2><p>MarmarayApp üzerinde görüntülenen sefer saatleri ve varış süreleri, duraklar arası mesafelere ve ortalama tren hızlarına dayalı olarak oluşturulan bir algoritma ile hesaplanmaktadır.</p><p>İstasyon yoğunluğu, ray trafiği, teknik aksaklıklar ve yolcu hareketleri gibi anlık değişkenlere bağlı olarak öngörülen sürelerde farklılıklar ve gecikmeler yaşanabilir.</p><p>Uygulamamızdaki veriler, resmi TCDD (Türkiye Cumhuriyeti Devlet Demiryolları) verisi değildir ve uygulamamız TCDD\'nin resmi bir uygulaması değildir. Sitemizi ve uygulamamızı kullanan tüm kullanıcılar, bu verilerin sadece tahmini bilgi amaçlı olduğunu kabul eder ve doğabilecek tüm risklerin kendi sorumluluğunda olduğunu beyan eder.</p>'
        ],
        'marmaray-saatleri' => [
            'title' => 'Marmaray Saatleri',
            'content' => '[marmaray_saatleri]'
        ],
        'ucret-hesapla' => [
            'title' => 'Ücret Hesapla',
            'content' => '[marmaray_ucret]'
        ],
        'rota-planla' => [
            'title' => 'Rota Planla',
            'content' => '[marmaray_rota_planla]'
        ],
        'bize-ulasin' => [
            'title' => 'Bize Ulaşın',
            'content' => '<h2>Bize Ulaşın</h2><p>Destek ve iletişim için: <a href="mailto:destek@marmarayapp.com">destek@marmarayapp.com</a></p><p>Reklam ve Sponsorluk için: <a href="mailto:info@marmarayapp.com">info@marmarayapp.com</a></p><p>MarmarayApp ekibiyle doğrudan iletişime geçebilirsiniz.</p>'
        ]
    ];
    foreach ($pages as $slug => $page) {
        $existing_page = get_page_by_path($slug);
        if ($existing_page) {
            $existing_page->post_title = $page['title'];
            $existing_page->post_content = $page['content'];
            wp_update_post($existing_page);
        } else {
            wp_insert_post([
                'post_title' => $page['title'],
                'post_content' => $page['content'],
                'post_status' => 'publish',
                'post_type' => 'page',
                'post_name' => $slug
            ]);
        }
    }
    
    flush_rewrite_rules();
}

// ============================================================
// SHORTCODES DAHİL ET
// ============================================================
require_once MARMARAYAPP_DIR . 'marmarayapp_shortcodes.php';

function marmarayapp_deactivate() {
    flush_rewrite_rules();
}

// ============================================================
// YÖNETİM PANELİ — Menü Kaydı
// ============================================================
add_action( 'admin_menu', 'marmarayapp_admin_menu' );

function marmarayapp_admin_menu() {
    add_menu_page(
        'MarmarayApp Ayarları',
        'MarmarayApp',
        'manage_options',
        'marmarayapp',
        'marmarayapp_ana_sayfa',
        'dashicons-location-alt',
        30
    );

    add_submenu_page(
        'marmarayapp',
        'Genel Ayarlar',
        'Genel Ayarlar',
        'manage_options',
        'marmarayapp',
        'marmarayapp_ana_sayfa'
    );

    add_submenu_page(
        'marmarayapp',
        'Duyuru Yönetimi',
        'Duyurular',
        'manage_options',
        'marmarayapp-duyurular',
        'marmarayapp_duyurular_sayfasi'
    );

    add_submenu_page(
        'marmarayapp',
        'Sefer Tablosu',
        'Sefer Tablosu',
        'manage_options',
        'marmarayapp-sefer',
        'marmarayapp_sefer_sayfasi'
    );

    add_submenu_page(
        'marmarayapp',
        'Harita Ayarları',
        'Harita',
        'manage_options',
        'marmarayapp-harita',
        'marmarayapp_harita_sayfasi'
    );

    add_submenu_page(
        'marmarayapp',
        'Blog Ayarları',
        'Blog Ayarları',
        'manage_options',
        'marmarayapp-blog',
        'marmarayapp_blog_sayfasi'
    );
}

// ============================================================
// YÖNETİM SAYFALARI
// ============================================================
function marmarayapp_ana_sayfa() {
    if ( ! current_user_can( 'manage_options' ) ) { wp_die( 'Bu sayfaya erişim izniniz yok.' ); }
    if ( isset( $_POST['marmarayapp_kaydet'] ) && check_admin_referer( 'marmarayapp_genel' ) ) {
        update_option( 'marmarayapp_varsayilan_tema',     sanitize_text_field( $_POST['tema'] ?? 'light' ) );
        update_option( 'marmarayapp_site_basligi',       sanitize_text_field( $_POST['baslik'] ?? 'MarmarayApp' ) );
        update_option( 'marmarayapp_guncelleme_araligi', absint( $_POST['guncelleme'] ?? 30 ) );
        echo '<div class="notice notice-success"><p>✅ Ayarlar başarıyla kaydedildi.</p></div>';
    }
    $tema       = get_option( 'marmarayapp_varsayilan_tema', 'light' );
    $baslik     = get_option( 'marmarayapp_site_basligi', 'MarmarayApp' );
    $guncelleme = get_option( 'marmarayapp_guncelleme_araligi', 30 );
    ?>
    <div class="wrap">
        <h1>🚆 MarmarayApp — Genel Ayarlar</h1>
        <form method="post">
            <?php wp_nonce_field( 'marmarayapp_genel' ); ?>
            <table class="form-table">
                <tr>
                    <th><label for="baslik">Site Başlığı</label></th>
                    <td><input type="text" id="baslik" name="baslik" value="<?php echo esc_attr($baslik); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th><label for="tema">Varsayılan Tema</label></th>
                    <td>
                        <select id="tema" name="tema">
                            <option value="light" <?php selected($tema,'light'); ?>>☀️ Açık Tema</option>
                            <option value="dark"  <?php selected($tema,'dark');  ?>>🌙 Koyu Tema</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th><label for="guncelleme">Güncelleme Aralığı (saniye)</label></th>
                    <td>
                        <input type="number" id="guncelleme" name="guncelleme" value="<?php echo esc_attr($guncelleme); ?>" min="10" max="300" class="small-text">
                        <p class="description">Sefer saatlerinin ekranda ne sıklıkla güncelleneceğini belirler.</p>
                    </td>
                </tr>
            </table>
            <p class="submit"><input type="submit" name="marmarayapp_kaydet" class="button-primary" value="Ayarları Kaydet"></p>
        </form>
    </div>
    <?php
}

function marmarayapp_duyurular_sayfasi() {
    if ( ! current_user_can( 'manage_options' ) ) { wp_die('Erişim reddedildi.'); }
    if ( isset( $_POST['marmarayapp_duyuru_kaydet'] ) && check_admin_referer( 'marmarayapp_duyuru' ) ) {
        update_option( 'marmarayapp_duyuru_metni', sanitize_textarea_field( $_POST['duyuru_metni'] ?? '' ) );
        echo '<div class="notice notice-success"><p>✅ Duyuru metni kaydedildi.</p></div>';
    }
    $duyuru = get_option( 'marmarayapp_duyuru_metni', 'Tüm Marmaray seferleri normal zamanında yapılmaktadır.' );
    ?>
    <div class="wrap">
        <h1>📢 Duyuru Yönetimi</h1>
        <p>Bu metin, sitenin üst kısmındaki kayan duyuru bandında görüntülenir.</p>
        <form method="post">
            <?php wp_nonce_field( 'marmarayapp_duyuru' ); ?>
            <table class="form-table">
                <tr>
                    <th><label for="duyuru_metni">Duyuru Metni</label></th>
                    <td>
                        <textarea id="duyuru_metni" name="duyuru_metni" rows="4" cols="80" class="large-text"><?php echo esc_textarea($duyuru); ?></textarea>
                        <p class="description">Duyuru kayan banner olarak gösterilecektir.</p>
                    </td>
                </tr>
            </table>
            <p class="submit"><input type="submit" name="marmarayapp_duyuru_kaydet" class="button-primary" value="Duyuruyu Kaydet"></p>
        </form>
    </div>
    <?php
}

function marmarayapp_sefer_sayfasi() {
    if ( ! current_user_can( 'manage_options' ) ) { wp_die('Erişim reddedildi.'); }
    ?>
    <div class="wrap">
        <h1>🕐 Sefer Tablosu Bilgileri</h1>
        <div class="notice notice-info">
            <p>Sefer tablosu, TCDD'nin resmi verilerine dayanmaktadır (marmarayistanbul.com.tr v2.2.4 referans alındı). Aşağıda mevcut algoritma bilgileri yer almaktadır.</p>
        </div>
        <table class="widefat striped">
            <thead>
                <tr><th>Parametre</th><th>Değer</th></tr>
            </thead>
            <tbody>
                <tr><td>Toplam İstasyon Sayısı</td><td>43 (Gebze → Halkalı)</td></tr>
                <tr><td>Gebze → Halkalı Toplam Süre</td><td>107 dakika</td></tr>
                <tr><td>Halkalı → Gebze Toplam Süre</td><td>107 dakika</td></tr>
                <tr><td>Hafta İçi (Zirve Saati) Sıklık</td><td>6-7 dakikada bir</td></tr>
                <tr><td>Hafta İçi (Normal) Sıklık</td><td>12 dakikada bir</td></tr>
                <tr><td>Hafta Sonu Sıklık</td><td>20 dakikada bir</td></tr>
                <tr><td>İlk Sefer (Hafta İçi)</td><td>05:30</td></tr>
                <tr><td>Son Sefer (Hafta İçi)</td><td>23:50</td></tr>
            </tbody>
        </table>
        <h2 style="margin-top:25px;">Durak Arası Süreler (Gebze → Halkalı)</h2>
        <p>Aşağıdaki tablodaki değerler, her iki bitişik istasyon arasındaki seyahat süresini dakika olarak gösterir.</p>
        <table class="widefat striped" style="font-size:13px;">
            <thead><tr><th>#</th><th>İstasyon</th><th>Önceki Durağa Süre</th><th>Gebze'den Toplam Süre</th></tr></thead>
            <tbody>
                <?php
                $intervals = [0,2,2,2,2,4,3,2,2,2,2,3,3,3,2,2,2,3,2,2,2,3,2,3,2,2,3,3,4,4,3,4,2,3,2,2,3,2,3,2,3,3,2];
                $stations  = ['Gebze','Darıca','Osmangazi','Fatih','Çayırova','Tuzla','İçmeler','Aydıntepe','Güzelyalı','Tersane','Kaynarca','Pendik','Yunus','Kartal','Başak','Atalar','Cevizli','Maltepe','Süreyya Plajı','İdealtepe','Küçükyalı','Bostancı','Suadiye','Erenköy','Göztepe','Feneryolu','Söğütlüçeşme','Ayrılıkçeşmesi','Üsküdar','Sirkeci','Yenikapı','Kazlıçeşme','Zeytinburnu','Yenimahalle','Bakırköy','Ataköy','Yeşilyurt','Yeşilköy','Florya Akvaryum','Florya','Küçükçekmece','Mustafa Kemal','Halkalı'];
                $cum = 0;
                foreach ($stations as $i => $name) {
                    $cum += $intervals[$i];
                    echo "<tr><td>{$i}</td><td><strong>{$name}</strong></td><td>" . ($intervals[$i] > 0 ? $intervals[$i].' dk' : '—') . "</td><td>{$cum} dk</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
    <?php
}

function marmarayapp_harita_sayfasi() {
    if ( ! current_user_can( 'manage_options' ) ) { wp_die('Erişim reddedildi.'); }
    if ( isset( $_POST['marmarayapp_harita_kaydet'] ) && check_admin_referer( 'marmarayapp_harita' ) ) {
        update_option( 'marmarayapp_harita_zoom_min', floatval( $_POST['zoom_min'] ?? 0.55 ) );
        update_option( 'marmarayapp_harita_zoom_max', floatval( $_POST['zoom_max'] ?? 3.0  ) );
        echo '<div class="notice notice-success"><p>✅ Harita ayarları kaydedildi.</p></div>';
    }
    $zmin = get_option( 'marmarayapp_harita_zoom_min', 0.55 );
    $zmax = get_option( 'marmarayapp_harita_zoom_max', 3.0  );
    ?>
    <div class="wrap">
        <h1>🗺️ Harita Ayarları</h1>
        <form method="post">
            <?php wp_nonce_field( 'marmarayapp_harita' ); ?>
            <table class="form-table">
                <tr>
                    <th><label for="zoom_min">Minimum Zoom Seviyesi</label></th>
                    <td><input type="number" id="zoom_min" name="zoom_min" value="<?php echo esc_attr($zmin); ?>" step="0.05" min="0.3" max="1" class="small-text"></td>
                </tr>
                <tr>
                    <th><label for="zoom_max">Maksimum Zoom Seviyesi</label></th>
                    <td><input type="number" id="zoom_max" name="zoom_max" value="<?php echo esc_attr($zmax); ?>" step="0.5" min="1.5" max="5" class="small-text"></td>
                </tr>
            </table>
            <p class="submit"><input type="submit" name="marmarayapp_harita_kaydet" class="button-primary" value="Harita Ayarlarını Kaydet"></p>
        </form>
    </div>
    <?php
}

function marmarayapp_blog_sayfasi() {
    if ( ! current_user_can( 'manage_options' ) ) { wp_die( 'Bu sayfaya erişim izniniz yok.' ); }
    if ( isset( $_POST['marmarayapp_blog_kaydet'] ) && check_admin_referer( 'marmarayapp_blog' ) ) {
        update_option( 'marmarayapp_blog_comments', isset( $_POST['blog_comments'] ) ? 1 : 0 );
        update_option( 'marmarayapp_blog_author',   isset( $_POST['blog_author'] ) ? 1 : 0 );
        update_option( 'marmarayapp_blog_date',     isset( $_POST['blog_date'] ) ? 1 : 0 );
        echo '<div class="notice notice-success is-dismissible"><p>Blog ayarları kaydedildi.</p></div>';
    }

    $comments = get_option( 'marmarayapp_blog_comments', 1 );
    $author   = get_option( 'marmarayapp_blog_author', 1 );
    $date     = get_option( 'marmarayapp_blog_date', 1 );
    ?>
    <div class="wrap">
        <h1>Blog ve Makale Ayarları</h1>
        <p>MarmarayApp blog sayfalarındaki yazar, tarih ve yorum modüllerini buradan yönetebilirsiniz.</p>
        <form method="post" action="">
            <?php wp_nonce_field( 'marmarayapp_blog' ); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">Yorumları Aktifleştir</th>
                    <td>
                        <label>
                            <input type="checkbox" name="blog_comments" value="1" <?php checked( $comments, 1 ); ?>>
                            Blog yazılarının altında yorum yapma formunu göster.
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Yazar Adını Göster</th>
                    <td>
                        <label>
                            <input type="checkbox" name="blog_author" value="1" <?php checked( $author, 1 ); ?>>
                            Makale başında "MarmarayApp Editörü" gibi yazar bilgisini göster.
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Yayın Tarihini Göster</th>
                    <td>
                        <label>
                            <input type="checkbox" name="blog_date" value="1" <?php checked( $date, 1 ); ?>>
                            Makalenin ne zaman yayınlandığını göster.
                        </label>
                    </td>
                </tr>
            </table>
            <p class="submit"><input type="submit" name="marmarayapp_blog_kaydet" class="button-primary" value="Ayarları Kaydet"></p>
        </form>
    </div>
    <?php
}

// ============================================================
// SCRIPT & STYLE YÜKLEME (Frontend)
// ============================================================
add_action( 'wp_enqueue_scripts', 'marmarayapp_script_yukle' );

function marmarayapp_script_yukle() {
    wp_enqueue_style(
        'marmarayapp-style',
        MARMARAYAPP_URL . 'assets/css/app.css',
        [],
        MARMARAYAPP_VERSION
    );

    // Google Fonts: Outfit
    wp_enqueue_style(
        'marmarayapp-fonts',
        'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap',
        [],
        null
    );

    // Ana uygulama JS (ES Module)
    wp_register_script(
        'marmarayapp-data',
        MARMARAYAPP_URL . 'assets/js/data.js',
        [],
        MARMARAYAPP_VERSION,
        [ 'in_footer' => true, 'strategy' => 'defer' ]
    );

    wp_register_script(
        'marmarayapp-app',
        MARMARAYAPP_URL . 'assets/js/app.js',
        [ 'marmarayapp-data' ],
        MARMARAYAPP_VERSION,
        [ 'in_footer' => true, 'strategy' => 'defer' ]
    );

    // WP ayarlarını JS'e aktar
    wp_localize_script( 'marmarayapp-app', 'marmarayWP', [
        'tema'         => get_option( 'marmarayapp_varsayilan_tema', 'light' ),
        'duyuru'       => get_option( 'marmarayapp_duyuru_metni', '' ),
        'zoomMin'      => get_option( 'marmarayapp_harita_zoom_min', 0.55 ),
        'zoomMax'      => get_option( 'marmarayapp_harita_zoom_max', 3.0  ),
        'guncelleme'   => get_option( 'marmarayapp_guncelleme_araligi', 30 ),
        'ajaxUrl'      => admin_url( 'admin-ajax.php' ),
        'nonce'        => wp_create_nonce( 'marmarayapp_nonce' ),
    ] );

    wp_enqueue_style('marmaray-app-css', plugins_url('assets/css/app.css', __FILE__), array(), time());
    wp_enqueue_script('marmarayapp-app', plugins_url('assets/js/app_v5.js', __FILE__), array(), '5.3', true);
}

function marmaray_core_enqueue_assets() {
    wp_enqueue_style('marmaray-style', plugin_dir_url(__FILE__) . 'assets/css/style.css', array(), '1.1');
    wp_enqueue_script('marmaray-data', plugin_dir_url(__FILE__) . 'assets/js/data_v5.js', array(), '5.3', true);
    wp_enqueue_script('marmaray-app', plugin_dir_url(__FILE__) . 'assets/js/app_v5.js', array(), '5.3', true);
}

// ============================================================
// KISAKODlar (Shortcodes)
// ============================================================
add_shortcode( 'marmaray_harita',       'marmarayapp_sc_harita'       );
add_shortcode( 'marmaray_canli_takip',  'marmarayapp_sc_canli_takip'  );
add_shortcode( 'marmaray_ucret',        'marmarayapp_sc_ucret'        );
add_shortcode( 'marmaray_guzergah',     'marmarayapp_sc_guzergah'     );

function marmarayapp_sc_harita( $atts ) {
    $atts = shortcode_atts( [ 'yukseklik' => '440px' ], $atts, 'marmaray_harita' );
    ob_start();
    ?>
    <div class="map-glass-panel">
        <div class="map-wrapper" id="map-wrapper" style="height:<?php echo esc_attr($atts['yukseklik']); ?>;">
            <div id="marmaray-map-scale">
                <div id="marmaray-map"></div>
            </div>
            <div class="station-tooltip" id="station-tooltip">
                <div class="tooltip-name" id="tooltip-name">İstasyon</div>
                <div class="tooltip-dirs">
                    <span class="tooltip-dir blue-dir" id="tooltip-halkali">← Halkalı</span>
                    <span class="tooltip-dir red-dir"  id="tooltip-gebze">Gebze →</span>
                </div>
            </div>
            <div class="train-popup" id="train-popup">
                <button class="train-popup-close" id="train-popup-close">✕</button>
                <div class="train-popup-body" id="train-popup-body"></div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

function marmarayapp_sc_canli_takip( $atts ) {
    ob_start();
    ?>
    <div class="station-picker-section">
        <div class="station-picker-header">
            <div class="picker-left">
                <div class="live-badge-pill">
                    <span class="live-dot-anim"></span>
                    <span class="live-badge-label">CANLI</span>
                </div>
                <label for="station-dropdown">İstasyon Seçin:</label>
            </div>
            <select class="station-dropdown" id="station-dropdown">
                <option value="" disabled selected>Durak seçiniz...</option>
            </select>
        </div>
        <div id="station-cards" style="display:none;"></div>
    </div>
    <?php
    return ob_get_clean();
}

function marmarayapp_sc_ucret( $atts ) {
    ob_start();
    ?>
    <div class="ucret-hesaplama-widget" id="ucret-widget">
        <h3>Ücret Hesapla</h3>
        <div class="ucret-form">
            <select id="ucret-baslangic"><option value="">Başlangıç durağı seçin...</option></select>
            <select id="ucret-bitis"><option value="">Bitiş durağı seçin...</option></select>
            <button id="ucret-hesapla-btn" class="action-btn" style="width:auto;padding:0 20px;font-weight:700;">Hesapla</button>
        </div>
        <div id="ucret-sonuc" style="display:none;"></div>
    </div>
    <?php
    return ob_get_clean();
}

function marmarayapp_sc_guzergah( $atts ) {
    ob_start();
    ?>
    <div class="transfer-section">
        <h2 class="section-title">Marmaray Güzergah Hattı</h2>
        <div class="transfer-map-scroll">
            <div class="transfer-stations-row" id="transfer-row"></div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

// ============================================================
// REST API ENDPOINTLERİ
// ============================================================
add_action( 'rest_api_init', 'marmarayapp_rest_kayit' );

function marmarayapp_rest_kayit() {
    register_rest_route( 'marmarayapp/v1', '/ayarlar', [
        'methods'             => 'GET',
        'callback'            => 'marmarayapp_rest_ayarlar',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( 'marmarayapp/v1', '/duyuru', [
        'methods'             => 'GET',
        'callback'            => 'marmarayapp_rest_duyuru',
        'permission_callback' => '__return_true',
    ]);
}

function marmarayapp_rest_ayarlar( $request ) {
    return rest_ensure_response([
        'tema'       => get_option( 'marmarayapp_varsayilan_tema', 'light' ),
        'zoomMin'    => get_option( 'marmarayapp_harita_zoom_min', 0.55 ),
        'zoomMax'    => get_option( 'marmarayapp_harita_zoom_max', 3.0  ),
        'guncelleme' => get_option( 'marmarayapp_guncelleme_araligi', 30 ),
    ]);
}

function marmarayapp_rest_duyuru( $request ) {
    return rest_ensure_response([
        'metin' => get_option( 'marmarayapp_duyuru_metni', '' ),
        'aktif' => true,
    ]);
}

// ============================================================
// SCRIPT LOADER TAG (Type Module for JS)
// ============================================================
add_filter('script_loader_tag', 'marmarayapp_add_type_module', 10, 3);
function marmarayapp_add_type_module($tag, $handle, $src) {
    if ( in_array( $handle, array( 'marmarayapp-app', 'marmarayapp-data' ), true ) ) {
        return '<script type="module" src="' . esc_url( $src ) . '"></script>' . "\n";
    }
    return $tag;
}

add_action('init', function() {
    if (isset($_GET['force_update_pages']) || !get_option('marmarayapp_v2_4_force_updated')) {
        marmarayapp_activate();
        update_option('marmarayapp_v2_4_force_updated', 1);
        if (isset($_GET['force_update_pages'])) {
            echo "<h1 style='color:green; text-align:center; margin-top:50px;'>SAYFALAR BASARIYLA GUNCELLENDI! Lutfen sayfayi yenileyin.</h1>";
            exit;
        }
    }
});








// Rank Math Optimizer
require_once plugin_dir_path(__FILE__) . 'rank-math-optimizer.php';


require_once MARMARAYAPP_DIR . 'blog-importer-v31.php';

require_once MARMARAYAPP_DIR . 'restoration-importer.php';

require_once plugin_dir_path(__FILE__) . 'restoration-importer-v6.php';

require_once plugin_dir_path(__FILE__) . 'restoration-importer-v7.php';
