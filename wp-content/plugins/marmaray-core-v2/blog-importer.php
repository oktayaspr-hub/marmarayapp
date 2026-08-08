<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_blog_importer_trigger');

function marmaray_blog_importer_trigger() {
    if (isset($_GET['insert_blog_demo']) && current_user_can('manage_options')) {
        marmaray_create_sample_blogs();
        echo "<h1>Örnek Blog Yazýlarý Baþarýyla Eklendi!</h1><a href='/wp-admin/edit.php'>Yazýlara Git</a>";
        exit;
    }
}

function marmaray_create_sample_blogs() {
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/media.php');

    $posts = [
        [
            'title'   => 'Yenikapý Marmaray Ýstasyonu: Saatler, Aktarmalar ve Çevre Rehberi',
            'content' => '<h2>Yenikapý Ýstasyonu Hakkýnda Genel Bilgi</h2>
                          <p>Marmaray\'ýn en yoðun geçiþ noktalarýndan biri olan <strong>Yenikapý Ýstasyonu</strong>, Avrupa Yakasý\'nýn kalbinde yer alýr. Hem Gebze yönüne hem de Halkalý yönüne giden trenlerin kesiþim noktasýdýr. Yenikapý Marmaray saatleri her gün 06:00 ile gece 23:59 arasýnda düzenli seferler sunar.</p>
                          <h3>M1 ve M2 Metro Aktarmasý Nasýl Yapýlýr?</h3>
                          <p>Yenikapý\'nýn en büyük avantajý, Ýstanbul metrosuna olan kolay baðlantýsýdýr:</p>
                          <ul>
                              <li><strong>M2 Yenikapý - Hacýosman Metrosu:</strong> Taksim, Þiþli, Levent gibi iþ merkezlerine doðrudan ulaþým.</li>
                              <li><strong>M1A (Atatürk Havalimaný) ve M1B (Kirazlý) Metrosu:</strong> Esenler Otogarý, Bakýrköy ve Baðcýlar yönüne hýzlý aktarma.</li>
                          </ul>
                          <h3>Yenikapý ÝDO Feribot Baðlantýsý</h3>
                          <p>Yenikapý Marmaray çýkýþýndan sadece 5 dakikalýk yürüme mesafesinde bulunan ÝDO iskelesi sayesinde, Yalova, Bursa ve Bandýrma feribotlarýna kolayca ulaþabilirsiniz.</p>
                          <p><em>Not:</em> Ýlk ve son tren saatlerini sitemizdeki canlý harita üzerinden takip edebilir, biniþ öncesi yoðunluk durumunu kontrol edebilirsiniz.</p>',
            'image'   => MARMARAYAPP_DIR . 'assets/images/blog/yenikapi.jpg',
            'tags'    => 'yenikapý marmaray, yenikapý saatleri, m2 metro aktarma, marmaray ilk tren',
            'slug'    => 'yenikapi-marmaray-istasyonu-saatler-ve-aktarmalar'
        ],
        [
            'title'   => 'Pendik Marmaray Ýstasyonu: Hýzlý Tren (YHT) Aktarmasý ve Sefer Saatleri',
            'content' => '<h2>Pendik Ýstasyonu ve Ulaþým Önemi</h2>
                          <p>Anadolu Yakasý\'nýn kilit merkezlerinden biri olan <strong>Pendik Marmaray Ýstasyonu</strong>, sadece Ýstanbul içi ulaþýmda deðil, þehirler arasý yolculuklarda da devasa bir öneme sahiptir. Gebze\'ye giden trenler ve Halkalý yönüne giden ana hat trenleri Pendik\'te mutlaka durur.</p>
                          <h3>Pendik YHT (Yüksek Hýzlý Tren) Aktarmasý</h3>
                          <p>Ankara, Konya, Eskiþehir ve Sivas yönüne seyahat edecekseniz, Pendik Marmaray istasyonunda inerek doðrudan YHT garýna aktarma yapabilirsiniz. Pendik YHT istasyonu, Marmaray peronlarý ile entegredir. Yönlendirme tabelalarýný takip ederek YHT bilet giþelerine 2 dakikada ulaþabilirsiniz.</p>
                          <h3>Pendik Marmaray Ara Trenleri Nedir?</h3>
                          <p>Marmaray aðýnda yoðun saatlerde (sabah ve akþam iþ çýkýþlarý) <strong>Pendik - Ataköy</strong> arasýnda ek seferler düzenlenir. Bu "Ara Trenler" sayesinde Gebze veya Halkalý\'dan gelen kalabalýða girmeden daha rahat bir yolculuk yapabilirsiniz. Sitemizdeki canlý harita, Pendik kalkýþlý ara trenleri sarý renkle iþaretleyerek göstermektedir.</p>',
            'image'   => MARMARAYAPP_DIR . 'assets/images/blog/pendik.jpg',
            'tags'    => 'pendik marmaray saatleri, pendik yht aktarma, pendik hýzlý tren, pendik ataköy seferleri',
            'slug'    => 'pendik-marmaray-istasyonu-yht-aktarma-saatleri'
        ],
        [
            'title'   => 'Ayrýlýkçeþmesi Marmaray Ýstasyonu: Kadýköy Metrosuna En Hýzlý Geçiþ',
            'content' => '<h2>Boðazý Geçtikten Sonraki Ýlk Durak</h2>
                          <p>Sirkeci istasyonundan sonra tüp geçitle Asya Kýtasý\'na geçen Marmaray trenlerinin Anadolu Yakasý\'ndaki ilk duraðý <strong>Ayrýlýkçeþmesi Ýstasyonu</strong>\'dur. Üsküdar sýnýrlarý içinde yer almasýna raðmen Kadýköy kalabalýðýnýn ana daðýtým merkezidir.</p>
                          <h3>M4 Kadýköy - Sabiha Gökçen Havalimaný Metrosu</h3>
                          <p>Ayrýlýkçeþmesi Marmaray Ýstasyonu, M4 metro hattý ile devasa bir yer altý aktarma merkezine sahiptir. Treninizden indiðinizde:</p>
                          <ul>
                              <li><strong>Kadýköy Yönü:</strong> Merdivenlerden inip M4 metrosuna binerek tek durak sonra Kadýköy Ýskele Meydaný\'na varabilirsiniz.</li>
                              <li><strong>Sabiha Gökçen Havalimaný Yönü:</strong> M4 metrosunu kullanarak Göztepe, Bostancý, Pendik üzerinden aktarmasýz havalimanýna ulaþabilirsiniz.</li>
                          </ul>
                          <h3>Ayrýlýkçeþmesi AVM ve Çevre Baðlantýlarý</h3>
                          <p>Ýstasyon, Tepe Nautilus AVM\'nin hemen bitiþiðindedir. Alýþveriþ merkezi, Acýbadem ve Kadýköy Rýhtým bölgelerine yürüyüþ mesafesindeki bu durak, günün her saati güvenli ve aktiftir. Ayrýlýkçeþmesi güncel sefer saatlerini uygulamamýzdan anlýk sorgulayabilirsiniz.</p>',
            'image'   => MARMARAYAPP_DIR . 'assets/images/blog/ayrilikcesmesi.jpg',
            'tags'    => 'ayrýlýkçeþmesi marmaray, kadýköy metro aktarma, m4 metro, sabiha gökçen havalimaný ulaþým',
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
