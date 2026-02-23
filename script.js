// ======================== GLOBALS ========================
let allProducts = products; // from data.js
let userVotes = JSON.parse(localStorage.getItem('ecoCheck_votes')) || {}; // { "productName": { agree: X, disagree: Y } }
let pendingSuggestions = JSON.parse(localStorage.getItem('ecoCheck_suggestions')) || [];

// ======================== DOM ELEMENTS ========================
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');
const gradeFilter = document.getElementById('gradeFilter');
const resultsDiv = document.getElementById('results');
const totalSpan = document.getElementById('totalProducts');
const avgGradeSpan = document.getElementById('avgGrade');
const countASpan = document.getElementById('countA');
const countFSpan = document.getElementById('countF');
const toggleExplainBtn = document.getElementById('toggleExplain');
const explainerContent = document.getElementById('explainerContent');
const toggleText = document.getElementById('toggleText');
const suggestBtn = document.getElementById('suggestBtn');
const suggestionForm = document.getElementById('suggestionForm');
const submitSuggestion = document.getElementById('submitSuggestion');
const cancelSuggestion = document.getElementById('cancelSuggestion');
const pendingDiv = document.getElementById('pendingSuggestions');

// ======================== UTILITIES ========================
function updateStats(filteredProducts) {
    totalSpan.textContent = allProducts.length;
    const grades = allProducts.map(p => p.grade);
    const avg = grades.reduce((acc, g) => acc + (g.charCodeAt(0) - 65), 0) / grades.length; // A=0, B=1, etc.
    const avgLetter = String.fromCharCode(65 + Math.round(avg));
    avgGradeSpan.textContent = avgLetter;
    countASpan.textContent = grades.filter(g => g === 'A').length;
    countFSpan.textContent = grades.filter(g => g === 'F').length;
}

// Grade color mapping
function getGradeColor(grade) {
    switch(grade) {
        case 'A': return 'bg-green-100 text-green-800';
        case 'B': return 'bg-green-50 text-green-600';
        case 'C': return 'bg-yellow-100 text-yellow-800';
        case 'D': return 'bg-orange-100 text-orange-800';
        case 'F': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

// Render product cards
function renderProducts(productArray) {
    resultsDiv.innerHTML = '';
    if (productArray.length === 0) {
        resultsDiv.innerHTML = '<p class="col-span-full text-center text-gray-500">No products match your filters.</p>';
        return;
    }
    productArray.forEach(p => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition card';

        const gradeColor = getGradeColor(p.grade);
        const voteKey = p.name.replace(/\s+/g, '_');
        const votes = userVotes[voteKey] || { agree: 0, disagree: 0 };

        // Build evidence links
        const evidenceLinks = p.evidence.map(e => `<a href="${e.url}" target="_blank" class="text-blue-500 underline text-xs">${e.name}</a>`).join(' · ');

        // Check for vague terms in name/reason (simple red flag)
        const vagueTerms = ['natural', 'eco', 'green', 'friendly'];
        let hasVagueFlag = false;
        const lowerName = p.name.toLowerCase();
        const lowerReason = p.reason.toLowerCase();
        vagueTerms.forEach(term => {
            if (lowerName.includes(term) || lowerReason.includes(term)) hasVagueFlag = true;
        });

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-bold text-lg">${p.name}</h3>
                    <p class="text-gray-600">${p.brand}</p>
                </div>
                <span class="grade-badge text-2xl font-bold px-3 py-1 rounded-full ${gradeColor}" title="A: Excellent, B: Good, C: Average, D: Poor, F: Greenwashed">
                    ${p.grade}
                </span>
            </div>
            <p class="mt-2 text-sm text-gray-700">${p.reason}</p>
            ${hasVagueFlag ? '<p class="mt-1 text-xs text-orange-600"><i class="fas fa-exclamation-triangle"></i> Contains vague green claims – verify!</p>' : ''}
            <button class="mt-3 text-blue-600 hover:underline" onclick="this.nextElementSibling.classList.toggle('hidden')">
                Details <i class="fas fa-chevron-down"></i>
            </button>
            <div class="hidden mt-4 text-sm border-t pt-3">
                <p><strong>Pros:</strong> ${p.pros.join(', ')}</p>
                <p><strong>Cons:</strong> ${p.cons.join(', ')}</p>
                <p><strong>Sources:</strong> ${evidenceLinks}</p>
                <p class="text-xs text-gray-400 mt-1">Last updated: ${p.lastUpdated}</p>
            </div>
            <div class="flex items-center justify-between mt-3 text-sm">
                <div class="flex items-center space-x-3">
                    <button class="vote-btn text-green-600 hover:text-green-800" data-product="${p.name}" data-vote="agree">
                        <i class="fas fa-thumbs-up"></i> <span id="agree-${voteKey}">${votes.agree}</span>
                    </button>
                    <button class="vote-btn text-red-600 hover:text-red-800" data-product="${p.name}" data-vote="disagree">
                        <i class="fas fa-thumbs-down"></i> <span id="disagree-${voteKey}">${votes.disagree}</span>
                    </button>
                </div>
                <span class="text-xs text-gray-400">ID: ${p.name.substring(0,10)}...</span>
            </div>
        `;
        resultsDiv.appendChild(card);
    });

    // Attach vote event listeners
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.addEventListener('click', handleVote);
    });
}

// Filter products based on search and filters
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const grade = gradeFilter.value;

    const filtered = allProducts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.brand.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || p.category === category;
        const matchesGrade = !grade || p.grade === grade;
        return matchesSearch && matchesCategory && matchesGrade;
    });
    renderProducts(filtered);
}

// Handle voting
function handleVote(e) {
    const btn = e.currentTarget;
    const productName = btn.dataset.product;
    const voteType = btn.dataset.vote; // 'agree' or 'disagree'
    const key = productName.replace(/\s+/g, '_');

    if (!userVotes[key]) userVotes[key] = { agree: 0, disagree: 0 };
    userVotes[key][voteType]++;

    // Save to localStorage
    localStorage.setItem('ecoCheck_votes', JSON.stringify(userVotes));

    // Update the displayed count
    const span = document.getElementById(`${voteType}-${key}`);
    if (span) span.textContent = userVotes[key][voteType];
}

// ======================== GREENWASHING EXPLAINER ========================
toggleExplainBtn.addEventListener('click', () => {
    explainerContent.classList.toggle('hidden');
    toggleText.textContent = explainerContent.classList.contains('hidden') ? 'Show' : 'Hide';
});

// ======================== SUGGESTION SYSTEM ========================
suggestBtn.addEventListener('click', () => {
    suggestionForm.classList.toggle('hidden');
});

cancelSuggestion.addEventListener('click', () => {
    suggestionForm.classList.add('hidden');
    clearSuggestionForm();
});

submitSuggestion.addEventListener('click', () => {
    const name = document.getElementById('suggestName').value.trim();
    const brand = document.getElementById('suggestBrand').value.trim();
    const category = document.getElementById('suggestCategory').value;
    const reason = document.getElementById('suggestReason').value.trim();

    if (!name || !brand || !reason) {
        alert('Please fill in all fields.');
        return;
    }

    const suggestion = {
        name,
        brand,
        category,
        reason,
        date: new Date().toISOString().split('T')[0]
    };
    pendingSuggestions.push(suggestion);
    localStorage.setItem('ecoCheck_suggestions', JSON.stringify(pendingSuggestions));

    clearSuggestionForm();
    suggestionForm.classList.add('hidden');
    renderPendingSuggestions();
});

function clearSuggestionForm() {
    document.getElementById('suggestName').value = '';
    document.getElementById('suggestBrand').value = '';
    document.getElementById('suggestCategory').value = 'Cleaning';
    document.getElementById('suggestReason').value = '';
}

function renderPendingSuggestions() {
    if (pendingSuggestions.length === 0) {
        pendingDiv.innerHTML = '';
        return;
    }
    let html = '<div class="bg-yellow-50 p-3 rounded border mt-2"><h4 class="font-bold text-sm">Pending suggestions (stored locally)</h4><ul class="list-disc ml-5 text-sm">';
    pendingSuggestions.forEach(s => {
        html += `<li><strong>${s.name}</strong> (${s.brand}) – ${s.reason} <span class="text-gray-400">(${s.date})</span></li>`;
    });
    html += '</ul></div>';
    pendingDiv.innerHTML = html;
}

// ======================== INITIALIZATION ========================
// Update stats
updateStats(allProducts);

// Initial render
renderProducts(allProducts);

// Event listeners for filters
searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
gradeFilter.addEventListener('change', filterProducts);

// Render any pending suggestions on load
renderPendingSuggestions();

// Set global last updated (max from data)
const lastUpdated = allProducts.map(p => p.lastUpdated).sort().reverse()[0];
if (lastUpdated) document.getElementById('globalLastUpdated').textContent = lastUpdated;
