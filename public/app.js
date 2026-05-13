document.addEventListener('DOMContentLoaded', () => {
    const scheduleElement = document.getElementById('schedule');
    const searchInput = document.getElementById('searchInput');
    const categoryTagsElement = document.getElementById('categoryTags');
    
    let allTalks = [];
    let activeCategory = '';

    // Fetch talks from the server
    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            allTalks = data;
            renderSchedule(allTalks);
            renderCategoryTags(allTalks);
        })
        .catch(err => console.error('Error fetching talks:', err));

    function renderSchedule(talks) {
        scheduleElement.innerHTML = '';
        
        // Define the static schedule points
        const scheduleFlow = [
            { type: 'talk', index: 0 },
            { type: 'transition', time: '11:00 AM' },
            { type: 'talk', index: 1 },
            { type: 'transition', time: '12:10 PM' },
            { type: 'talk', index: 2 },
            { type: 'break', title: 'Lunch Break', time: '1:20 PM - 2:20 PM' },
            { type: 'talk', index: 3 },
            { type: 'transition', time: '3:20 PM' },
            { type: 'talk', index: 4 },
            { type: 'transition', time: '4:30 PM' },
            { type: 'talk', index: 5 }
        ];

        scheduleFlow.forEach(item => {
            if (item.type === 'talk') {
                const talk = allTalks[item.index];
                // Check if talk matches search/category
                const matchesSearch = !searchInput.value || 
                    talk.categories.some(c => c.toLowerCase().includes(searchInput.value.toLowerCase())) ||
                    talk.title.toLowerCase().includes(searchInput.value.toLowerCase());
                
                const matchesCategory = !activeCategory || 
                    talk.categories.includes(activeCategory);

                if (matchesSearch && matchesCategory) {
                    scheduleElement.appendChild(createTalkElement(talk));
                }
            } else if (item.type === 'break') {
                scheduleElement.appendChild(createBreakElement(item));
            } else if (item.type === 'transition') {
                scheduleElement.appendChild(createTransitionElement(item));
            }
        });
        
        // If no talks match, show a message
        if (scheduleElement.children.length === 0) {
            scheduleElement.innerHTML = '<div class="schedule-item"><p>No talks found for this category.</p></div>';
        }
    }

    function createTalkElement(talk) {
        const div = document.createElement('div');
        div.className = 'schedule-item';
        div.innerHTML = `
            <div class="time">${talk.startTime} - ${talk.endTime}</div>
            <div class="content">
                <h2>${talk.title}</h2>
                <p class="speakers">${talk.speakers.join(' & ')}</p>
                <p class="description">${talk.description}</p>
                <div class="categories">
                    ${talk.categories.map(c => `<span class="category-pill">${c}</span>`).join('')}
                </div>
            </div>
        `;
        return div;
    }

    function createBreakElement(item) {
        const div = document.createElement('div');
        div.className = 'break-item';
        div.innerHTML = `
            <div class="time">${item.time}</div>
            <div class="content">${item.title}</div>
        `;
        return div;
    }

    function createTransitionElement(item) {
        const div = document.createElement('div');
        div.className = 'transition-item';
        div.innerHTML = `
            <div class="time">${item.time}</div>
            <div class="content">10-Minute Transition</div>
        `;
        return div;
    }

    function renderCategoryTags(talks) {
        const categories = [...new Set(talks.flatMap(t => t.categories))];
        categoryTagsElement.innerHTML = '<span class="tag active" data-category="">All</span>';
        
        categories.forEach(cat => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = cat;
            span.dataset.category = cat;
            categoryTagsElement.appendChild(span);
        });

        categoryTagsElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag')) {
                document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                activeCategory = e.target.dataset.category;
                renderSchedule(allTalks);
            }
        });
    }

    searchInput.addEventListener('input', () => {
        renderSchedule(allTalks);
    });
});
