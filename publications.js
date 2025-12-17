let allPublications = [];

// Load publications JSON
fetch('publications/publications.json')
    .then(res => res.json())
    .then(data => {
        allPublications = data;
        const years = [...new Set(data.map(pub => pub.year))].sort((a,b) => b-a);
        createYearButtons(years);
        renderPublications(allPublications);
    })
    .catch(err => console.error('Error loading publications:', err));

function createYearButtons(years) {
    const container = document.querySelector('.year-buttons');
    container.innerHTML = '<button data-year="all" class="year-btn active">All</button>';

    years.forEach(year => {
        const btn = document.createElement('button');
        btn.textContent = year;
        btn.dataset.year = year;
        btn.classList.add('year-btn');
        container.appendChild(btn);
    });

    container.addEventListener('click', e => {
        if(e.target.tagName === 'BUTTON') {
            document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const year = e.target.dataset.year;
            const filtered = year === 'all' ? allPublications : allPublications.filter(pub => pub.year == year);
            renderPublications(filtered);
        }
    });
}

function renderPublications(publications) {
    const cardsContainer = document.querySelector('.publications-cards');
    cardsContainer.innerHTML = '';

    if(publications.length === 0){
        cardsContainer.innerHTML = '<p>No publications found.</p>';
        return;
    }

    publications.forEach(pub => {
        const card = document.createElement('div');
        card.classList.add('publication-card');
        card.innerHTML = `
            <h3>${pub.title}</h3>
            <p><strong>Authors:</strong> ${pub.author.join(', ')}</p>
            <p><strong>Venue:</strong> ${pub.journal || pub.conference || ''}</p>
            <p><strong>Year:</strong> ${pub.year || ''}</p>
        `;
        cardsContainer.appendChild(card);
    });
}
