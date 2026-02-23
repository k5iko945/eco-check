// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('categoryFilter');
    const gradeFilter = document.getElementById('gradeFilter');
    const resultsDiv = document.getElementById('results');

    // Populate category filter options based on actual data (optional enhancement)
    // For now, we'll use the hardcoded ones in HTML

    function renderProducts(productArray) {
        resultsDiv.innerHTML = ''; // Clear previous
        if (productArray.length === 0) {
            resultsDiv.innerHTML = '<p class="col-span-full text-center text-gray-500">No products match your filters.</p>';
            return;
        }
        productArray.forEach(p => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition';

            // Grade color classes
            let gradeColor = '';
            if (p.grade === 'A') gradeColor = 'bg-green-100 text-green-800';
            else if (p.grade === 'B') gradeColor = 'bg-green-50 text-green-600';
            else if (p.grade === 'C') gradeColor = 'bg-yellow-100 text-yellow-800';
            else if (p.grade === 'D') gradeColor = 'bg-orange-100 text-orange-800';
            else gradeColor = 'bg-red-100 text-red-800';

            // Generate unique ID for details section
            const detailId = `details-${p.name.replace(/\s+/g, '')}-${Math.random().toString(36).substr(2, 5)}`;

            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-bold text-lg">${p.name}</h3>
                        <p class="text-gray-600">${p.brand}</p>
                    </div>
                    <span class="text-2xl font-bold px-3 py-1 rounded-full ${gradeColor}">
                        ${p.grade}
                    </span>
                </div>
                <p class="mt-2 text-sm text-gray-700">${p.reason}</p>
                <button class="mt-3 text-blue-600 hover:underline" onclick="document.getElementById('${detailId}').classList.toggle('hidden')">
                    Details <i class="fas fa-chevron-down"></i>
                </button>
                <div id="${detailId}" class="hidden mt-4 text-sm border-t pt-3">
                    <p><strong>Pros:</strong> ${p.pros.join(', ')}</p>
                    <p><strong>Cons:</strong> ${p.cons.join(', ')}</p>
                    <p><strong>Sources:</strong> ${p.evidence.map(url => `<a href="${url}" target="_blank" class="text-blue-500 underline">link</a>`).join(' · ')}</p>
                </div>
            `;
            resultsDiv.appendChild(card);
        });
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const grade = gradeFilter.value;

        const filtered = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                                  p.brand.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || p.category === category;
            const matchesGrade = !grade || p.grade === grade;
            return matchesSearch && matchesCategory && matchesGrade;
        });
        renderProducts(filtered);
    }

    // Event listeners
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    gradeFilter.addEventListener('change', filterProducts);

    // Initial render
    renderProducts(products);
});
