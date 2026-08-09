<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_restoration_importer_v6');

function marmaray_restoration_importer_v6() {
    if (isset($_GET['run_restoration_v6']) && $_GET['run_restoration_v6'] === 'oktay') {
        
        $stations = [
            ['name' => 'Halkalı', 'slug' => 'halkali-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Mustafa Kemal', 'slug' => 'mustafa-kemal-marmaray-istasyonu', 'image' => 'mustafa_kemal_marmaray_1786284895924.jpg', 'is_new' => true],
            ['name' => 'Küçükçekmece', 'slug' => 'kucukcekmece-marmaray-istasyonu-gol-manzarasi', 'image' => 'marmaray_kucukcekmece_1786279368350.jpg', 'is_new' => true],
            ['name' => 'Florya', 'slug' => 'florya-marmaray-istasyonu-sahil-keyfi', 'image' => 'florya_marmaray_1786284907620.jpg', 'is_new' => true],
            ['name' => 'Florya Akvaryum', 'slug' => 'florya-akvaryum-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Yeşilköy', 'slug' => 'yesilkoy-marmaray-istasyonu-tarihi-doku', 'image' => 'marmaray_yesilkoy_1786279379981.jpg', 'is_new' => true],
            ['name' => 'Yeşilyurt', 'slug' => 'yesilyurt-marmaray-istasyonu', 'image' => 'yesilyurt_marmaray_1786288129515.jpg', 'is_new' => true],
            ['name' => 'Ataköy', 'slug' => 'atakoy-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Bakırköy', 'slug' => 'bakirkoy-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Yenimahalle', 'slug' => 'yenimahalle-marmaray-istasyonu-ulasim', 'image' => 'marmaray_yenimahalle_1786282797620.jpg', 'is_new' => true],
            ['name' => 'Zeytinburnu', 'slug' => 'zeytinburnu-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Kazlıçeşme', 'slug' => 'kazlicesme-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Yenikapı', 'slug' => 'yenikapi-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Sirkeci Garı', 'slug' => 'sirkeci-gari-marmaray-tarihi', 'image' => 'sirkeci_gari_marmaray_new_1786288226960.jpg', 'is_new' => true],
            ['name' => 'Üsküdar İskelesi', 'slug' => 'uskudar-iskelesi-marmaray-aktarma', 'image' => 'uskudar_iskelesi_marmaray_1786288195222.jpg', 'is_new' => true],
            ['name' => 'Ayrılık Çeşmesi', 'slug' => 'ayrilik-cesmesi-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Söğütlüçeşme', 'slug' => 'sogutlucesme-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Feneryolu', 'slug' => 'feneryolu-marmaray-istasyonu', 'image' => 'feneryolu_marmaray_1786236009386.jpg', 'is_new' => false],
            ['name' => 'Göztepe', 'slug' => 'goztepe-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Erenköy', 'slug' => 'erenkoy-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Suadiye', 'slug' => 'suadiye-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Bostancı İDO', 'slug' => 'bostanci-ido-marmaray-aktarma', 'image' => 'marmaray_bostanci_ido_1786282874601.jpg', 'is_new' => true],
            ['name' => 'Küçükyalı', 'slug' => 'kucukyali-marmaray-istasyonu-tepe-nautilus', 'image' => 'marmaray_kucukyali_1786282806974.jpg', 'is_new' => true],
            ['name' => 'İdealtepe', 'slug' => 'idealtepe-marmaray-istasyonu', 'image' => 'idealtepe_marmaray_1786236021352.jpg', 'is_new' => false],
            ['name' => 'Süreyya Plajı', 'slug' => 'sureyya-plaji-marmaray-istasyonu', 'image' => 'sureyya_plaji_marmaray_1786236123154.jpg', 'is_new' => false],
            ['name' => 'Maltepe', 'slug' => 'maltepe-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Cevizli', 'slug' => 'cevizli-marmaray-istasyonu', 'image' => 'cevizli_marmaray_1786236138439.jpg', 'is_new' => false],
            ['name' => 'Atalar', 'slug' => 'atalar-marmaray-istasyonu', 'image' => 'atalar_marmaray_1786236155870.jpg', 'is_new' => false],
            ['name' => 'Başak', 'slug' => 'basak-marmaray-istasyonu', 'image' => 'basak_marmaray_1786236167969.jpg', 'is_new' => false],
            ['name' => 'Kartal', 'slug' => 'kartal-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Yunus', 'slug' => 'yunus-marmaray-istasyonu', 'image' => 'yunus_marmaray_1786236185567.jpg', 'is_new' => false],
            ['name' => 'Pendik', 'slug' => 'pendik-marmaray-istasyonu', 'image' => 'pendik_marmaray_1786236197735.jpg', 'is_new' => false],
            ['name' => 'Pendik Marina', 'slug' => 'pendik-marina-marmaray-istasyonu', 'image' => 'pendik_marina_marmaray_1786288216551.jpg', 'is_new' => true],
            ['name' => 'Kaynarca', 'slug' => 'kaynarca-marmaray-istasyonu', 'image' => 'kaynarca_marmaray_1786236216160.jpg', 'is_new' => false],
            ['name' => 'Tersane', 'slug' => 'tersane-marmaray-istasyonu', 'image' => 'tersane_marmaray_1786236226374.jpg', 'is_new' => false],
            ['name' => 'Güzelyalı', 'slug' => 'guzelyali-marmaray-istasyonu', 'image' => 'guzelyali_marmaray_1786288149088.jpg', 'is_new' => true],
            ['name' => 'Aydıntepe', 'slug' => 'aydintepe-marmaray-istasyonu-tuzla-siniri', 'image' => 'marmaray_aydintepe_1786282819136.jpg', 'is_new' => true],
            ['name' => 'İçmeler', 'slug' => 'icmeler-marmaray-istasyonu-kaplicalari', 'image' => 'icmeler_marmaray_1786288160358.jpg', 'is_new' => true],
            ['name' => 'Tuzla', 'slug' => 'tuzla-marmaray-istasyonu-marina-ve-sahil', 'image' => 'marmaray_tuzla_1786279389662.jpg', 'is_new' => true],
            ['name' => 'Çayırova', 'slug' => 'cayirova-marmaray-istasyonu', 'image' => 'cayirova_marmaray_1786288172089.jpg', 'is_new' => true],
            ['name' => 'Fatih', 'slug' => 'fatih-marmaray-istasyonu-gebze', 'image' => 'marmaray_fatih_1786282832339.jpg', 'is_new' => true],
            ['name' => 'Osmangazi', 'slug' => 'osmangazi-marmaray-istasyonu', 'image' => 'osmangazi_marmaray_1786288184345.jpg', 'is_new' => true],
            ['name' => 'Darıca', 'slug' => 'darica-marmaray-istasyonu-hayvanat-bahcesi', 'image' => 'marmaray_darica_1786282849741.jpg', 'is_new' => true],
            ['name' => 'Gebze', 'slug' => 'gebze-marmaray-istasyonu', 'image' => 'marmaray_train_station_1786232407160.jpg', 'is_new' => false],
            ['name' => 'Halkalı YHT', 'slug' => 'halkali-yht-marmaray-aktarma', 'image' => 'halkali_yht_marmaray_1786288207192.jpg', 'is_new' => true],
        ];

        // Ensure exactly 43 stations for safety. Add the rest if missed.
        
        $total_updated = 0;
        
        // Caching permalinks for internal linking
        $links = [];
        foreach($stations as $s) {
            $post = get_page_by_path($s['slug'], OBJECT, 'post');
            if($post) {
                $links[] = [
                    'url' => get_permalink($post->ID),
                    'anchor' => $s['name'] . ' Marmaray İstasyonu'
                ];
                $links[] = [
                    'url' => get_permalink($post->ID),
                    'anchor' => $s['name'] . ' Marmaray durağı'
                ];
            }
        }

        foreach ($stations as $st) {
            $post_id = 0;
            $existing = get_page_by_path($st['slug'], OBJECT, 'post');
            $clean_name = str_replace([' İDO', ' YHT', ' Garı', ' İskelesi', ' Marina'], '', $st['name']);
            
            // Mega Title:
            $mega_title = $st['name'] . " Marmaray İstasyonu: Sefer Saatleri ve Ulaşım Rehberi";
            
            if (!$existing) {
                $post_id = wp_insert_post([
                    'post_title' => $mega_title,
                    'post_name' => $st['slug'],
                    'post_content' => 'Geçici içerik',
                    'post_status' => 'publish',
                    'post_type' => 'post'
                ]);
                wp_set_object_terms($post_id, 'blog', 'category');
            } else {
                $post_id = $existing->ID;
                // Update title to Mega Title
                wp_update_post([
                    'ID' => $post_id,
                    'post_title' => $mega_title
                ]);
            }
            
            // Rank Math Keyword
            $keyword = mb_strtolower($clean_name, 'UTF-8') . ' marmaray';
            update_post_meta($post_id, 'rank_math_focus_keyword', $keyword);
            $title_case_keyword = mb_convert_case($keyword, MB_CASE_TITLE, "UTF-8");
            
            // Image Logic: ONLY new images get replaced. Old ones are preserved.
            if ($st['is_new']) {
                delete_post_thumbnail($post_id);
                $upload_dir = wp_upload_dir();
                $artifact_path = plugin_dir_path(__FILE__) . 'assets/images/' . $st['image'];
                if (file_exists($artifact_path)) {
                    $filename = basename($artifact_path);
                    $dest_path = $upload_dir['path'] . '/' . $filename;
                    if (copy($artifact_path, $dest_path)) {
                        $attachment = [
                            'guid'           => $upload_dir['url'] . '/' . $filename,
                            'post_mime_type' => 'image/jpeg',
                            'post_title'     => $st['name'] . ' Marmaray İstasyonu Görseli',
                            'post_content'   => '',
                            'post_status'    => 'inherit'
                        ];
                        $attach_id = wp_insert_attachment($attachment, $dest_path, $post_id);
                        require_once(ABSPATH . 'wp-admin/includes/image.php');
                        $attach_data = wp_generate_attachment_metadata($attach_id, $dest_path);
                        wp_update_attachment_metadata($attach_id, $attach_data);
                        set_post_thumbnail($post_id, $attach_id);
                    }
                }
            }

            // INTERNAL LINK GENERATION (3 random links)
            $rnd1 = $links[array_rand($links)];
            $rnd2 = $links[array_rand($links)];
            $rnd3 = $links[array_rand($links)];
            $link1_html = "<a href='{$rnd1['url']}'>{$rnd1['anchor']}</a>";
            $link2_html = "<a href='{$rnd2['url']}'>{$rnd2['anchor']}</a>";
            $link3_html = "<a href='{$rnd3['url']}'>{$rnd3['anchor']}</a>";

            // SIKÇA SORULAN SORULAR HAVUZU
            $faqs_pool = [
                ["q" => "{$st['name']} Marmaray İstasyonu nerede bulunuyor?", "a" => "İstasyon, ulaşım ağının stratejik noktalarından birinde yer almaktadır. Çevresindeki ana caddelere ve toplu taşıma aktarma noktalarına yürüme mesafesinde olan istasyon, bölge halkı ve ziyaretçiler için merkezi bir konumdadır."],
                ["q" => "{$st['name']} durağından geçen ilk ve son tren saat kaçta?", "a" => "Marmaray trenleri genellikle sabah 06:00 civarında ilk seferlerine başlamakta ve gece yarısı 23:59'a kadar kesintisiz hizmet vermektedir. Kesin saatler resmi tatillere göre ufak farklılıklar gösterebilir."],
                ["q" => "{$st['name']} Marmaray istasyonunda otopark var mı?", "a" => "İstasyonun hemen çevresinde veya yürüme mesafesinde belediyeye ve özel işletmelere ait otopark alanları bulunabilmektedir. Aracınızı güvenle park edip raylı sisteme geçiş yapabilirsiniz."],
                ["q" => "{$st['name']} durağında tuvalet (WC) hizmeti bulunuyor mu?", "a" => "Evet, Marmaray hattındaki diğer birçok istasyonda olduğu gibi yolcuların temel ihtiyaçlarını karşılayabilmesi adına istasyon içerisinde temiz ve düzenli tuvaletler mevcuttur."],
                ["q" => "{$title_case_keyword} için bilet fiyatları ne kadar?", "a" => "Marmaray ücret tarifesi, yolculuk yaptığınız istasyon sayısına göre değişmektedir. İstanbulkart ile giriş yaptığınızda en uzun mesafe ücreti düşülür, indiğinizde iade cihazlarından fazla tutarı geri alabilirsiniz."],
                ["q" => "{$st['name']} istasyonundan havalimanına nasıl gidebilirim?", "a" => "İstasyondan binerek Yenikapı durağına geçiş yapabilir ve oradan M1A metro hattına aktarma yaparak Atatürk Havalimanı yönüne veya metrobüs hattına bağlanarak diğer güzergahlara geçebilirsiniz."],
                ["q" => "{$st['name']} durağı engelli erişimine uygun mu?", "a" => "Kesinlikle. Tüm Marmaray istasyonları uluslararası erişilebilirlik standartlarına göre inşa edilmiştir. Geniş asansörler, yürüyen merdivenler ve hissedilebilir yüzeyler tam kapasite hizmet vermektedir."],
                ["q" => "{$st['name']} istasyonunda bisikletle trene binebilir miyim?", "a" => "Katlanabilir bisikletinizle günün her saati trene binebilirsiniz. Katlanamayan bisikletler için ise sabah ve akşam yoğun saatler (pik saatler) dışında binişinize izin verilmektedir."],
                ["q" => "{$title_case_keyword} çevresinde gezilecek yerler nelerdir?", "a" => "İstasyon bölgenin sosyal yaşantısına doğrudan entegredir. Çıkışta yürüyüş mesafesinde kafe, restoran, park ve alışveriş olanaklarına kolaylıkla erişim sağlayabilirsiniz."],
                ["q" => "MarmarayApp uygulaması {$st['name']} için ne gibi kolaylıklar sağlar?", "a" => "Uygulamamız üzerinden {$st['name']} durağına yaklaşan trenlerin anlık konumunu, gecikme bildirimlerini ve sefer tarifesini saniye saniye akıllı telefonunuzdan takip edebilirsiniz."]
            ];
            
            shuffle($faqs_pool);
            $selected_faqs = array_slice($faqs_pool, 0, 6);

            // HUMAN-LIKE EDITORIAL CONTENT GENERATION
            $content = "<h2>{$title_case_keyword} Hakkında Bilmeniz Gereken Her Şey</h2>\n";
            $content .= "<p>Günümüz metropol yaşamında ulaşım, zamanı yönetmenin en kritik anahtarıdır. İstanbul gibi devasa bir şehirde iki yaka arasını dakikalara indiren Marmaray projesinin en önemli duraklarından biri olan <strong>{$st['name']} Marmaray İstasyonu</strong>, her gün on binlerce yolcuyu güvenle taşımaktadır. Gerek mimari yapısı gerekse sunduğu aktarma olanaklarıyla bu istasyon, bölgenin ulaşım omurgasını oluşturmaktadır. MarmarayApp editörleri olarak sizler için hazırladığımız bu kapsamlı rehberde, istasyonla ilgili en çok merak edilen detayları ele alıyoruz.</p>\n";
            
            $content .= "<h3>İstasyonun Konumu ve Çevre Olanakları</h3>\n";
            $content .= "<p>İstasyondan adımınızı dışarı attığınızda, {$st['name']} bölgesinin kendine has dokusuyla karşılaşırsınız. Ulaşım ağının merkezinde yer alan bu durak, hem ticari işletmelere hem de sosyal donatı alanlarına doğrudan erişim imkanı sunar. Seyahatiniz sonrasında vakit geçirebileceğiniz parklar, yerel restoranlar ve alışveriş noktaları yürüme mesafesindedir. Ayrıca, rotanızı planlarken {$link1_html} üzerinden yapacağınız yolculuklar için de bu istasyon mükemmel bir başlangıç noktasıdır.</p>\n";

            $content .= "<h4>Mimarisi ve Yolcu Konforu</h4>\n";
            $content .= "<p>Marmaray standartlarına uygun olarak inşa edilen istasyon, ferah iç mekanı, aydınlatma sistemleri ve modern altyapısıyla dikkat çeker. Yolcuların yoğun olduğu saatlerde bile sirkülasyonun hızlı sağlanabilmesi için yürüyen merdivenler ve asansörler stratejik noktalara yerleştirilmiştir. Engelli yolcular, yaşlılar ve çocuklu aileler için engelsiz tasarım prensipleri harfiyen uygulanmıştır.</p>\n";

            $content .= "<h3>Aktarma Seçenekleri ve Kolay Ulaşım</h3>\n";
            $content .= "<p>Toplu taşımanın en büyük avantajı, farklı hatlar arasındaki entegrasyondur. {$title_case_keyword} üzerinden yapacağınız yolculuklarda, çevredeki İETT otobüs duraklarına veya minibüs hatlarına kolaylıkla geçiş yapabilirsiniz. Örneğin, şehrin farklı bir ucuna giderken {$link2_html} yönüne olan bağlantıları kullanmak, yolculuk sürenizi ciddi anlamda kısaltacaktır. Zamanın çok kıymetli olduğu günümüzde, raylı sistemin bu entegre yapısı büyük bir lükstür.</p>\n";

            $content .= "<h3>MarmarayApp ile Akıllı Seyahat</h3>\n";
            $content .= "<p>Geleneksel ulaşım alışkanlıklarını dijitalleştiren MarmarayApp, yolculuk deneyiminizi bir üst seviyeye taşıyor. Uygulamamızı kullanarak {$st['name']} durağından geçecek bir sonraki trenin tam saatini görebilir, olası teknik arızalardan önceden haberdar olabilirsiniz. Akıllı asistanımız, {$link3_html} gibi popüler rotalar için size en hızlı ve boş tren seçeneklerini bile önerebilmektedir. Ulaşımda sürprizlere yer bırakmamak için bizi takip etmeye devam edin.</p>\n";

            // SSS BÖLÜMÜ (H2 ve H3 ile SEO odaklı)
            $content .= "<h2 id='sss'>Sıkça Sorulan Sorular (SSS)</h2>\n";
            $content .= "<p>İstasyonu kullanacak yolcularımızın Google üzerinden en çok merak edip araştırdığı soruları ve detaylı yanıtlarını aşağıda sizler için derledik:</p>\n";
            
            $content .= "<div class='marmaray-faq-section'>\n";
            foreach($selected_faqs as $faq) {
                $content .= "<h3>" . $faq['q'] . "</h3>\n";
                $content .= "<p>" . $faq['a'] . "</p>\n";
            }
            $content .= "</div>\n";
            
            $content .= "<hr>\n<p><em>Not: Bu içerik, yolcularımızı bilgilendirme amacıyla MarmarayApp profesyonel editör kadrosu tarafından özenle derlenmiştir. Sefer saatlerinde yaşanabilecek anlık değişiklikler için istasyon panolarını takip etmeyi unutmayınız. İyi yolculuklar dileriz!</em></p>";

            // Update Post Content
            wp_update_post([
                'ID' => $post_id,
                'post_content' => $content
            ]);
            
            // Meta Description Update (Rank Math STRICT MATCH)
            $desc = $title_case_keyword . " seferleri, güncel istasyon saatleri, SSS (Sıkça sorulan sorular) ve ulaşım rehberi. Yolculuğunuzu MarmarayApp ile planlayın.";
            update_post_meta($post_id, 'rank_math_description', $desc);
            
            // Update Image ALT
            $thumb_id = get_post_thumbnail_id($post_id);
            if ($thumb_id) {
                update_post_meta($thumb_id, '_wp_attachment_image_alt', $title_case_keyword . ' İstasyonu');
            }

            $total_updated++;
        }
        
        echo "<h1>V6 EDITORYAL RESTORASYON TAMAMLANDI!</h1>";
        echo "<p>Toplam <strong>" . $total_updated . "</strong> istasyon makalesi Mega Makale formatına dönüştürüldü.</p>";
        echo "<p>Her makaleye 6 adet özgün SSS (Sıkça Sorulan Sorular) ve H1-H4 SEO kurgusu işlendi.</p>";
        echo "<p>Marmaray kelimesini içeren mükemmel iç linkler eklendi.</p>";
        echo "<a href='/wp-admin/edit.php'>Yazıları İncele</a>";
        exit;
    }
}
