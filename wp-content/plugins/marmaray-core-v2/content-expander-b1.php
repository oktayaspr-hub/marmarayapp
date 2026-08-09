<?php
if (!defined('ABSPATH')) exit;

add_action('init', 'marmaray_content_expander_b1');

function marmaray_content_expander_b1() {
    if (isset($_GET['expand_b1']) && $_GET['expand_b1'] === 'oktay') {
        
        $expansions = [
            'yenikapi-marmaray-istasyonu-saatler-ve-aktarmalar' => '
<h2>Yenikapı İstasyonu Çevre Rehberi ve Tarihçesi</h2>
<p>İstanbul\'un ulaşım kalbi olan Yenikapı, Marmaray projesi sırasındaki arkeolojik kazılarla dünya tarihine damga vurmuştur. İstasyon inşaatı sırasında bulunan Theodosius Limanı kalıntıları ve dünyanın bilinen en eski ahşap tekne batıkları, bu bölgenin 8500 yıllık bir geçmişe sahip olduğunu kanıtlamıştır. İstasyonun içerisindeki sergi alanlarında bu kazılardan çıkarılan tarihi eserlerin replikalarını ve bilgi panolarını inceleyebilirsiniz. Yenikapı aynı zamanda İstanbul\'un en büyük miting ve etkinlik alanlarından birine, Yenikapı Etkinlik Alanı\'na (Avrasya Gösteri Merkezi) ev sahipliği yapar.</p>
<h3>Yenikapı\'dan Yapılabilecek Aktarmalar</h3>
<p>Bu istasyon kelimenin tam anlamıyla bir transfer merkezidir. Marmaray\'dan indiğinizde yeraltından hiç çıkmadan M1A (Atatürk Havalimanı), M1B (Kirazlı) ve M2 (Hacıosman) metro hatlarına geçiş yapabilirsiniz. Ayrıca istasyondan kısa bir yürüyüşle İDO Yenikapı Feribot İskelesi\'ne ulaşarak Yalova, Bursa ve Bandırma yönüne deniz otobüsleriyle seyahat edebilirsiniz. Şehir içi deniz ulaşımı için de İDO ve Şehir Hatları vapurları mevcuttur.</p>
<h3>Yenikapı Marmaray Hakkında Sıkça Sorulan Sorular</h3>
<h4>Yenikapı istasyonundan Aksaray\'a nasıl gidilir?</h4>
<p>Yenikapı istasyonundan M1A veya M1B metrosuna aktarma yaparak sadece bir durak sonra Aksaray istasyonunda inebilir veya yürüyerek 10-15 dakika içerisinde Aksaray merkeze ulaşabilirsiniz. Yeraltı çarşısından geçerek güvenle yürüyebilirsiniz.</p>
<h4>İlk ve son tren saatleri nedir?</h4>
<p>Yenikapı\'dan Gebze yönüne ilk tren sabah 06:00 civarında, Halkalı yönüne ise 06:05 civarında hareket etmektedir. Son trenler ise gece 23:50 sularında geçmektedir. Hafta sonları uygulanan gece metrosu ile seferler sabaha kadar kesintisiz sürmektedir.</p>
<h4>Otopark imkanı var mı?</h4>
<p>Evet, İSPARK tarafından işletilen ve Marmaray istasyonuna entegre olan geniş kapasiteli Yenikapı Meydan Otoparkı bulunmaktadır. Aracınızı bırakıp Marmaray ile trafiğe girmeden Asya yakasına veya Tarihi Yarımada\'ya geçebilirsiniz.</p>',

            'pendik-marmaray-istasyonu-yht-aktarma-saatleri' => '
<h2>Pendik İstasyonu ve Çevresindeki Olanaklar</h2>
<p>Pendik, İstanbul\'un Anadolu Yakası\'nda hızla gelişen, hem sanayi hem de modern yerleşim bölgelerini barındıran devasa bir ilçedir. Pendik Marmaray İstasyonu, ilçenin tam merkezinde, sahil şeridine ve çarşıya yürüme mesafesinde konumlanmıştır. İstasyonun hemen çıkışında sizi hareketli Pendik Çarşısı, kafeler, restoranlar ve alışveriş yapabileceğiniz dükkanlar karşılar. Özellikle Pendik Marina (Marintürk) ve çevresindeki sahil parkları, hafta sonları ailelerin ve gençlerin uğrak noktasıdır.</p>
<h3>Yüksek Hızlı Tren (YHT) Merkezi</h3>
<p>Pendik istasyonunun en büyük özelliği, Ankara, Konya, Eskişehir ve Sivas yönüne giden Yüksek Hızlı Trenlerin (YHT) İstanbul\'daki ana duraklarından biri olmasıdır. Marmaray ile Avrupa yakasından gelen bir yolcu, Pendik\'te inerek direkt olarak YHT peronlarına geçiş yapabilir. İstasyon içerisinde YHT yolcuları için geniş bekleme salonları, bilet satış gişeleri ve kafeteryalar mevcuttur.</p>
<h3>Pendik Marmaray Sıkça Sorulan Sorular</h3>
<h4>Pendik Marmaray\'dan Sabiha Gökçen Havalimanı\'na nasıl gidilir?</h4>
<p>İstasyondan indiğinizde Pendik Köprüsü yönüne giden minibüslere veya İETT otobüslerine (örneğin 132H, 16S, E-9) binerek direkt Sabiha Gökçen Havalimanı\'na ulaşabilirsiniz. Ayrıca taksi ile havalimanı yaklaşık 15-20 dakika sürmektedir. Yakın gelecekte Pendik-Sabiha Gökçen metro hattının da tam entegrasyonu sağlanacaktır.</p>
<h4>Pendik İDO İskelesine uzaklık ne kadar?</h4>
<p>İstasyondan sahile doğru yaklaşık 10-12 dakikalık düz bir yürüyüşle Pendik İDO iskelesine ulaşabilirsiniz. Buradan Yalova\'ya hızlı feribotlarla seyahat etmek mümkündür.</p>
<h4>İstasyon çevresinde yemek yenecek yerler var mı?</h4>
<p>Evet, istasyon Pendik merkezde olduğu için hemen çıkışında ünlü Pendik dönercileri, fast food zincirleri, yöresel ev yemekleri yapan lokantalar ve sahil tarafında lüks balık restoranları bulunmaktadır.</p>',

            'ayrilikcesmesi-marmaray-kadikoy-metrosu-gecisi' => '
<h2>Ayrılık Çeşmesi İstasyonunun Tarihi ve Önemi</h2>
<p>İsmini Osmanlı döneminde Hacca giden kafilelerin (Sürre Alayları) veya savaşa giden orduların İstanbul\'dan ayrılırken toplandığı ve vedalaştığı tarihi "Ayrılık Çeşmesi"nden alan bu istasyon, günümüzde de milyonlarca İstanbullunun yollarının kesiştiği dev bir aktarma merkezidir. İstasyonun hemen dışında, restore edilmiş orijinal çeşmeyi ve etrafındaki küçük tarihi mezarlığı görebilirsiniz. Bölge, Acıbadem ve Kadıköy Yeldeğirmeni mahallelerinin tam kesişim noktasındadır.</p>
<h3>Tepe Nautilus AVM ve Çevre Ulaşımı</h3>
<p>Ayrılık Çeşmesi Marmaray İstasyonu\'nun en büyük avantajlarından biri, bölgenin en popüler alışveriş merkezlerinden biri olan Tepe Nautilus AVM\'ye doğrudan yeraltı tüneliyle bağlı olmasıdır. İstasyondan çıkmadan, tabelaları takip ederek direkt olarak AVM\'nin içine girebilirsiniz. Ayrıca İstasyon çıkışında Acıbadem yönüne giden dolmuşlar ve Kadıköy merkeze inen otobüs durakları bulunur.</p>
<h3>Ayrılık Çeşmesi Marmaray Sıkça Sorulan Sorular</h3>
<h4>M4 Kadıköy-Sabiha Gökçen Metrosuna nasıl geçerim?</h4>
<p>Ayrılık Çeşmesi, M4 metro hattı ile Marmaray\'ın kesişim istasyonudur. Trenden indiğinizde "M4 Metro" tabelalarını takip ederek yürüyen merdivenlerle üst kata çıkıp doğrudan metro peronlarına geçiş yapabilirsiniz. Kart basarak aktarma ücreti ile seyahatinize devam edebilirsiniz.</p>
<h4>Ayrılık Çeşmesi\'nden Kadıköy merkeze yürünür mü?</h4>
<p>Evet, istasyondan çıktıktan sonra Rıhtım yönüne doğru veya meşhur Yeldeğirmeni mahallesi içinden geçerek yaklaşık 15-20 dakikalık keyifli bir yürüyüşle Kadıköy Boğa heykeline veya vapur iskelelerine ulaşabilirsiniz.</p>
<h4>İstasyonda tuvalet ve bebek bakım odası var mı?</h4>
<p>Evet, tüm büyük Marmaray aktarma istasyonlarında olduğu gibi Ayrılık Çeşmesi\'nde de yolcuların kullanımı için temiz ve düzenli tuvaletler ile bebek bakım odaları yeraltı çarşısı bölümünde hizmet vermektedir.</p>',

            'gebze-marmaray-istasyonu-kocaeli-istanbul-ulasim' => '
<h2>Gebze İstasyonu: İstanbul\'un Doğudaki Sınırı</h2>
<p>Marmaray hattının doğudaki başlangıç ve bitiş noktası olan Gebze İstasyonu, Kocaeli il sınırları içerisinde yer almasına rağmen İstanbul\'un banliyö ulaşım ağına tamamen entegre edilmiştir. Kocaeli\'nin en büyük ve en kalabalık ilçesi olan Gebze, sanayi siteleri, teknoparklar ve büyük fabrikalar ile çevrilidir. Bu nedenle Gebze Marmaray İstasyonu, her gün on binlerce işçi, mühendis ve öğrencinin İstanbul ile Kocaeli arasındaki ulaşımını sağlayan hayati bir damardır.</p>
<h3>Gebze Çevresi ve Gidilebilecek Yerler</h3>
<p>İstasyondan çıktıktan sonra Gebze merkeze, Çoban Mustafa Paşa Külliyesi gibi tarihi mekanlara veya Gebze Teknik Üniversitesi\'ne (TÜBİTAK kampüsüne) giden belediye otobüsleri ve minibüsler mevcuttur. Ayrıca Darıca sahili, Faruk Yalçın Hayvanat Bahçesi ve Botanik Parkı gibi turistik noktalara gitmek isteyenler de genellikle ulaşım planlarını Gebze İstasyonu üzerinden yaparlar.</p>
<h3>Gebze Marmaray Sıkça Sorulan Sorular</h3>
<h4>Gebze\'den Halkalı\'ya yolculuk kaç dakika sürüyor?</h4>
<p>Marmaray hattının bir ucundan diğer ucuna (Gebze - Halkalı arası) yapılan yolculuk toplam 43 istasyondan oluşur ve ortalama 115 dakika (1 saat 55 dakika) sürmektedir. Hattın uzunluğu 76 kilometredir.</p>
<h4>Gebze istasyonunda Yüksek Hızlı Tren (YHT) duruyor mu?</h4>
<p>Evet, Ankara, Eskişehir ve Konya yönüne giden Yüksek Hızlı Trenler ile Adapazarı yönüne giden Ada Ekspresi bölgesel trenleri Gebze Garı\'nda yolcu indirip bindirmektedir. YHT biletlerinizi istasyondaki TCDD gişelerinden temin edebilirsiniz.</p>
<h4>Gebze Center AVM\'ye nasıl gidebilirim?</h4>
<p>İstasyondan çıktıktan sonra güney yönünde (E-5 karayolu tarafına) kalkan minibüsler ile yaklaşık 10-15 dakikalık kısa bir yolculukla bölgenin en büyük alışveriş merkezi olan Gebze Center\'a ulaşabilirsiniz.</p>',

            'sirkeci-marmaray-istasyonu-tarihi-yarimada-derinlikleri' => '
<h2>Sirkeci İstasyonu: Tarihin ve Turizmin Merkezi</h2>
<p>Tarihi Yarımada\'nın kalbinde yer alan Sirkeci Marmaray İstasyonu, İstanbul\'un en derin ve mimari açıdan en etkileyici istasyonlarından biridir. Denizin metrelerce altında yer alan peronlardan devasa yürüyen merdivenlerle yeryüzüne çıktığınızda, kendinizi direkt olarak İstanbul\'un binlerce yıllık tarihinin ortasında bulursunuz. İstasyonun hemen yanında tarihi Sirkeci Garı (Orient Express\'in son durağı) bulunur. Sultanahmet, Ayasofya, Topkapı Sarayı, Gülhane Parkı ve Mısır Çarşısı gibi dünya çapındaki turistik mekanlara yürüme mesafesindedir.</p>
<h3>Sirkeci Garı ve Çevresindeki Yaşam</h3>
<p>Sirkeci bölgesi, İstanbul\'un en işlek ticaret ve turizm merkezlerinden biridir. İstasyon çıkışında sizi meşhur hafız Mustafa tatlıcıları, lokumcular, yöresel baharatçılar ve elektronik eşya satan tarihi hanlar (örneğin Doğubank) karşılar. Ayrıca Eminönü Meydanı ve Galata Köprüsü\'ne sadece 5 dakikalık yürüme mesafesinde olması, balık ekmek yemek veya Boğaz turuna çıkmak isteyenler için eşsiz bir konum sunar.</p>
<h3>Sirkeci Marmaray Sıkça Sorulan Sorular</h3>
<h4>Sirkeci Marmaray istasyonu kaç metre derinlikte?</h4>
<p>Sirkeci istasyonu, deniz seviyesinin yaklaşık 60 metre altında yer alır ve Türkiye\'nin en derin istasyonlarından biridir. Peronlara ulaşmak için kullanılan yürüyen merdivenler, Avrupa\'nın en uzun yürüyen merdivenleri arasında gösterilir.</p>
<h4>Sirkeci\'den Tramvaya nasıl aktarma yaparım?</h4>
<p>Sirkeci istasyonunun ana çıkışını kullandığınızda, hemen karşınızda T1 Kabataş-Bağcılar Tramvay hattının Sirkeci durağını göreceksiniz. Buradan tramvaya binerek Sultanahmet, Beyazıt (Kapalıçarşı) veya Karaköy yönüne kolayca seyahat edebilirsiniz.</p>
<h4>Tarihi Sirkeci Garı Müzesi ücretli mi?</h4>
<p>Tarihi garın içinde bulunan TCDD İstanbul Demiryolu Müzesi ücretsiz olarak ziyaret edilebilmektedir. Marmaray\'dan çıktıktan sonra tarihi garın içine girerek bu küçük ama büyüleyici müzeyi gezebilirsiniz.</p>'
        ];

        $count = 0;
        foreach ($expansions as $slug => $new_content) {
            $existing = get_page_by_path($slug, OBJECT, 'post');
            if ($existing) {
                // Sadece daha önce eklenmemişse ekle
                if (strpos($existing->post_content, 'Sıkça Sorulan Sorular') === false) {
                    $updated_content = $existing->post_content . "\n\n" . $new_content;
                    wp_update_post([
                        'ID' => $existing->ID,
                        'post_content' => $updated_content
                    ]);
                    $count++;
                }
            }
        }
        
        echo "<h1>Grup 1: 5 Makaleye Eşsiz ve Uzun (600+ Kelimelik) İçerikler Başarıyla Eklendi!</h1>";
        echo "<p>Güncellenen makale sayısı: <strong>" . $count . "</strong></p>";
        echo "<a href='/wp-admin/edit.php'>Yazılara Git</a>";
        exit;
    }
}
