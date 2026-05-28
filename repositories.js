fetch('repositories/repositories.json')
    .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.url}`);
        return res.json();
    })
    .then(data => renderRepositories(data))
    .catch(err => {
        console.error('Error loading repositories:', err);
        const container = document.querySelector('.repositories-cards');
        if (container) container.innerHTML = `<p>Error loading repositories: ${err.message}</p>`;
    });

function renderRepositories(repositories) {
    const cardsContainer = document.querySelector('.repositories-cards');
    if (!cardsContainer) return;
    cardsContainer.innerHTML = '';

    if (!repositories || repositories.length === 0) {
        cardsContainer.innerHTML = '<p>No repositories found.</p>';
        return;
    }

    repositories.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'publication-card repo-card';

        card.innerHTML = `
            <h3>${repo.name}</h3>
            <button class="toggle-desc">Show Description ▼</button>
            <p class="repo-desc">${repo.description || 'No description available.'}</p>
            <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="repo-link">
                View on GitHub <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8em;"></i>
            </a>
        `;

        const toggleBtn = card.querySelector('.toggle-desc');
        const desc = card.querySelector('.repo-desc');

        toggleBtn.addEventListener('click', () => {
            const isVisible = desc.style.display === 'block';
            desc.style.display = isVisible ? 'none' : 'block';
            toggleBtn.textContent = isVisible ? 'Show Description ▼' : 'Hide Description ▲';
        });

        cardsContainer.appendChild(card);
    });
}
