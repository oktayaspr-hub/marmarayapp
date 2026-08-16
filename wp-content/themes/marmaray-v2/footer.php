    <footer class="site-footer">
        <div class="footer-inner">
            <div class="footer-col">
                <div class="footer-logo">Marmaray<span class="highlight">App</span></div>
                <p class="footer-disclaimer">
                    Bu site resmi bir TCDD kaynağı değildir. Gösterilen süreler tahmini olup TCDD tarafından paylaşılan
                    sefer saatleri baz alınarak hesaplanmaktadır.
                </p>
            </div>
            <div class="footer-col">
                <h4>Kurumsal</h4>
                <a href="<?php echo esc_url( home_url( '/hakkimizda' ) ); ?>">Hakkımızda</a>
                <a href="<?php echo esc_url( home_url( '/iletisim' ) ); ?>">İletişim</a>
                <a href="<?php echo esc_url( home_url( '/sponsorluk' ) ); ?>">Reklam ve Sponsorluk</a>
            </div>
            <div class="footer-col">
                <h4>Yasal Sözleşmeler</h4>
                <a href="<?php echo esc_url( home_url( '/gizlilik-politikasi' ) ); ?>">Gizlilik Politikası</a>
                <a href="<?php echo esc_url( home_url( '/cerez-politikasi' ) ); ?>">Çerez Politikası</a>
                <a href="<?php echo esc_url( home_url( '/kvkk-aydinlatma-metni' ) ); ?>">KVKK Aydınlatma Metni</a>
            </div>
            <div class="footer-col">
                <h4>Faydalı Linkler</h4>
                <a href="<?php echo esc_url( home_url( '/uygulamayi-indir' ) ); ?>">Uygulamayı İndir</a>
                <a href="<?php echo esc_url( home_url( '/sikca-sorulan-sorular' ) ); ?>">Sıkça Sorulan Sorular</a>
                <a href="<?php echo esc_url( home_url( '/sorumluluk-reddi-beyani' ) ); ?>">Sorumluluk Reddi Beyanı</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p class="footer-copy">&copy; <?php echo date('Y'); ?> MarmarayApp. Tüm hakları saklıdır.</p>
        </div>
    </footer>
    <?php wp_footer(); ?>
</body>
</html>
