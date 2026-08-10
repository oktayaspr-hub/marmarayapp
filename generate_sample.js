const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set standard Facebook/Twitter OG image size
  await page.setViewport({ width: 1200, height: 630 });

  // Read logo to embed as base64 so we don't have to deal with paths in Puppeteer
  const logoPath = path.join(__dirname, 'wp-content/plugins/marmaray-core-v2/assets/images/marmaray_logo_new.png');
  let logoBase64 = '';
  if (fs.existsSync(logoPath)) {
      const bitmap = fs.readFileSync(logoPath);
      logoBase64 = 'data:image/png;base64,' + Buffer.from(bitmap).toString('base64');
  }

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
          justify-content: space-between; /* Space out top and bottom */
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Diagonal geometric accent to incorporate the red color */
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
          margin-top: 100px; /* Push the title down slightly from the top bar */
        }

        .footer-brand {
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px; /* Extremely close */
          margin-bottom: 60px; /* Sit right above the red bottom bar */
        }

        .logo {
          height: 35px; /* 90% smaller than previous massive ones! */
          object-fit: contain;
        }

        .brand-name {
          font-size: 24px; /* Tiny font */
          font-weight: 900;
          letter-spacing: -1px;
        }
        
        .brand-name .marmaray { color: #0056b3; }
        .brand-name .app { color: #ff2222; }

        h1 {
          font-size: 100px; /* Huge station name */
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
      
      <!-- Main Content (Station Name) moved to TOP -->
      <div class="main-content">
        <div class="subtitle">GÜNCEL SEFER TABLOSU</div>
        <h1>Gebze <br><span class="red-text">Marmaray İstasyonu</span></h1>
      </div>

      <!-- Brand moved to BOTTOM and shrunk by 90% -->
      <div class="footer-brand">
          ${logoBase64 ? '<img class="logo" src="' + logoBase64 + '" alt="Logo">' : ''}
          <div class="brand-name"><span class="marmaray">Marmaray</span><span class="app">App</span></div>
      </div>
      
      <div class="accent-bar"></div>
    </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  const destPath = 'C:\\Users\\mydev\\.gemini\\antigravity\\brain\\3aa74afa-9e57-4061-9ed4-b91269104c2b\\sample_banner_gebze.png';
  await page.screenshot({ path: destPath });
  
  console.log('Sample image generated at:', destPath);
  
  await browser.close();
})();
