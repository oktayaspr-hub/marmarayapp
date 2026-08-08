<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_blog_importer_v20');

function marmaray_blog_importer_v20() {
    if (isset($_GET['insert_blog_v20']) && $_GET['insert_blog_v20'] === 'oktay') {
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');

        $cat_id = get_cat_ID('Blog');
        if (!$cat_id) {
            $cat_id = wp_insert_category(['cat_name' => 'Blog', 'category_nicename' => 'blog']);
        }

        $posts = [
            [
                'title' => 'Kadıköy İskelesi ve Ayrılıkçeşmesi Marmaray Aktarması',
                'slug' => 'kadikoy-iskelesi-ve-ayrilikcesmesi-marmaray-aktarmasi',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/kadikoy.jpg',
                'tags' => 'kadıköy marmaray, ayrılıkçeşmesi aktarma, kadıköy vapur, marmaray kadıköy',
                'focus' => 'kadıköy marmaray aktarma',
                'content' => '<h2>Kadıköy\'den Marmaray\'a Nasıl Gidilir?</h2>
                              <p>Anadolu Yakası\'nın kalbi Kadıköy, deniz ulaşımının ve alışverişin merkezidir. Ancak ilginç bir şekilde Marmaray hattı doğrudan Kadıköy sahilinden geçmez. Kadıköy Meydanı\'ndan Marmaray\'a ulaşmanın en hızlı ve pratik yolu, M4 Kadıköy-Sabiha Gökçen metro hattını kullanarak sadece bir durak sonraki <strong>Ayrılıkçeşmesi</strong> istasyonunda inmek ve oradan Marmaray\'a aktarma yapmaktır.</p>
                              <h3>Vapur İskeleleri ve Rıhtım Bağlantısı</h3>
                              <p>Avrupa Yakası\'ndan (Beşiktaş, Eminönü, Karaköy) vapura binip Kadıköy İskelesi\'nde indiğinizde, hemen karşınızdaki metro girişinden yeraltına inebilirsiniz. Metroya bindikten tam 2 dakika sonra Ayrılıkçeşmesi Marmaray istasyonundasınız. Bu kesintisiz yeraltı bağlantısı sayesinde, kışın yağmurdan, yazın sıcaktan etkilenmeden yolculuğunuzu tamamlayabilirsiniz.</p>
                              <h3>Moda Tramvayı ve Çevre Gezisi</h3>
                              <p>Marmaray\'dan inip Kadıköy\'e ulaştığınızda, meşhur Boğa Heykeli\'ni ziyaret edebilir, Bahariye Caddesi\'nde alışveriş yapabilir veya tarihi Moda Tramvayı ile nostaljik bir tur atabilirsiniz. Kadıköy aktarmasını kullanırken canlı sefer saatlerini sitemizden kontrol etmeyi unutmayın!</p>'
            ],
            [
                'title' => 'Bostancı Marmaray İstasyonu: Adalar Vapuru ve YHT',
                'slug' => 'bostanci-marmaray-istasyonu-adalar-vapuru-yht',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'bostancı marmaray, bostancı yht, adalar vapuru, bostancı saatleri',
                'focus' => 'bostancı marmaray',
                'content' => '<h2>Bostancı İstasyonunun Ulaşım Önemi</h2>
                              <p>İstanbul Anadolu Yakası\'nın en elit ve nostaljik semtlerinden biri olan Bostancı, <strong>Bostancı Marmaray İstasyonu</strong> ile şehrin dört bir yanına hızlıca bağlanır. Sahile sadece yürüme mesafesinde olan bu istasyon, özellikle yaz aylarında Adalar\'a gitmek isteyen yerli ve yabancı turistlerin en yoğun kullandığı aktarma noktalarından biridir.</p>
                              <h3>Bostancı YHT (Yüksek Hızlı Tren) Durağı</h3>
                              <p>Bostancı, Marmaray hattı üzerinde Söğütlüçeşme ve Pendik ile birlikte Yüksek Hızlı Trenlerin (YHT) durduğu üç istasyondan biridir. Ankara, Eskişehir ve Konya\'dan gelen yolcular, Bağdat Caddesi ve sahil şeridine gitmek istediklerinde genellikle Bostancı\'da inerler. Ayrıca Adapazarı yönüne giden Ada Ekspresi de bu istasyondan yolcu almaktadır.</p>
                              <h3>Adalar Vapuru ve Deniz Otobüsü</h3>
                              <p>Bostancı istasyonundan çıkar çıkmaz, denize doğru 5 dakikalık kısa bir yürüyüşle Bostancı İskelesi\'ne varırsınız. Buradan Büyükada, Heybeliada, Burgazada ve Kınalıada\'ya kalkan Şehir Hatları vapurlarına ve İDO deniz otobüslerine anında aktarma yapabilirsiniz. Bostancı Marmaray saatlerini uygulamamızdan anlık kontrol edebilirsiniz.</p>'
            ],
            [
                'title' => 'Göztepe Marmaray İstasyonu: Bağdat Caddesi\'ne Ulaşım',
                'slug' => 'goztepe-marmaray-istasyonu-bagdat-caddesi-ulasim',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'göztepe marmaray, bağdat caddesi, göztepe parkı, marmaray göztepe saatleri',
                'focus' => 'göztepe marmaray',
                'content' => '<h2>Göztepe İstasyonu ve Bağdat Caddesi</h2>
                              <p>Kadıköy ilçesinin en önemli duraklarından biri olan <strong>Göztepe Marmaray İstasyonu</strong>, ünlü Bağdat Caddesi\'ne gitmek isteyenler için ana çıkış kapılarından biridir. İstasyondan indiğinizde ağaçlıklı ve nezih sokaklardan yürüyerek kısa sürede Cadde\'nin kalbine inebilirsiniz.</p>
                              <h3>Göztepe 60. Yıl Parkı</h3>
                              <p>Göztepe istasyonundan sahile doğru yürüdüğünüzde, İstanbul\'un en bakımlı ve büyük parklarından biri olan Göztepe 60. Yıl Parkı sizi karşılar. Lale festivali dönemlerinde rengarenk çiçeklerle bezenen bu park, aileler ve çocuklar için harika bir vakit geçirme alanıdır.</p>
                              <h3>Göztepe Metrosu Aktarması (M12 Gelecek Planı)</h3>
                              <p>Göztepe istasyonu, yapımı devam eden M12 Göztepe-Ümraniye metro hattı tamamlandığında çok daha büyük bir aktarma merkezine dönüşecektir. Bu hat açıldığında, Ataşehir Finans Merkezi\'ne ve Ümraniye\'ye giden yolcular Göztepe\'den doğrudan yeraltı metrosuna aktarma yapabileceklerdir.</p>'
            ],
            [
                'title' => 'Maltepe Marmaray İstasyonu: Dev Etkinlik Alanı ve Sahil',
                'slug' => 'maltepe-marmaray-istasyonu-etkinlik-alani-ve-sahil',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'maltepe marmaray, maltepe sahil, maltepe etkinlik alanı, marmaray maltepe saatleri',
                'focus' => 'maltepe marmaray',
                'content' => '<h2>Maltepe Sahiline Açılan Kapı</h2>
                              <p>Anadolu Yakası\'nın hızla gelişen ilçesi Maltepe\'nin ana ulaşım arteri olan <strong>Maltepe Marmaray İstasyonu</strong>, sahil şeridine ve ilçenin ticaret merkezlerine çok yakın bir konumdadır. Günlük binlerce kişinin iş ve okul için kullandığı bu istasyon, hafta sonları ise sahil yolcularının akınına uğrar.</p>
                              <h3>Maltepe Orhangazi Şehir Parkı (Miting Alanı)</h3>
                              <p>Avrupa\'nın en büyük yaşam, spor ve etkinlik alanlarından biri olan Maltepe Sahil Parkı, istasyona sadece yürüme mesafesindedir. Konserler, mitingler ve büyük festivaller genellikle bu devasa alanda yapılır. Etkinlik günlerinde trafiğe takılmamak ve park yeri sorunu yaşamamak için Marmaray\'ı kullanmak en mantıklı çözümdür.</p>
                              <h3>Çevre İmkanları ve Alışveriş</h3>
                              <p>İstasyonun hemen çevresinde kafeler, restoranlar ve yerel alışveriş caddeleri bulunur. Ayrıca Maltepe Piazza AVM gibi büyük alışveriş merkezlerine minibüslerle veya kısa taksi yolculuklarıyla kolayca ulaşabilirsiniz. Güncel tren saatlerini öğrenmek için canlı haritamızı kullanabilirsiniz.</p>'
            ],
            [
                'title' => 'Kartal Marmaray İstasyonu: Anadolu Yakası\'nın Yükselen Merkezi',
                'slug' => 'kartal-marmaray-istasyonu-anadolu-yakasi-merkezi',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'kartal marmaray, kartal sahil, kartal adliye, marmaray kartal',
                'focus' => 'kartal marmaray',
                'content' => '<h2>Kartal İstasyonunun Kilit Rolü</h2>
                              <p>Kartal, son yıllarda yapılan dev yatırımlar, gökdelenler ve adliye sarayı ile Anadolu Yakası\'nın yeni cazibe merkezlerinden biri haline gelmiştir. <strong>Kartal Marmaray İstasyonu</strong>, ilçenin tam merkezinden geçerek yolcuları hem doğuya (Gebze) hem de batıya (Halkalı) kesintisiz bağlar.</p>
                              <h3>Kartal İDO ve Adalar Seferleri</h3>
                              <p>Bostancı\'ya alternatif olarak, Adalar\'a gitmek isteyenler Kartal İDO iskelesini de kullanabilirler. İstasyondan çıkarak 10 dakikalık bir yürüyüşle Kartal iskelesine varabilir, buradan Yalova ve Adalar\'a kalkan deniz otobüslerine veya motorlara binebilirsiniz.</p>
                              <h3>Anadolu Adliyesi\'ne Ulaşım</h3>
                              <p>Dünyanın en büyük adliye binalarından biri olan İstanbul Anadolu Adalet Sarayı, Kartal sınırları içerisindedir. Marmaray Kartal istasyonunda indikten sonra adliyeye giden minibüslere binebilir veya bir durak sonraki Başak istasyonunda inerek aktarma yapabilirsiniz. Sabah saatlerindeki yoğunlukta canlı tren takibini uygulamamızdan yapabilirsiniz.</p>'
            ],
            [
                'title' => 'Zeytinburnu Marmaray İstasyonu: Fişekhane ve Tarihi Dokular',
                'slug' => 'zeytinburnu-marmaray-istasyonu-fisekhane-tarihi-dokular',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'zeytinburnu marmaray, fişekhane, zeytinburnu sahil, marmaray zeytinburnu',
                'focus' => 'zeytinburnu marmaray',
                'content' => '<h2>Avrupa Yakası\'nda Sahilin Başlangıcı</h2>
                              <p>Sirkeci, Yenikapı ve Kazlıçeşme\'nin ardından Avrupa Yakası sahilini takip eden Marmaray treninin önemli duraklarından biri <strong>Zeytinburnu Marmaray İstasyonu</strong>\'dur. İstasyon, Zeytinburnu ilçesinin sahile en yakın, modern ve turistik bölgelerine hizmet verir.</p>
                              <h3>Fişekhane ve Büyükyalı</h3>
                              <p>Son yılların en popüler yaşam ve kültür sanat merkezlerinden biri olan Fişekhane, Zeytinburnu Marmaray istasyonunun hemen yanı başındadır. Tarihi 19. yüzyıla dayanan ve restore edilerek modern bir yaşam alanına dönüştürülen Fişekhane\'deki tiyatro oyunlarına, konserlere ve restoranlara gitmek için Marmaray\'ı kullanmak en hızlı yöntemdir.</p>
                              <h3>Zeytinburnu Sahil Parkı</h3>
                              <p>Geniş yeşil alanlara ve deniz manzarasına sahip Zeytinburnu Sahili, yürüyüş ve piknik için idealdir. İstasyondan iner inmez denizin kokusunu alabilir, gün batımına karşı keyifli bir yürüyüş yapabilirsiniz. Zeytinburnu durak saatleri için sitemizdeki canlı sistemi kullanabilirsiniz.</p>'
            ],
            [
                'title' => 'Kazlıçeşme Marmaray İstasyonu: Tarihi Surlar ve Açık Alanlar',
                'slug' => 'kazlicesme-marmaray-istasyonu-tarihi-surlar',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'kazlıçeşme marmaray, yedikule surları, kazlıçeşme etkinlik alanı',
                'focus' => 'kazlıçeşme marmaray',
                'content' => '<h2>Yenikapı\'dan Sonraki İlk Açık Hava İstasyonu</h2>
                              <p>Yenikapı\'nın karanlık tünellerinden çıkan trenlerin gün ışığıyla buluştuğu ilk durak olan <strong>Kazlıçeşme Marmaray İstasyonu</strong>, İstanbul\'un tarihi dokusunun modern ulaşım ile harmanlandığı özel bir noktadır. Kazlıçeşme, uzun yıllar boyunca dericilik ve sanayi ile anılsa da bugün daha çok etkinlik ve ulaşım üssü olarak bilinir.</p>
                              <h3>Yedikule Surları ve Zindanları</h3>
                              <p>İstasyondan çıkıp çok kısa bir yürüyüş yaptığınızda, İstanbul\'un efsanevi tarihi surlarına ve Yedikule Zindanları\'na ulaşırsınız. Tarihe meraklıysanız, Bizans ve Osmanlı izlerini taşıyan bu surların etrafında yürüyüş yapmak için Kazlıçeşme istasyonu mükemmel bir başlangıç noktasıdır.</p>
                              <h3>Kazlıçeşme Miting Alanı</h3>
                              <p>İstanbul\'daki büyük toplumsal etkinliklerin, mitinglerin ve açık hava fuarlarının vazgeçilmez adresi Kazlıçeşme Meydanı, istasyonun hemen karşısındadır. Yoğun etkinlik günlerinde karayolu trafiği tamamen kilitlendiği için, Marmaray tek mantıklı ulaşım aracıdır.</p>'
            ],
            [
                'title' => 'Ataköy Marmaray İstasyonu: Yeni M9 Metrosu Aktarması',
                'slug' => 'atakoy-marmaray-istasyonu-m9-metro-aktarmasi',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'ataköy marmaray, m9 metro, ataköy aktarma, olimpiyat metrosu',
                'focus' => 'ataköy marmaray',
                'content' => '<h2>Ataköy İstasyonunun Stratejik Dönüşümü</h2>
                              <p>Bakırköy ilçesinin lüks ve modern yüzü olan Ataköy semtinde yer alan <strong>Ataköy Marmaray İstasyonu</strong>, yakın zamana kadar standart bir ara durakken, yeni açılan M9 metro hattı ile devasa bir aktarma merkezine dönüşmüştür.</p>
                              <h3>M9 Ataköy - Olimpiyat Metrosu</h3>
                              <p>Marmaray treninden indiğinizde, yeraltı yürüme bantlarını takip ederek direkt olarak M9 metro hattına geçebilirsiniz. Bu hat sayesinde Bahçelievler, İkitelli Sanayi, Masko ve Olimpiyat Stadyumu bölgesine trafiğe hiç girmeden inanılmaz bir hızla ulaşabilirsiniz. Özellikle Avrupa Yakası\'nın iç kesimlerinden sahil hattına inmek isteyenler için bu aktarma devrim niteliğindedir.</p>
                              <h3>Ara Trenlerin Son Durağı</h3>
                              <p>Günün yoğun saatlerinde Halkalı\'ya kadar gitmeyen ve seferini Ataköy\'de tamamlayan Pendik-Ataköy "ara trenleri" mevcuttur. Bu trenler Ataköy\'den boş olarak dönerek Pendik yönüne daha konforlu seyahat imkanı sunar. Ara tren saatlerini canlı haritamız üzerinden saniye saniye takip edebilirsiniz.</p>'
            ],
            [
                'title' => 'Suadiye Marmaray İstasyonu: Bağdat Caddesi\'nin Kalbi',
                'slug' => 'suadiye-marmaray-istasyonu-bagdat-caddesinin-kalbi',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'suadiye marmaray, bağdat caddesi, suadiye sahil, suadiye saatleri',
                'focus' => 'suadiye marmaray',
                'content' => '<h2>Alışveriş ve Sosyal Yaşamın Merkez İstasyonu</h2>
                              <p>Kadıköy ilçesinin en prestijli semtlerinden biri olan Suadiye\'de yer alan <strong>Suadiye Marmaray İstasyonu</strong>, doğrudan Bağdat Caddesi\'nin en hareketli bölümüne bağlanır. Gençlerin, ailelerin ve alışveriş tutkunlarının en çok tercih ettiği inme noktasıdır.</p>
                              <h3>Bağdat Caddesi ve Kafeler</h3>
                              <p>İstasyondan çıkıp birkaç adım attığınızda kendinizi ünlü Bağdat Caddesi\'nde bulursunuz. Dünyaca ünlü markaların mağazaları, şık kafeler, restoranlar ve eğlence mekanları Suadiye istasyonunun hemen etrafında kümelenmiştir. Hafta sonu buluşmaları için trafiğe girmeden Marmaray kullanmak en pratik yoldur.</p>
                              <h3>Suadiye Sahili</h3>
                              <p>İstasyondan denize doğru yaklaşık 10 dakika yürüdüğünüzde, İstanbul\'un en güzel sahil yürüyüş yollarından birine ulaşırsınız. Paten kayanlar, bisiklete binenler ve Adalar manzarasına karşı kahvesini içenler için Suadiye Sahili muazzam bir kaçış noktasıdır.</p>'
            ],
            [
                'title' => 'Erenköy Marmaray İstasyonu: Tarihi ve Nostaljik Dokular',
                'slug' => 'erenkoy-marmaray-istasyonu-tarihi-nostaljik-doku',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/station_v2.jpg',
                'tags' => 'erenköy marmaray, erenköy istasyonu, tarihi erenköy, bağdat caddesi',
                'focus' => 'erenköy marmaray',
                'content' => '<h2>Eski İstanbul Sayfiyesi ve Modern Yaşam</h2>
                              <p>Bir zamanlar İstanbulluların yazlık sayfiye yeri olan Erenköy, günümüzde yüksek katlı modern binaları ve sakin sokaklarıyla öne çıkar. <strong>Erenköy Marmaray İstasyonu</strong>, tarihi dokusunu koruyan küçük ama çok işlevsel bir duraktır.</p>
                              <h3>Tarihi Erenköy İstasyon Binası</h3>
                              <p>Marmaray projesi öncesindeki eski banliyö hattından kalan tarihi Erenköy istasyon binası, mimarisiyle hala nostaljik bir hava yaratır. İstasyon çevresindeki asırlık çınar ağaçları ve sakin sokaklar, İstanbul\'un koşturmacasından uzaklaşmak isteyenlere nefes aldırır.</p>
                              <h3>Mahalle Kültürü ve Ulaşım</h3>
                              <p>Erenköy, Bağdat Caddesi ile Minibüs Yolu (Fahrettin Kerim Gökay Caddesi) arasında köprü görevi görür. İstasyondan her iki ana artere de yürüyerek kısa sürede ulaşabilirsiniz. Çevresindeki yerel fırınlar, butik kafeler ve mahalle kültürü, Erenköy\'ü özel kılan detaylardır. Güncel Marmaray saatleri için uygulamamızı kullanabilirsiniz.</p>'
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
        echo "<h1>Aşama 2: 10 Dev Makale ve SEO Anahtar Kelimeleri Başarıyla Eklendi!</h1><a href='/wp-admin/edit.php'>Yazılara Git</a>";
        exit;
    }
}
