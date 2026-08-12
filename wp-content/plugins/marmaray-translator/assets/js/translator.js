document.addEventListener("DOMContentLoaded", function() {
    // 1. Protect proper nouns
    if (typeof marmarayTranslatorConfig !== 'undefined' && marmarayTranslatorConfig.protectedWords) {
        protectWords(marmarayTranslatorConfig.protectedWords);
    }

    // 2. Attach to existing theme buttons
    const langOptions = document.querySelectorAll('.lang-option');
    if (langOptions.length >= 2) {
        // First one is TR
        langOptions[0].addEventListener('click', function() {
            doGTranslate('tr');
        });
        // Second one is EN
        langOptions[1].addEventListener('click', function() {
            doGTranslate('en');
        });
    }
});

function protectWords(words) {
    // Sort words by length descending so longer phrases are matched first
    words.sort((a, b) => b.length - a.length);
    const escapedWords = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'g');

    // Walk text nodes
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const nodesToReplace = [];
    let node;

    while (node = walker.nextNode()) {
        if (node.parentElement && node.parentElement.closest('.notranslate, script, style')) continue;
        
        if (pattern.test(node.nodeValue)) {
            nodesToReplace.push(node);
        }
    }

    nodesToReplace.forEach(textNode => {
        const span = document.createElement('span');
        // Reset pattern lastIndex
        pattern.lastIndex = 0;
        let html = textNode.nodeValue.replace(pattern, '<span class="notranslate">$1</span>');
        span.innerHTML = html;
        textNode.parentNode.replaceChild(span, textNode);
    });
}

function doGTranslate(lang) {
    var teCombo = document.querySelector('select.goog-te-combo');
    if (teCombo) {
        teCombo.value = lang;
        teCombo.dispatchEvent(new Event('change'));
    } else {
        document.cookie = "googtrans=/tr/" + lang + "; path=/; domain=" + window.location.hostname;
        document.cookie = "googtrans=/tr/" + lang + "; path=/";
        window.location.reload();
    }
}
