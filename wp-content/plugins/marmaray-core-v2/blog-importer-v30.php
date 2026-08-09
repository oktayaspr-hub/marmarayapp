<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_blog_importer_v30');

function marmaray_blog_importer_v30() {
    if (isset($_GET['insert_blog_v30']) && $_GET['insert_blog_v30'] === 'oktay') {
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');

        $cat_id = get_cat_ID('Blog');
        if (!$cat_id) {
            $cat_id = wp_insert_category(['cat_name' => 'Blog', 'category_nicename' => 'blog']);
        }

        $posts = [
            [
                'title' => 'Feneryolu Marmaray İstasyonu: Kalamış ve Fenerbahçe Ulaşımı',
                'slug' => 'feneryolu-marmaray-istasyonu-kalamis-fenerbahce',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'feneryolu marmaray, kalamış, fenerbahçe, marmaray saatleri',
                'focus' => 'feneryolu marmaray',
                'content' => '<h2>Nezih Semtlerin Kesim Noktası</h2>
                              <p>Kadıköy\'ün tarihi ve nezih semtlerinden Feneryolu\'nda yer alan <strong>Feneryolu Marmaray İstasyonu</strong>, hem Kalamış Marina\'ya hem de Fenerbahçe burnuna gitmek isteyenler için stratejik bir aktarma noktasıdır. Yeşillikler içindeki sokaklarıyla bilinen bu bölgeye ulaşım Marmaray ile çok daha konforludur.</p>
                              <h3>Kalamış Marina ve Fenerbahçe Parkı</h3>
                              <p>İstasyondan inip sahil yönüne doğru keyifli bir yürüyüş yaptığınızda, İstanbul\'un en lüks marinalarından biri olan Kalamış Marina\'ya ulaşabilirsiniz. Ayrıca geniş yeşil alanlarıyla ailelerin uğrak noktası olan Fenerbahçe Parkı da yine bu güzergahtadır. Feneryolu istasyonunu kullanarak hafta sonu kahvaltılarına trafiğe takılmadan gidebilirsiniz.</p>
                              <h3>Otobüs Aktarmaları</h3>
                              <p>Feneryolu istasyonu, Minibüs Caddesi\'ne de yürüme mesafesinde olduğu için Kadıköy-Pendik hattında çalışan minibüs ve otobüslere kolayca aktarma yapma imkanı sunar. Canlı sefer saatlerimizi kontrol ederek yolculuğunuzu planlayabilirsiniz.</p>'
            ],
            [
                'title' => 'İdealtepe Marmaray İstasyonu: Sahil Keyfi ve Dinlenme',
                'slug' => 'idealtepe-marmaray-istasyonu-sahil-keyfi',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'idealtepe marmaray, idealtepe sahil, marmaray idealtepe',
                'focus' => 'idealtepe marmaray',
                'content' => '<h2>Maltepe\'nin Sakin Yüzü</h2>
                              <p>Maltepe ilçesinin nispeten daha sakin ve huzurlu semtlerinden biri olan İdealtepe\'de bulunan <strong>İdealtepe Marmaray İstasyonu</strong>, sahil yoluna ve yeşil alanlara sadece birkaç adım mesafededir.</p>
                              <h3>Sahil Parkları ve Spor Alanları</h3>
                              <p>İstasyondan indiğinizde karşınızda uçsuz bucaksız Marmara Denizi ve Adalar manzarası sizi karşılar. İdealtepe sahil şeridi, yürüyüş yolları, bisiklet parkurları ve açık hava spor aletleri ile doludur. Sabah sporunuzu yapmak veya akşam üstü deniz havası almak için İdealtepe durağı en doğru tercihtir.</p>
                              <h3>Kolay Ulaşım İmkanı</h3>
                              <p>Bostancı ve Maltepe gibi iki büyük istasyonun arasında yer aldığı için genellikle çok kalabalık olmayan bu butik istasyon, sakin bir yolculuk başlangıcı yapmak isteyen yöre halkı tarafından sıkça tercih edilir. En son tren saatleri için MarmarayApp üzerinden canlı takip yapabilirsiniz.</p>'
            ],
            [
                'title' => 'Süreyya Plajı Marmaray İstasyonu: Tarihten Günümüze',
                'slug' => 'sureyya-plaji-marmaray-istasyonu',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'süreyya plajı marmaray, süreyya paşa, maltepe sahil',
                'focus' => 'süreyya plajı marmaray',
                'content' => '<h2>Tarihi Süreyya Plajı\'nın Mirası</h2>
                              <p>İsmini bir zamanlar İstanbul\'un en ünlü plajlarından biri olan tarihi Süreyya Plajı\'ndan alan <strong>Süreyya Plajı Marmaray İstasyonu</strong>, günümüzde modern sahil dolgu alanına ve yerleşim yerlerine hizmet vermektedir. Eski plajın yerini bugün devasa yeşil parklar almış olsa da, bölge nostaljik önemini korumaktadır.</p>
                              <h3>Bakireler Tapınağı Anıtı</h3>
                              <p>Eskiden denizin ortasında bulunan ancak sahil yolu yapımı sırasında karada kalan tarihi "Bakireler Tapınağı" anıtı, istasyondan sahile indiğinizde görebileceğiniz ilginç bir yapıdır. Bu küçük ve tarihi yapı, Süreyya Plajı\'nın eski günlerini hatırlatan tek somut kanıttır.</p>
                              <h3>Maltepe Sahil Etkinlik Alanına Alternatif</h3>
                              <p>Maltepe Orhangazi Şehir Parkı\'na gitmek istiyor ancak Maltepe istasyonundaki kalabalıktan kaçınmak istiyorsanız, bir durak sonraki Süreyya Plajı istasyonunda inerek parka güneyden giriş yapabilirsiniz. Güncel saatleri sistemimizden öğrenebilirsiniz.</p>'
            ],
            [
                'title' => 'Cevizli Marmaray İstasyonu: Adliye ve AVM Merkezleri',
                'slug' => 'cevizli-marmaray-istasyonu-adliye-avm',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'cevizli marmaray, cevizli istasyonu, istanbul anadolu adliyesi',
                'focus' => 'cevizli marmaray',
                'content' => '<h2>Kartal ve Maltepe\'nin Kesişim Noktası</h2>
                              <p>Kartal ile Maltepe ilçelerinin sınırında yer alan <strong>Cevizli Marmaray İstasyonu</strong>, son yıllarda çevresine yapılan büyük alışveriş merkezleri ve rezidanslarla önemini artırmış bir ulaşım noktasıdır.</p>
                              <h3>Piazza AVM ve Maltepe Park</h3>
                              <p>İstasyon, bölgenin en büyük iki alışveriş merkezi olan Maltepe Park AVM ve Piazza AVM\'ye ulaşım sağlamak için sıkça kullanılır. İstasyondan çıktıktan sonra kısa bir taksi veya minibüs yolculuğu ile bu ticaret merkezlerine ulaşabilirsiniz.</p>
                              <h3>Anadolu Adliyesi\'ne Yakınlık</h3>
                              <p>İstanbul Anadolu Adliyesi her ne kadar Kartal sınırlarında olsa da, Cevizli istasyonundan minibüslerle adliyeye ulaşmak oldukça pratiktir. Özellikle sabah saatlerinde işine veya mahkemeye yetişmek isteyenler için Cevizli durağı kritik bir öneme sahiptir. Canlı saat takibi ile durakta bekleme sürenizi sıfıra indirebilirsiniz.</p>'
            ],
            [
                'title' => 'Atalar Marmaray İstasyonu: Yeni Gelişen Yaşam Alanları',
                'slug' => 'atalar-marmaray-istasyonu-yeni-yasam',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'atalar marmaray, atalar sahili, kartal atalar',
                'focus' => 'atalar marmaray',
                'content' => '<h2>Kartal\'ın Huzurlu Durağı</h2>
                              <p>Kartal ilçesine bağlı olan Atalar mahallesi, <strong>Atalar Marmaray İstasyonu</strong> sayesinde tüm İstanbul\'a hızlı bir şekilde entegre olmuştur. Daha çok yerleşim yeri olan bu bölge, sahile inen geniş caddeleri ile bilinir.</p>
                              <h3>Sahil Yolu ve Hastaneler</h3>
                              <p>Atalar istasyonu, Kartal Lütfi Kırdar Eğitim ve Araştırma Hastanesi ile Koşuyolu Kalp Hastanesi gibi bölgenin en büyük sağlık komplekslerine giden güzergahlar üzerinde bulunur. İstasyondan minibüs veya otobüs aktarması ile E-5 üzerindeki bu hastanelere ulaşmak mümkündür.</p>
                              <h3>Sakin ve Konforlu Yolculuk</h3>
                              <p>Büyük merkez istasyonlara (Kartal, Maltepe) göre daha sakin olan Atalar durağı, kalabalıktan uzak bir yolculuk deneyimi sunar. Sahilde yürüyüş yapmak veya evinize huzurla dönmek için Atalar istasyonunu tercih edebilirsiniz. MarmarayApp üzerinden tüm durak bilgilerine anında ulaşabilirsiniz.</p>'
            ],
            [
                'title' => 'Başak Marmaray İstasyonu: Adliyeye En Yakın Durak',
                'slug' => 'basak-marmaray-istasyonu-adliye',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'başak marmaray, anadolu adliyesi marmaray, kartal başak',
                'focus' => 'başak marmaray',
                'content' => '<h2>İstanbul Anadolu Adliyesi\'nin Ana Kapısı</h2>
                              <p>Kartal ilçesinde yer alan <strong>Başak Marmaray İstasyonu</strong>, konum itibariyle devasa İstanbul Anadolu Adalet Sarayı\'na yürüyüş mesafesindeki en yakın istasyondur. Bu sebeple hafta içi mesai saatlerinde avukatlar, memurlar ve vatandaşlar tarafından son derece yoğun kullanılır.</p>
                              <h3>Adliye Aktarması Nasıl Yapılır?</h3>
                              <p>Başak istasyonundan indiğinizde, E-5 karayolu yönüne doğru yaklaşık 15-20 dakikalık bir yürüyüşle adliyenin alt kapılarına ulaşabilirsiniz. Yürümek istemeyenler için istasyon çıkışından kalkan minibüs ve otobüsler direkt olarak adliyenin içine kadar yolcu taşımaktadır.</p>
                              <h3>Çevre Düzenlemesi ve Konutlar</h3>
                              <p>Adliyenin açılmasıyla birlikte Başak istasyonu çevresinde birçok hukuk bürosu, kafe ve restoran açılmıştır. Mahkeme işleriniz için trafik stresi çekmeden, Marmaray canlı sefer saatlerini takip ederek tam vaktinde adliyede olabilirsiniz.</p>'
            ],
            [
                'title' => 'Yunus Marmaray İstasyonu: Pendik Sınırında Sessiz Durak',
                'slug' => 'yunus-marmaray-istasyonu',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'yunus marmaray, yunus istasyonu, pendik yunus',
                'focus' => 'yunus marmaray',
                'content' => '<h2>Kartal ve Pendik Arasındaki Köprü</h2>
                              <p>Kartal\'ın doğu ucunda, Pendik sınırına çok yakın bir konumda yer alan <strong>Yunus Marmaray İstasyonu</strong>, genellikle çevre sakinleri tarafından kullanılan, sessiz ve butik bir istasyondur.</p>
                              <h3>Eski Sanayi Yeni Yaşam Alanı</h3>
                              <p>Geçmişte sanayi ve fabrikaların yoğun olduğu Yunus bölgesi, kentsel dönüşüm ve Marmaray projesi ile birlikte modern konut projelerine ev sahipliği yapmaya başlamıştır. İstasyon, bu yeni gelişen yerleşim alanlarının İstanbul merkeze hızlı bağlantısını sağlar.</p>
                              <h3>Sahil Şeridine Geçiş</h3>
                              <p>Yunus istasyonundan deniz tarafına geçmek oldukça kolaydır. Pendik ve Kartal sahilinin tam ortasında kaldığı için, bisiklet kullanıcıları ve yürüyüş yapanlar için harika bir başlangıç noktasıdır. Güncel tren kalkış vakitlerini anlık olarak uygulamamızdan görebilirsiniz.</p>'
            ],
            [
                'title' => 'Pendik Marmaray İstasyonu: YHT ve Anadolu\'ya Açılan Kapı',
                'slug' => 'pendik-marmaray-istasyonu-yht',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'pendik marmaray, pendik yht, pendik garı, hızlı tren pendik',
                'focus' => 'pendik marmaray',
                'content' => '<h2>Şehirlerarası Yolculuğun Başlangıcı</h2>
                              <p>Anadolu Yakası\'nın en büyük ve en önemli istasyonlarından biri olan <strong>Pendik Marmaray İstasyonu (Pendik Garı)</strong>, sadece bir şehir içi banliyö durağı değil, aynı zamanda Türkiye\'nin farklı şehirlerine giden Yüksek Hızlı Trenlerin (YHT) ana kalkış ve varış noktalarından biridir.</p>
                              <h3>Ankara, Konya ve Karaman YHT Bağlantısı</h3>
                              <p>Avrupa Yakası\'ndan veya Kadıköy yönünden gelen yolcular, Marmaray ile Pendik\'e gelerek buradan Ankara, Eskişehir, Konya ve Sivas yönüne giden Yüksek Hızlı Trenlere aktarma yapabilirler. Pendik Garı, YHT yolcuları için geniş bekleme salonları ve olanaklar sunar.</p>
                              <h3>Sabiha Gökçen Havalimanı ve Feribot</h3>
                              <p>İstasyondan indiğinizde, Pendik İDO iskelesine yürüyerek Yalova\'ya geçebilirsiniz. Ayrıca Sabiha Gökçen Havalimanı\'na gitmek için istasyon yakınından kalkan belediye otobüslerini ve minibüsleri kullanabilirsiniz. Uçağınıza veya treninize geç kalmamak için MarmarayApp canlı takibini kullanmayı unutmayın!</p>'
            ],
            [
                'title' => 'Kaynarca Marmaray İstasyonu: Tersane Bölgesine Yaklaşırken',
                'slug' => 'kaynarca-marmaray-istasyonu',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'kaynarca marmaray, pendik kaynarca, marmaray saatleri',
                'focus' => 'kaynarca marmaray',
                'content' => '<h2>Pendik\'in Büyüyen Mahallesi</h2>
                              <p>Pendik ilçesinin doğusunda yer alan Kaynarca, artan nüfusu ve E-5 karayoluna olan yakınlığı ile bilinir. <strong>Kaynarca Marmaray İstasyonu</strong>, bu yoğun yerleşim bölgesinin İstanbul merkeze tek vasıta ile bağlanmasını sağlayan can damarıdır.</p>
                              <h3>Yeni Metro Aktarması Beklentisi</h3>
                              <p>Şu anda yapımı devam eden Pendik-Tuzla metro hatlarının devreye girmesiyle birlikte, Kaynarca bölgesinin ulaşım ağındaki önemi daha da artacaktır. Sabiha Gökçen Havalimanı metro hattına olan bağlantı projeleri de bölgeyi değerli kılmaktadır.</p>
                              <h3>Gündelik Ulaşım Kolaylığı</h3>
                              <p>Özellikle sabah saatlerinde iş ve okula giden yolcuların yoğun olarak kullandığı istasyon, Gebze yönüne gidenler için de önemli bir geçiş noktasıdır. Hangi trenin ne zaman geleceğini sitemizdeki canlı ekranlardan kontrol ederek evden çıkabilirsiniz.</p>'
            ],
            [
                'title' => 'Tersane Marmaray İstasyonu: Gemi Sanayinin Kalbi',
                'slug' => 'tersane-marmaray-istasyonu',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'tersane marmaray, pendik tersane, tuzla tersaneleri, marmaray tersane',
                'focus' => 'tersane marmaray',
                'content' => '<h2>Denizcilik ve Sanayinin Ulaşım Noktası</h2>
                              <p>Pendik ile Tuzla sınırında yer alan <strong>Tersane Marmaray İstasyonu</strong>, adından da anlaşılacağı üzere Türkiye\'nin en büyük gemi inşa ve tersane bölgesine hizmet verir. Bu istasyon, bölgedeki sanayi tesislerinde çalışan binlerce kişi için hayati bir ulaşım imkanı sunar.</p>
                              <h3>Pendik ve Tuzla Tersaneleri</h3>
                              <p>İstasyondan güney yönüne, denize doğru ilerlediğinizde devasa vinçleri ve yapım aşamasındaki gemileriyle ünlü Tuzla ve Pendik Tersaneleri bölgesi başlar. Mühendisler, işçiler ve denizcilik sektörü çalışanları trafiğe girmemek için genellikle Marmaray\'ı tercih ederler.</p>
                              <h3>Gebze Yönüne Doğru</h3>
                              <p>Tersane istasyonu, Marmaray\'ın doğu ucundaki son duraklara (Güzelyalı, Aydıntepe, İçmeler, Tuzla, Gebze) yaklaşmadan önceki önemli geçiş noktalarından biridir. Sanayi bölgelerine giden trenlerin saatlerini ve yoğunluk durumunu MarmarayApp ile anlık takip edebilirsiniz.</p>'
            ]
        ];

        foreach ($posts as $p) {
            $existing = get_page_by_path($p['slug'], OBJECT, 'post');

            $post_data = [
                'post_title'    => $p['title'],
                'post_content'  => $p['content'],
                'post_status'   => 'publish',
                'post_author'   => 1,
                'post_name'     => $p['slug'],
                'post_type'     => 'post',
                'tags_input'    => $p['tags']
            ];

            if ($existing) {
                $post_data['ID'] = $existing->ID;
                wp_update_post($post_data);
                wp_set_post_categories($existing->ID, [$cat_id], false);
                update_post_meta($existing->ID, 'rank_math_focus_keyword', $p['focus']);
                continue;
            }

            $post_id = wp_insert_post($post_data);

            if ($post_id) {
                update_post_meta($post_id, 'rank_math_focus_keyword', $p['focus']);
                
                if (file_exists($p['image'])) {
                    $filename = basename($p['image']) . '-' . time() . '.jpg';
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
                        set_post_thumbnail($post_id, $attach_id);
                    }
                }
                wp_set_post_categories($post_id, [$cat_id], false);
            }
        }
        echo "<h1>Aşama 3: 10 Dev Makale Daha (Rank Math Uyumlu) Başarıyla Eklendi!</h1><a href='/wp-admin/edit.php'>Yazılara Git</a>";
        exit;
    }
}
