// ========== DARK / LIGHT MODE ==========
function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

// ========== USER ACTIVITY TRACKING ==========
const userActivity = [];

function logEvent(eventType, element) {
    const timestamp = new Date().toISOString();
    const elementType = element.tagName.toLowerCase();
    const log = `${timestamp}, ${eventType}, ${elementType}`;
    
    userActivity.push(log);
    console.log(log);
}

// Track Page Load
window.addEventListener('load', () => {
    logEvent('view', document.body);
});

// Track Clicks
document.addEventListener('click', (e) => {
    logEvent('click', e.target);
});

// ========== DOWNLOAD USER ACTIVITY ==========
function downloadReport() {
    const data = userActivity.join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'UserActivityReport.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

// ========== TEXT ANALYSIS TOOL ==========
function analyzeText() {
    const text = document.getElementById('inputText').value;

    // Basic Counts
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = text.trim().split(/\s+/).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    // Tokenization
    const tokens = (text.toLowerCase().match(/\b[a-z]+\b/g) || []);

    // Word Groups
    const pronouns = ['i', 'you', 'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'our', 'their'];
    const prepositions = ['in', 'on', 'at', 'by', 'with', 'under', 'over', 'between', 'to', 'from', 'into', 'of', 'for', 'about'];
    const articles = ['a', 'an'];

    const countWords = (group) => {
        const counts = {};
        group.forEach(word => {
            counts[word] = tokens.filter(token => token === word).length;
        });
        return counts;
    };

    const result = `
<h3>Basic Stats:</h3>
<ul>
  <li>Letters: ${letters}</li>
  <li>Words: ${words}</li>
  <li>Spaces: ${spaces}</li>
  <li>Newlines: ${newlines}</li>
  <li>Special Symbols: ${specialSymbols}</li>
</ul>

<h3>Pronouns Count:</h3>
<pre>${JSON.stringify(countWords(pronouns), null, 2)}</pre>

<h3>Prepositions Count:</h3>
<pre>${JSON.stringify(countWords(prepositions), null, 2)}</pre>

<h3>Articles Count:</h3>
<pre>${JSON.stringify(countWords(articles), null, 2)}</pre>
    `;

    document.getElementById('analysisResult').innerHTML = result;
}

const textList = [
    "Anmol Sharma",
    "Software Engineer",
    "Problem Solver",
    "Coding Enthusiast",
    "Gamer"
  ];
  
  let currentText = 0;
  let currentChar = 0;
  const typeSpan = document.querySelector('.typewriter');
  
  function typeWriter() {
      if (currentChar < textList[currentText].length) {
          typeSpan.innerHTML += textList[currentText].charAt(currentChar);
          currentChar++;
          setTimeout(typeWriter, 150);
      } else {
          setTimeout(() => {
              typeSpan.innerHTML = '';
              currentChar = 0;
              currentText = (currentText + 1) % textList.length;
              typeWriter();
          }, 1000);
      }
  }
  
  typeWriter();
  