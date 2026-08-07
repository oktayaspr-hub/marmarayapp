const fs = require('fs');
let c1 = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_saatleri_view.php', 'utf8');
let c2 = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_ucret_view.php', 'utf8');
let c3 = fs.readFileSync('wp-content/plugins/marmaray-core-v2/marmaray_rota_view.php', 'utf8');

// Strip the PHP tags
c1 = c1.replace(/<\?php[\s\S]*?\?>/g, '');
c2 = c2.replace(/<\?php[\s\S]*?\?>/g, '');
c3 = c3.replace(/<\?php[\s\S]*?\?>/g, '');

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>MarmarayApp V3.0 Local Test</title>
    <link rel="stylesheet" href="wp-content/plugins/marmaray-core-v2/assets/css/app.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body { background: #0f172a; color: white; font-family: 'Outfit', sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto; }
        .page-wrapper { margin-top: 50px; }
    </style>
</head>
<body>
    <div class="page-wrapper">
        <h1 style="color:var(--primary-color);">1. Marmaray Saatleri (V3.0)</h1>
        ${c1}
        <hr style="margin:50px 0;border-color:rgba(255,255,255,0.1);">
        
        <h1 style="color:var(--primary-color);">2. Ücret Hesapla (V3.0)</h1>
        ${c2}
        <hr style="margin:50px 0;border-color:rgba(255,255,255,0.1);">
        
        <h1 style="color:var(--primary-color);">3. Rota Planla (V3.0)</h1>
        ${c3}
    </div>
</body>
</html>`;

fs.writeFileSync('index-v3.html', html, 'utf8');
