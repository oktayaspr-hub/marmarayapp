const fs = require('fs');
let css = fs.readFileSync('wp-content/plugins/marmaray-core-v2/assets/css/app.css', 'utf8');

const newCSS = 
.station-picker-header-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 20px;
    padding: 0 10%;
    margin-bottom: 25px;
}
@media (max-width: 768px) {
    .station-picker-header-grid {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        text-align: center;
        padding: 0 5%;
    }
}
;

css += newCSS;
fs.writeFileSync('wp-content/plugins/marmaray-core-v2/assets/css/app.css', css, 'utf8');
