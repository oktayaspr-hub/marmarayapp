<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_blog_importer_v10');

function marmaray_blog_importer_v10() {
    if (isset($_GET['insert_blog_v10']) && $_GET['insert_blog_v10'] === 'oktay') {
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');

        $cat_id = get_cat_ID('Blog');
        if (!$cat_id) {
            $cat_id = wp_insert_category(['cat_name' => 'Blog', 'category_nicename' => 'blog']);
        }

        $posts = [
            [
                'title' => 'Yenikapı Marmaray İstasyonu: Saatler, Aktarmalar ve Çevre Rehberi',
                'slug' => 'yenikapi-marmaray-istasyonu-saatler-ve-aktarmalar',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/yenikapi.jpg',
                'tags' => 'yenikapı marmaray, yenikapı saatleri, m2 metro aktarma, marmaray ilk tren',
                'content' => '<h2>Yenikapı İstasyonu Hakkında Genel Bilgi</h2>
                              <p>Marmaray ağının kalbi olan ve Avrupa Yakası\'nın en merkezi noktalarından birinde yer alan <strong>Yenikapı İstasyonu</strong>, günlük yüz binlerce yolcunun geçiş yaptığı devasa bir aktarma merkezidir. Fatih ilçesinde, tarihi yarımadanın eteklerinde yer alan bu istasyon, hem Gebze yönüne hem de Halkalı yönüne seyahat eden yolcular için stratejik bir duraktır. Yenikapı Marmaray sefer saatleri, her gün sabahın erken saatlerinden gece yarısına kadar kesintisiz ve düzenli olarak hizmet vermektedir.</p>
                              <h3>M1 ve M2 Metro Aktarması Nasıl Yapılır?</h3>
                              <p>Yenikapı İstasyonunun en büyük avantajı, İstanbul\'un ana metro hatlarıyla olan doğrudan entegrasyonudur. Marmaray\'dan inip yer altındaki yönlendirme tabelalarını (M1 ve M2 logolu tabelalar) takip ederek yürüyen bantlar aracılığıyla metro istasyonuna ulaşabilirsiniz:</p>
                              <ul>
                                  <li><strong>M2 Yenikapı - Hacıosman Metrosu:</strong> Taksim, Şişli, Mecidiyeköy, Levent, Maslak gibi İstanbul\'un iş ve finans merkezlerine doğrudan, trafiğe takılmadan ulaşım sağlar.</li>
                                  <li><strong>M1A (Atatürk Havalimanı) ve M1B (Kirazlı) Metrosu:</strong> Otogar, Bakırköy İncirli, Şirinevler, Yenibosna ve Bağcılar yönüne giden yolcular için en hızlı aktarma yöntemidir.</li>
                              </ul>
                              <h3>Yenikapı İDO Feribot Bağlantısı</h3>
                              <p>Yenikapı sadece raylı sistemlerin değil, aynı zamanda deniz ulaşımının da merkezidir. İstasyonun "İDO" çıkışını kullanarak sadece 5-10 dakikalık bir yürüyüşle Yenikapı Feribot İskelesi\'ne ulaşabilirsiniz. Buradan Yalova, Bursa, Bandırma, Çınarcık ve Armutlu gibi noktalara kalkan hızlı feribotlara ve deniz otobüslerine kolayca aktarma yapabilirsiniz. Özellikle yaz aylarında tatilcilere büyük kolaylık sağlar.</p>
                              <h3>Çevre Rehberi ve Tarihi Yerler</h3>
                              <p>İstasyondan dışarı çıktığınızda sizi geniş Yenikapı Etkinlik Alanı ve sahil yolu karşılar. Ayrıca Tarihi Yarımada\'nın hemen girişinde olmanız sebebiyle Aksaray, Lâleli ve Kumkapı gibi turistik ve ticari bölgelere yürüme mesafesindesiniz. Kumkapı balık restoranlarına gitmek isteyenler için Yenikapı durağı en ideal iniş noktasıdır.</p>
                              <p><em>Not:</em> İlk ve son tren saatlerini, istasyonun anlık yoğunluk durumunu ve bir sonraki trenin kaç dakika sonra geleceğini sitemizdeki canlı harita üzerinden saniye saniye takip edebilirsiniz.</p>'
            ],
            [
                'title' => 'Pendik Marmaray İstasyonu: Hızlı Tren (YHT) Aktarması ve Sefer Saatleri',
                'slug' => 'pendik-marmaray-istasyonu-yht-aktarma-saatleri',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/pendik.jpg',
                'tags' => 'pendik marmaray saatleri, pendik yht aktarma, pendik hızlı tren, pendik ataköy seferleri',
                'content' => '<h2>Pendik İstasyonu ve Ulaşım Önemi</h2>
                              <p>Anadolu Yakası\'nın uç noktalarından biri gibi görünse de ulaşım ağlarının kesişim noktasında bulunan <strong>Pendik Marmaray İstasyonu</strong>, hem şehir içi hem de şehirler arası yolculuklarda kritik bir rol oynar. Gebze yönüne giden tüm trenler ve Halkalı yönüne giden ana hat trenleri Pendik\'te mutlaka durur. Pendik merkezi bir konumda olması sebebiyle, çevresindeki yoğun nüfuslu mahalleler ve komşu ilçeler için de ana çıkış kapısıdır.</p>
                              <h3>Pendik YHT (Yüksek Hızlı Tren) Aktarması</h3>
                              <p>Türkiye\'nin Yüksek Hızlı Tren (YHT) ağına bağlanmak isteyen İstanbul sakinleri için Pendik en önemli duraklardan biridir. Ankara, Konya, Eskişehir, Karaman ve Sivas yönüne seyahat edecekseniz, Pendik Marmaray istasyonunda inerek doğrudan YHT garına aktarma yapabilirsiniz. Pendik YHT istasyonu, Marmaray peronları ile yan yanadır ve tamamen entegre çalışır. Yönlendirme tabelalarını takip ederek YHT bilet gişelerine ve bekleme salonuna sadece 2 dakika içinde ulaşabilirsiniz. Özellikle büyük bagajlı yolcular için asansör ve yürüyen merdiven imkanları oldukça geniştir.</p>
                              <h3>Pendik - Ataköy Ara Trenleri Nedir?</h3>
                              <p>Marmaray ağında, günün en yoğun saatlerinde (sabah işe gidiş ve akşam iş çıkışı saatleri) ana hatta binen yükü hafifletmek amacıyla <strong>Pendik - Ataköy</strong> arasında ek seferler (Ara Trenler) düzenlenir. Bu ara trenler, Gebze\'den veya Halkalı\'dan gelen kalabalık trenlere binmek yerine, boş bir trene binip daha rahat bir yolculuk yapmanızı sağlar. Sitemizdeki canlı takip haritasında, Pendik kalkışlı veya Ataköy bitişli ara trenleri sarı veya farklı renklerle işaretlenmiş olarak kolayca görebilirsiniz.</p>
                              <h3>Pendik İDO ve Sahil Bağlantısı</h3>
                              <p>İstasyondan sahile doğru kısa bir yürüyüş yaptığınızda Pendik İDO iskelesine ulaşırsınız. Buradan Yalova\'ya kalkan feribotlara binebilirsiniz. Ayrıca Pendik Marina, sahil şeridindeki kafeler ve yürüyüş yolları istasyona oldukça yakındır. Pendik İstasyonu, hem şehir içi hız hem de şehir dışı seyahatler için tam bir ulaşım üssüdür.</p>'
            ],
            [
                'title' => 'Ayrılıkçeşmesi Marmaray İstasyonu: Kadıköy Metrosuna En Hızlı Geçiş',
                'slug' => 'ayrilikcesmesi-marmaray-kadikoy-metrosu-gecisi',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/ayrilikcesmesi.jpg',
                'tags' => 'ayrılıkçeşmesi marmaray, kadıköy metro aktarma, m4 metro, sabiha gökçen havalimanı ulaşım',
                'content' => '<h2>Boğazı Geçtikten Sonraki İlk Durak</h2>
                              <p>Avrupa Yakası\'ndan Sirkeci istasyonuna veda edip, denizin altından tüp geçitle Asya Kıtası\'na geçen Marmaray trenlerinin Anadolu Yakası\'ndaki ilk durağı <strong>Ayrılıkçeşmesi İstasyonu</strong>\'dur. Üsküdar sınırları içinde yer almasına rağmen, konumu ve aktarma olanakları sebebiyle Kadıköy trafiğinin ana dağıtım merkezlerinden biridir. Ayrılıkçeşmesi, günün her saati öğrenci ve çalışan yoğunluğunun yüksek olduğu dinamik bir istasyondur.</p>
                              <h3>M4 Kadıköy - Sabiha Gökçen Havalimanı Metrosu</h3>
                              <p>Ayrılıkçeşmesi Marmaray İstasyonu\'nun en büyük stratejik önemi, M4 metro hattı ile olan devasa ve modern yer altı aktarma merkezidir. Treninizden indiğinizde, istasyon içindeki sarı M4 tabelalarını takip ederek direkt metro peronlarına geçiş yapabilirsiniz:</p>
                              <ul>
                                  <li><strong>Kadıköy Yönü:</strong> M4 metrosuna binerek sadece bir durak sonra Kadıköy İskele Meydanı\'na (Rıhtım) varabilirsiniz. Buradan Moda tramvayına, Beşiktaş ve Eminönü vapurlarına kolayca ulaşabilirsiniz.</li>
                                  <li><strong>Sabiha Gökçen Havalimanı Yönü:</strong> M4 metrosunun diğer yönünü kullanarak Acıbadem, Göztepe, Kozyatağı, Bostancı, Maltepe, Kartal ve Pendik üzerinden tamamen yeraltından aktarmasız olarak Sabiha Gökçen Uluslararası Havalimanı\'nın (SAW) içine kadar gidebilirsiniz. Havalimanına giden yolcular için trafiğe takılmadan en garantili ulaşım yöntemidir.</li>
                              </ul>
                              <h3>Ayrılıkçeşmesi AVM ve Çevre Bağlantıları</h3>
                              <p>İstasyon, Anadolu Yakası\'nın bilinen alışveriş merkezlerinden biri olan Tepe Nautilus AVM\'nin tam bitişiğindedir. Hatta istasyondan çıkmadan AVM bölgesine yönlendiren çıkışlar mevcuttur. Acıbadem hastaneler bölgesi, İbrahim Ağa ve Kadıköy Yeldeğirmeni mahallelerine yürüyüş mesafesindeki bu durak, konumu itibarıyla çok işlevseldir. Ayrılıkçeşmesi güncel sefer saatlerini, ilk ve son tren vakitlerini sitemizdeki canlı Marmaray haritasından anlık sorgulayabilirsiniz.</p>'
            ],
            [
                'title' => 'Gebze Marmaray İstasyonu: Kocaeli\'nden İstanbul\'a Kesintisiz Ulaşım',
                'slug' => 'gebze-marmaray-istasyonu-kocaeli-istanbul-ulasim',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/gebze.jpg',
                'tags' => 'gebze marmaray, gebze saatleri, gebze ilk tren, kocaeli marmaray',
                'content' => '<h2>Marmaray\'ın Asya\'daki Son (veya İlk) Durağı</h2>
                              <p>Kocaeli sınırları içerisinde yer alan ve İstanbul raylı sisteminin doğudaki en uç noktası olan <strong>Gebze Marmaray İstasyonu</strong>, sanayi ve endüstri merkezinden metropole akan milyonlarca yolcunun başlangıç noktasıdır. Halkalı\'dan yola çıkan bir trenin toplam 76 kilometrelik güzergahı tam 115 dakika sonra Gebze\'de son bulur. Aynı şekilde sabahları İstanbul yönüne işe gidenler için de yolculuk buradan başlar.</p>
                              <h3>Gebze YHT ve Şehirlerarası Tren Bağlantıları</h3>
                              <p>Tıpkı Pendik gibi, Gebze istasyonu da Yüksek Hızlı Tren (YHT) ve diğer şehirlerarası anahat trenleri için kilit bir duraktır. Ankara, Konya, Adapazarı (Ada Ekspresi) yönüne giden trenlerin büyük bir kısmı Gebze\'de yolcu indirip bindirir. İstasyon kompleksinde Marmaray turnikeleri ile YHT gişeleri yan yana hizmet vermektedir.</p>
                              <h3>Sanayi ve İş Merkezlerine Ulaşım</h3>
                              <p>Gebze, Tuzla ve Çayırova bölgelerindeki devasa Organize Sanayi Bölgelerine (OSB), teknoparklara ve fabrikalara ulaşmak isteyen beyaz ve mavi yakalı çalışanlar için Gebze istasyonu kritik bir transfer merkezidir. İstasyondan çıkıldığında OSB\'lere giden servis araçları ve Kocaeli Büyükşehir Belediyesi otobüs hatları hemen peronların dışından kalkmaktadır.</p>
                              <h3>Gebze İlk ve Son Tren Saatleri</h3>
                              <p>Gebze istasyonundan Halkalı yönüne giden ilk tren sabahın çok erken saatlerinde, yaklaşık 05:58 sularında hareket ederken, son tren gece yarısına yakın saatlerde seferini tamamlar. Canlı takip sistemimiz üzerinden Gebze kalkışlı tüm seferleri dakika dakika görüntüleyebilir, duraklar arası ücret tarifesini hesaplayabilirsiniz. İstanbul Kart\'ınızla giriş yaptıktan sonra, varış istasyonunuzda "İade Cihazlarına" kartınızı okutmayı unutmayınız!</p>'
            ],
            [
                'title' => 'Sirkeci Marmaray İstasyonu: Tarihi Yarımada\'nın Derinliklerine Yolculuk',
                'slug' => 'sirkeci-marmaray-istasyonu-tarihi-yarimada-derinlikleri',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/sirkeci.jpg',
                'tags' => 'sirkeci marmaray, sirkeci saatleri, sirkeci tramvay aktarma, eminönü ulaşım',
                'content' => '<h2>İstanbul\'un En Derin İstasyonu</h2>
                              <p>Deniz seviyesinin tam 60 metre altında yer alan ve dünyanın mühendislik harikalarından biri sayılan <strong>Sirkeci Marmaray İstasyonu</strong>, tarihi yarımadanın tam kalbinde gizlidir. Asya\'dan Avrupa\'ya tüp geçitle geçildiğinde ulaşılan ilk duraktır. Devasa uzunluktaki yürüyen merdivenleri ve tünelleri ile Sirkeci, yolculara adeta yeraltında bir şehir deneyimi sunar.</p>
                              <h3>T1 Kabataş - Bağcılar Tramvay Aktarması</h3>
                              <p>Sirkeci istasyonunun en yoğun kullanılan özelliği, tarihi yarımadayı boydan boya geçen T1 Tramvay hattına olan doğrudan yakınlığıdır. Yeryüzüne çıktığınızda hemen Sirkeci tramvay durağı ile karşılaşırsınız:</p>
                              <ul>
                                  <li><strong>Sultanahmet ve Beyazıt Yönü:</strong> Ayasofya, Sultanahmet Camii, Topkapı Sarayı ve Kapalıçarşı gibi turistik noktalara gitmek için T1 tramvayını kullanabilirsiniz.</li>
                                  <li><strong>Eminönü ve Karaköy Yönü:</strong> Sadece 5 dakikalık bir yürüyüşle Eminönü Meydanı\'na, Mısır Çarşısı\'na, Karaköy ve Galata Kulesi bölgesine rahatlıkla ulaşabilirsiniz.</li>
                              </ul>
                              <h3>Eminönü Feribot ve Vapur İskeleleri</h3>
                              <p>Sirkeci Marmaray istasyonundan çıkarak kısa bir yürüyüşle Eminönü ve Karaköy vapur iskelelerine ulaşabilirsiniz. Buradan Kadıköy, Üsküdar, Beşiktaş, Adalar ve Boğaz hatlarına vapur seferleri düzenlenmektedir. Hem yerli halk hem de turistler için Boğaz havası almanın en pratik yolu Sirkeci\'den aktarma yapmaktır.</p>
                              <h3>Tarihi Sirkeci Garı</h3>
                              <p>Marmaray istasyonunun hemen yanında, efsanevi Orient Express\'in (Doğu Ekspresi) son durağı olan tarihi Sirkeci Garı bulunmaktadır. Mimarisiyle büyüleyen bu gar binasını ziyaret edebilir, içerisindeki Demiryolu Müzesi\'ni ücretsiz gezebilirsiniz. Tarihle modernitenin iç içe geçtiği Sirkeci Marmaray saatlerini uygulamamızdan anlık kontrol etmeyi unutmayın.</p>'
            ],
            [
                'title' => 'Üsküdar Marmaray İstasyonu: Boğazın Altından Asya\'ya İlk Adım',
                'slug' => 'uskudar-marmaray-istasyonu-bogazin-altindan-asyaya-ilk-adim',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/uskudar.jpg',
                'tags' => 'üsküdar marmaray, üsküdar saatleri, m5 metro aktarma, kız kulesi ulaşım',
                'content' => '<h2>Boğaz Geçişinin Asya Yakasındaki Kapısı</h2>
                              <p>Avrupa Yakası\'ndan (Sirkeci) tüp tünele giren trenlerin Asya Yakası\'nda gün yüzüne (veya yer altına) çıktığı ilk nokta <strong>Üsküdar Marmaray İstasyonu</strong>\'dur. Üsküdar Meydanı\'nın tam altında yer alan bu devasa istasyon, Anadolu Yakası\'nın en kritik ve en yoğun yolcu transfer merkezlerinden biridir.</p>
                              <h3>M5 Üsküdar - Çekmeköy - Samandıra Metrosu Aktarması</h3>
                              <p>Üsküdar İstasyonu, Türkiye\'nin ilk sürücüsüz tam otomatik metro hattı olan M5 hattının başlangıç noktasıdır. Marmaray\'dan inen yolcular yer altından hiç çıkmadan doğrudan M5 metrosuna aktarma yapabilirler:</p>
                              <ul>
                                  <li><strong>Altunizade ve Metrobüs Yönü:</strong> Metrobüs hattına geçmek veya Çamlıca bölgesine ulaşmak için M5 metrosuna binip Altunizade durağında inebilirsiniz.</li>
                                  <li><strong>Ümraniye, Dudullu ve Samandıra Yönü:</strong> Anadolu Yakası\'nın iç kesimlerindeki iş ve finans merkezlerine, alışveriş merkezlerine hızlıca ulaşım sağlanır.</li>
                              </ul>
                              <h3>Üsküdar İskeleleri ve Sahil Bandı</h3>
                              <p>İstasyondan dışarı adım attığınız anda doğrudan Üsküdar Meydanı\'na ve Boğaz manzarasına çıkarsınız. Beşiktaş, Kabataş ve Eminönü motorlarına anında binebilirsiniz. Ayrıca Kız Kulesi\'ne karşı çay içmek veya Salacak sahilinde yürüyüş yapmak için en ideal inme noktasıdır.</p>
                              <p>Üsküdar istasyonu sabahları Avrupa yakasına geçenlerle, akşamları evine dönenlerle dolup taşar. Tren saatlerini sitemizdeki canlı haritadan izleyerek kalabalığa takılmadan seyahatinizi planlayabilirsiniz.</p>'
            ],
            [
                'title' => 'Söğütlüçeşme Marmaray İstasyonu: Metrobüs ve YHT Aktarma Üssü',
                'slug' => 'sogutlucesme-marmaray-istasyonu-metrobus-yht-aktarma-ussu',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/sogutlucesme.jpg',
                'tags' => 'söğütlüçeşme marmaray, metrobüs aktarma, söğütlüçeşme yht, kadıköy ulaşım',
                'content' => '<h2>Anadolu Yakası\'nın Merkezi Buluşma Noktası</h2>
                              <p>Kadıköy ilçesinin tam kalbinde yer alan, Şükrü Saracoğlu (Fenerbahçe) Stadyumu\'nun hemen yanı başındaki <strong>Söğütlüçeşme Marmaray İstasyonu</strong>, bir viyadük (köprü) istasyonu olarak tasarlanmıştır. Bu istasyon, günde yüz binlerce kişinin farklı ulaşım modları arasında geçiş yaptığı tam bir "Hub" (merkez) noktasıdır.</p>
                              <h3>Metrobüs Hattı Başlangıç ve Bitiş Noktası</h3>
                              <p>Söğütlüçeşme\'nin en büyük önemi, İstanbul\'un ana can damarı olan Metrobüs hattının Anadolu Yakası\'ndaki ilk/son durağı olmasıdır. Marmaray\'dan inen yolcular, istasyon kompleksinden hiç çıkmadan kısa bir yürüyüşle Metrobüs peronlarına geçiş yapabilirler. Metrobüs kullanarak 15 Temmuz Şehitler Köprüsü üzerinden Zincirlikuyu, Mecidiyeköy ve Beylikdüzü\'ne kadar kesintisiz seyahat edebilirsiniz.</p>
                              <h3>Söğütlüçeşme YHT ve Şehirlerarası Seyahat</h3>
                              <p>Ankara, Eskişehir, Konya ve Sivas\'tan kalkan Yüksek Hızlı Trenler (YHT), Pendik ve Bostancı\'dan sonra mutlaka Söğütlüçeşme\'de durur (bazı trenlerin son durağıdır). Kadıköy, Üsküdar, Ataşehir ve Beşiktaş bölgesinde yaşayan yolcular için YHT\'ye binmenin en kolay ve merkezi yolu Söğütlüçeşme istasyonuna gelmektir.</p>
                              <h3>Kadıköy Çarşı ve Çevre Aktiviteleri</h3>
                              <p>İstasyondan inip kısa bir yürüyüşle Kadıköy Boğa Heykeli\'ne, Bahariye Caddesi\'ne ve Moda\'ya ulaşabilirsiniz. Özellikle Fenerbahçe maçlarının oynandığı günlerde istasyon inanılmaz bir insan seli ile dolar taşar. Maç günleri veya yoğun saatlerde yola çıkmadan önce mutlaka sitemizdeki canlı haritayı açıp Marmaray\'ın anlık konumlarına bakmanızı öneririz.</p>'
            ],
            [
                'title' => 'Bakırköy Marmaray İstasyonu: Alışveriş ve Sahile Açılan Kapı',
                'slug' => 'bakirkoy-marmaray-istasyonu-alisveris-ve-sahile-acilan-kapi',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/bakirkoy.jpg',
                'tags' => 'bakırköy marmaray, bakırköy saatleri, incirli metro aktarma, bakırköy meydan',
                'content' => '<h2>Avrupa Yakası\'nın En Canlı Merkezlerinden Biri</h2>
                              <p>İstanbul\'un tarihi, kültürel ve ticari olarak en köklü ilçelerinden biri olan Bakırköy\'ün kalbinde yer alan <strong>Bakırköy Marmaray İstasyonu</strong>, bölge halkının ve çevre ilçelerin ulaşımını sağlayan en önemli duraktır. İstasyon, Bakırköy Cumhuriyet Meydanı\'na ve yaya trafiğinin çok yoğun olduğu alışveriş caddelerine yürüme mesafesindedir.</p>
                              <h3>M3 Bakırköy - Kayaşehir Metrosu Aktarması (Yeni)</h3>
                              <p>Yakın zamanda açılan ve ulaşımı büyük ölçüde rahatlatan M3 metro hattı uzatması sayesinde Bakırköy Marmaray istasyonu artık M3 hattına doğrudan entegredir. İnen yolcular yeraltından metroya geçerek İncirli (Metrobüs aktarması), Bağcılar, Mahmutbey, Başakşehir ve Kayaşehir yönüne çok hızlı bir şekilde ulaşabilirler.</p>
                              <h3>Bakırköy Sahili ve İDO Feribotları</h3>
                              <p>İstasyondan denize doğru 10 dakikalık bir yürüyüş yaptığınızda, sizi yemyeşil Bakırköy sahil bandı ve yürüyüş yolları karşılar. Aynı zamanda Bakırköy İDO iskelesinden Yenikapı, Kadıköy ve Bostancı yönüne deniz otobüsü seferleri yapılmaktadır. Çevresindeki Capacity ve Carousel gibi büyük alışveriş merkezleri, Bakırköy\'ü sadece bir transit noktası değil, aynı zamanda bir varış noktası yapmaktadır.</p>
                              <h3>YHT (Yüksek Hızlı Tren) Durağı</h3>
                              <p>Söğütlüçeşme\'den sonra Marmaray hattı üzerinden Avrupa Yakası\'na geçen YHT (Yüksek Hızlı Tren) seferleri Bakırköy istasyonunda da durmaktadır. Ankara, Eskişehir ve Konya yönüne seyahat edecek Avrupa Yakası sakinleri, Halkalı\'ya kadar gitmelerine gerek kalmadan Bakırköy\'den YHT\'ye binebilirler.</p>'
            ],
            [
                'title' => 'Halkalı Marmaray İstasyonu: Avrupa\'nın Sınır Noktası ve Başlangıç',
                'slug' => 'halkali-marmaray-istasyonu-avrupanin-sinir-noktasi-baslangic',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/halkali.jpg',
                'tags' => 'halkalı marmaray, halkalı saatleri, halkalı ilk tren, halkalı yht garı',
                'content' => '<h2>Marmaray\'ın Avrupa Yakasındaki Son (İlk) Durağı</h2>
                              <p>Küçükçekmece ilçesine bağlı olan ve devasa bir demiryolu kompleksini barındıran <strong>Halkalı Marmaray İstasyonu</strong>, Gebze\'den başlayan 76 kilometrelik serüvenin batıdaki bitiş noktasıdır. Hem yerel banliyö trenleri (Marmaray) hem de uluslararası trenler için ana terminal görevi görür.</p>
                              <h3>YHT ve Uluslararası Tren Seferleri</h3>
                              <p>Halkalı, Ankara, Sivas ve Konya yönünden gelen Yüksek Hızlı Trenlerin (YHT) son durağıdır. Ayrıca Avrupa yönüne, Edirne (Kapıkule), Bulgaristan (Sofya) ve Romanya (Bükreş) güzergahlarına giden uluslararası trenler de buradan kalkmaktadır. Bu nedenle istasyon, tıpkı dev bir havalimanı gibi geniş bekleme salonlarına ve uluslararası bilet gişelerine sahiptir.</p>
                              <h3>M1B ve M11 Metro Bağlantıları (Gelecek Vizyonu)</h3>
                              <p>Halkalı, yapımı devam eden metro hatlarıyla yakında İstanbul\'un en büyük mega aktarma merkezlerinden biri olacaktır. Yeni açılacak M11 metrosu ile doğrudan İstanbul Havalimanı\'na (İGA) kesintisiz ulaşım sağlanacaktır. Ayrıca M1B (Kirazlı-Halkalı) uzatması ile Bağcılar, Esenler ve Yenikapı yönüne farklı bir alternatif metro bağlantısı kurulacaktır.</p>
                              <h3>Halkalı İlk ve Son Tren Saatleri</h3>
                              <p>Halkalı istasyonundan Gebze yönüne ilk tren sabah saatlerinde oldukça erken kalkar. Gece yarısına kadar süren seferlerde ortalama her 15 dakikada bir tren kalkışı vardır. Sitemizdeki "Marmaray Canlı Harita" özelliği sayesinde, Halkalı\'dan trenin perona girmesini saniye saniye izleyebilir, istasyona ne zaman yürümeniz gerektiğine net olarak karar verebilirsiniz.</p>'
            ],
            [
                'title' => 'Florya Akvaryum İstasyonu: Turizmin ve Deniz Havasının Merkezi',
                'slug' => 'florya-akvaryum-marmaray-istasyonu-turizm-merkezi',
                'image' => MARMARAYAPP_DIR . 'assets/images/blog/gebze.jpg',
                'tags' => 'florya akvaryum marmaray, florya saatleri, istanbul akvaryum ulaşım, florya sahil',
                'content' => '<h2>Denize Sıfır İstasyon Deneyimi</h2>
                              <p>Marmaray hattının tartışmasız en güzel manzaraya sahip, denizle iç içe olan durağı <strong>Florya Akvaryum İstasyonu</strong>\'dur. Sirkeci\'den yola çıkan tren, Zeytinburnu\'nu geçtikten sonra sahile paralel ilerlemeye başlar ve Florya\'da denize en yakın konumuna gelir. İstasyonun hemen çıkışı masmavi Marmara Denizi\'ne ve geniş yeşil park alanlarına açılır.</p>
                              <h3>İstanbul Akvaryum ve Aqua Florya AVM</h3>
                              <p>İstasyon, adını hemen yanı başındaki devasa tema parkı olan İstanbul Akvaryum\'dan alır. İstasyondan çıktığınız anda doğrudan Aqua Florya Alışveriş Merkezi\'ne ve Akvaryum girişine geçiş yapabilirsiniz. Özellikle hafta sonları çocuklu ailelerin, turistlerin ve deniz kenarında vakit geçirmek isteyen gençlerin akınına uğrar.</p>
                              <h3>Florya Sahil Parkı ve Piknik Alanları</h3>
                              <p>Aqua Florya AVM\'nin etrafında yer alan İBB Florya Sahil Parkı, yürüyüş, bisiklet ve piknik için İstanbulluların kaçış noktalarından biridir. İstasyondan inip sahilde bisiklet kiralayabilir veya denize karşı kahvenizi yudumlayabilirsiniz. Atatürk Ormanı ve Florya Sosyal Tesisleri de istasyona çok yakın mesafededir.</p>
                              <h3>Günübirlik Geziler İçin Ulaşım</h3>
                              <p>Özellikle Anadolu Yakası\'ndan veya şehrin iç kesimlerinden Florya\'ya arabayla gelmek hafta sonları büyük bir trafik çilesiyken, Marmaray sayesinde Gebze\'den veya Ayrılıkçeşmesi\'nden trene binen bir aile hiçbir trafiğe takılmadan doğrudan Akvaryum\'un kapısına kadar gelebilir. Güncel Florya Akvaryum sefer saatlerini sitemizden takip ederek dönüş planınızı aksamadan yapabilirsiniz.</p>'
            ]
        ];

        foreach ($posts as $p) {
            $existing = get_page_by_path($p['slug'], OBJECT, 'post');
            if ($existing) { $post_data['ID'] = $existing->ID; wp_update_post($post_data); wp_set_post_categories($existing->ID, [$cat_id], false); continue; }

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
                    
                    set_post_thumbnail($post_id, $attach_id);
                }
            }
            wp_set_post_categories($post_id, [$cat_id], false);
        }
        echo "<h1>Aşama 1: 10 Dev Makale Başarıyla Eklendi!</h1><a href='/wp-admin/edit.php'>Yazılara Git</a>";
        exit;
    }
}
?>

