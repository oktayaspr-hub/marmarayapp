import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATIONS = [
  "Gebze","Darıca","Osmangazi","Fatih","Çayırova",
  "Tuzla","İçmeler","Aydıntepe","Güzelyalı","Tersane",
  "Kaynarca","Pendik","Yunus","Kartal","Başak",
  "Atalar","Cevizli","Maltepe","Süreyya Plajı","İdealtepe",
  "Küçükyalı","Bostancı","Suadiye","Erenköy","Göztepe",
  "Feneryolu","Söğütlüçeşme","Ayrılıkçeşmesi","Üsküdar","Sirkeci",
  "Yenikapı","Kazlıçeşme","Zeytinburnu","Yenimahalle","Bakırköy",
  "Ataköy","Yeşilyurt","Yeşilköy","Florya Akvaryum","Florya",
  "Küçükçekmece","Mustafa Kemal","Halkalı"
];

async function generateImages() {
  console.log('Starting batch image generation...');
  const browser = await puppeteer.launch({ headless: 'new' });

  const logoPath = path.join(__dirname, 'wp-content/plugins/marmaray-core-v2/assets/images/marmaray_logo_new.png');
  let logoBase64 = '';
  if (fs.existsSync(logoPath)) {
      const bitmap = fs.readFileSync(logoPath);
      logoBase64 = 'data:image/png;base64,' + Buffer.from(bitmap).toString('base64');
  }

  const outDir = path.join(__dirname, 'wp-content/plugins/marmaray-core-v2/assets/images/banners_v2');

  for (const station of STATIONS) {
    console.log(`Generating image for ${station}...`);
    
    // Create a safe filename slug
    const slug = station.toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_');
    
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          width: 1200px;
          height: 630px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .accent-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30px;
          background-color: #ff2222;
        }
        
        .accent-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 30px;
          background-color: #0056b3;
        }

        .main-content {
          z-index: 2;
          text-align: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 100px;
        }

        .footer-brand {
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-bottom: 60px;
        }

        .logo {
          height: 35px;
          object-fit: contain;
        }

        .brand-name {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -1px;
        }
        
        .brand-name .marmaray { color: #0056b3; }
        .brand-name .app { color: #ff2222; }

        h1 {
          font-size: 100px;
          font-weight: 800;
          margin: 0 0 10px 0;
          line-height: 1.1;
          color: #0056b3; 
          text-align: center;
        }

        .red-text { color: #ff2222; }

        .subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 40px; 
          font-weight: 700;
          color: #ff2222; 
          margin: 0 0 20px 0;
          letter-spacing: 2px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="accent-top"></div>
      
      <div class="main-content">
        <div class="subtitle">GÜNCEL SEFER TABLOSU</div>
        <h1>${station} <br><span class="red-text">Marmaray İstasyonu</span></h1>
      </div>

      <div class="footer-brand">
          ${logoBase64 ? '<img class="logo" src="' + logoBase64 + '" alt="Logo">' : ''}
          <div class="brand-name"><span class="marmaray">Marmaray</span><span class="app">App</span></div>
      </div>
      
      <div class="accent-bar"></div>
    </body>
    </html>
    `;

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.setContent(htmlContent);
    await new Promise(r => setTimeout(r, 200));

    const outputPath = path.join(outDir, `banner_${slug}.png`);
    await page.screenshot({ path: outputPath });
    await page.close();
  }

  await browser.close();
  console.log('Batch image generation complete!');
}

generateImages().catch(console.error);
