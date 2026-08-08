<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_blog_importer_trigger');

function marmaray_blog_importer_trigger() {
    if (isset($_GET['insert_blog_demo']) && $_GET['insert_blog_demo'] === 'oktay') {
        marmaray_create_sample_blogs();
        echo "<h1>Örnek Blog Yazıları Başarıyla Eklendi!</h1><a href='/wp-admin/edit.php'>Yazılara Git</a>";
        exit;
    }
}

function marmaray_create_sample_blogs() {
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/media.php');

    $posts = [
        [
            'title'   => 'Yenikapı Marmaray İstasyonu: Saatler, Aktarmalar ve Çevre Rehberi',
            'content' => '<h2>Yenikapı İstasyonu Hakkında Genel Bilgi</h2>
                          <p>Marmaray\'ın en yoğun geçiş noktalarından biri olan <strong>Yenikapı İstasyonu</strong>, Avrupa Yakası\'nın kalbinde yer alır. Hem Gebze yönüne hem de Halkalı yönüne giden trenlerin kesişim noktasıdır. Yenikapı Marmaray saatleri her gün 06:00 ile gece 23:59 arasında düzenli seferler sunar.</p>
                          <h3>M1 ve M2 Metro Aktarması Nasıl Yapılır?</h3>
                          <p>Yenikapı\'nın en büyük avantajı, İstanbul metrosuna olan kolay bağlantısıdır:</p>
                          <ul>
                              <li><strong>M2 Yenikapı - Hacıosman Metrosu:</strong> Taksim, Şişli, Levent gibi iş merkezlerine doğrudan ulaşım.</li>
                              <li><strong>M1A (Atatürk Havalimanı) ve M1B (Kirazlı) Metrosu:</strong> Esenler Otogarı, Bakırköy ve Bağcılar yönüne hızlı aktarma.</li>
                          </ul>
                          <h3>Yenikapı İDO Feribot Bağlantısı</h3>
                          <p>Yenikapı Marmaray çıkışından sadece 5 dakikalık yürüme mesafesinde bulunan İDO iskelesi sayesinde, Yalova, Bursa ve Bandırma feribotlarına kolayca ulaşabilirsiniz.</p>
                          <p><em>Not:</em> İlk ve son tren saatlerini sitemizdeki canlı harita üzerinden takip edebilir, biniş öncesi yoğunluk durumunu kontrol edebilirsiniz.</p>',
            'image'   => MARMARAYAPP_DIR . 'assets/images/blog/yenikapi.jpg',
            'tags'    => 'yenikapı marmaray, yenikapı saatleri, m2 metro aktarma, marmaray ilk tren',
            'slug'    => 'yenikapi-marmaray-istasyonu-saatler-ve-aktarmalar'
        ],
        [
            'title'   => 'Pendik Marmaray İstasyonu: Hızlı Tren (YHT) Aktarması ve Sefer Saatleri',
            'content' => '<h2>Pendik İstasyonu ve Ulaşım Önemi</h2>
                          <p>Anadolu Yakası\'nın kilit merkezlerinden biri olan <strong>Pendik Marmaray İstasyonu</strong>, sadece İstanbul içi ulaşımda değil, şehirler arası yolculuklarda da devasa bir öneme sahiptir. Gebze\'ye giden trenler ve Halkalı yönüne giden ana hat trenleri Pendik\'te mutlaka durur.</p>
                          <h3>Pendik YHT (Yüksek Hızlı Tren) Aktarması</h3>
                          <p>Ankara, Konya, Eskişehir ve Sivas yönüne seyahat edecekseniz, Pendik Marmaray istasyonunda inerek doğrudan YHT garına aktarma yapabilirsiniz. Pendik YHT istasyonu, Marmaray peronları ile entegredir. Yönlendirme tabelalarını takip ederek YHT bilet gişelerine 2 dakikada ulaşabilirsiniz.</p>
                          <h3>Pendik Marmaray Ara Trenleri Nedir?</h3>
                          <p>Marmaray ağında yoğun saatlerde (sabah ve akşam iş çıkışları) <strong>Pendik - Ataköy</strong> arasında ek seferler düzenlenir. Bu "Ara Trenler" sayesinde Gebze veya Halkalı\'dan gelen kalabalığa girmeden daha rahat bir yolculuk yapabilirsiniz. Sitemizdeki canlı harita, Pendik kalkışlı ara trenleri sarı renkle işaretleyerek göstermektedir.</p>',
            'image'   => MARMARAYAPP_DIR . 'assets/images/blog/pendik.jpg',
            'tags'    => 'pendik marmaray saatleri, pendik yht aktarma, pendik hızlı tren, pendik ataköy seferleri',
            'slug'    => 'pendik-marmaray-istasyonu-yht-aktarma-saatleri'
        ],
        [
            'title'   => 'Ayrılıkçeşmesi Marmaray İstasyonu: Kadıköy Metrosuna En Hızlı Geçiş',
            'content' => '<h2>Boğazı Geçtikten Sonraki İlk Durak</h2>
                          <p>Sirkeci istasyonundan sonra tüp geçitle Asya Kıtası\'na geçen Marmaray trenlerinin Anadolu Yakası\'ndaki ilk durağı <strong>Ayrılıkçeşmesi İstasyonu</strong>\'dur. Üsküdar sınırları içinde yer almasına rağmen Kadıköy kalabalığının ana dağıtım merkezidir.</p>
                          <h3>M4 Kadıköy - Sabiha Gökçen Havalimanı Metrosu</h3>
                          <p>Ayrılıkçeşmesi Marmaray İstasyonu, M4 metro hattı ile devasa bir yer altı aktarma merkezine sahiptir. Treninizden indiğinizde:</p>
                          <ul>
                              <li><strong>Kadıköy Yönü:</strong> Merdivenlerden inip M4 metrosuna binerek tek durak sonra Kadıköy İskele Meydanı\'na varabilirsiniz.</li>
                              <li><strong>Sabiha Gökçen Havalimanı Yönü:</strong> M4 metrosunu kullanarak Göztepe, Bostancı, Pendik üzerinden aktarmasız havalimanına ulaşabilirsiniz.</li>
                          </ul>
                          <h3>Ayrılıkçeşmesi AVM ve Çevre Bağlantıları</h3>
                          <p>İstasyon, Tepe Nautilus AVM\'nin hemen bitişiğindedir. Alışveriş merkezi, Acıbadem ve Kadıköy Rıhtım bölgelerine yürüyüş mesafesindeki bu durak, günün her saati güvenli ve aktiftir. Ayrılıkçeşmesi güncel sefer saatlerini uygulamamızdan anlık sorgulayabilirsiniz.</p>',
            'image'   => MARMARAYAPP_DIR . 'assets/images/blog/ayrilikcesmesi.jpg',
            'tags'    => 'ayrılıkçeşmesi marmaray, kadıköy metro aktarma, m4 metro, sabiha gökçen havalimanı ulaşım',
            'slug'    => 'ayrilikcesmesi-marmaray-kadikoy-metrosu-gecisi'
        ]
    ];

    foreach ($posts as $p) {
        $existing = get_page_by_path($p['slug'], OBJECT, 'post');
        if ($existing) continue; // Already created

        // Insert Post
        $post_data = [
            'post_title'    => $p['title'],
            'post_content'  => $p['content'],
            'post_status'   => 'publish',
            'post_author'   => 1,
            'post_name'     => $p['slug'],
            'post_type'     => 'post',
            'tags_input'    => $p['tags']
        ];
        
        $post_id = wp_insert_post($post_data);

        // Upload and Attach Image
        if ($post_id && file_exists($p['image'])) {
            $filename = basename($p['image']);
            $upload_file = wp_upload_bits($filename, null, file_get_contents($p['image']));
            
            if (!$upload_file['error']) {
                $wp_filetype = wp_check_filetype($filename, null);
                $attachment = [
                    'post_mime_type' => $wp_filetype['type'],
                    'post_title'     => preg_replace('/\.[^.]+$/', '', $filename),
                    'post_content'   => '',
                    'post_status'    => 'inherit'
                ];
                $attach_id = wp_insert_attachment($attachment, $upload_file['file'], $post_id);
                $attach_data = wp_generate_attachment_metadata($attach_id, $upload_file['file']);
                wp_update_attachment_metadata($attach_id, $attach_data);
                
                // Set as featured image
                set_post_thumbnail($post_id, $attach_id);
            }
        }
    }
}
?>
