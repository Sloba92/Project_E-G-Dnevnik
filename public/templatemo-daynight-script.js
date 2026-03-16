/* ========================================
   DayNight Admin - JavaScript
<<<<<<< HEAD
   ======================================== */

/*

TemplateMo 608 DayNight Admin

https://templatemo.com/tm-608-daynight-admin

*/

=======
   templatemo-daynight-script.js
   ======================================== */

>>>>>>> d7dc78b646dfd2ea188b2dc54728c194e4749300
// ===== Theme Toggle =====
function initTheme() {
    const savedTheme = localStorage.getItem('daynight-theme');
    if (savedTheme === 'carbon') {
        document.documentElement.classList.add('carbon');
        document.body.classList.add('carbon');
        updateThemeButtons('carbon');
    } else {
        updateThemeButtons('snow');
    }
}

function setTheme(theme) {
    if (theme === 'carbon') {
        document.documentElement.classList.add('carbon');
        document.body.classList.add('carbon');
        localStorage.setItem('daynight-theme', 'carbon');
    } else {
        document.documentElement.classList.remove('carbon');
        document.body.classList.remove('carbon');
        localStorage.setItem('daynight-theme', 'snow');
    }
    updateThemeButtons(theme);
}

function updateThemeButtons(theme) {
<<<<<<< HEAD
    const snowBtns = document.querySelectorAll('.theme-btn-snow');
    const carbonBtns = document.querySelectorAll('.theme-btn-carbon');

    snowBtns.forEach(btn => {
        btn.classList.toggle('active', theme === 'snow');
    });
    carbonBtns.forEach(btn => {
        btn.classList.toggle('active', theme === 'carbon');
    });
}

// ===== Time-based Greeting =====
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Dobro jutro';
    if (hour < 17) return 'Dobar dan';
    return 'Dobro vece';
}

function setGreeting() {
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        greetingEl.textContent = getGreeting() + ', Popunite E-Građevinski dnevnik';
    }
}

// ===== Date Range Picker =====
function setDateRange(range, btn) {
    const btns = document.querySelectorAll('.date-btn');
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update charts based on range
    updateCharts(range);
}

function updateCharts(range) {
    // Animate chart bars based on selected range
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const currentHeight = parseInt(bar.style.height);
        let multiplier = 1;

        if (range === '7d') multiplier = 0.7;
        if (range === '30d') multiplier = 1;
        if (range === '90d') multiplier = 1.2;
        if (range === '12m') multiplier = 1.4;

        // Random variation
        const variation = 0.8 + Math.random() * 0.4;
        bar.style.height = (currentHeight * multiplier * variation) + 'px';
    });
}

// ===== Inbox =====
function selectMessage(el, index) {
    // Remove active from all
    document.querySelectorAll('.message-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active to selected
    el.classList.add('active');
    el.classList.remove('unread');

    // Update message view
    updateMessageView(index);
}

function updateMessageView(index) {
    const messages = [
        {
            subject: 'Project Update: Q1 Dashboard Redesign',
            sender: 'Sarah Chen',
            email: 'sarah.chen@company.com',
            date: 'Jan 2, 2026 at 9:45 AM',
            body: `<p>Hi Alex,</p>
                   <p>I wanted to give you a quick update on the Q1 dashboard redesign project. We've completed the wireframes and initial mockups, and the team is ready to move into the development phase.</p>
                   <p>Key highlights from our progress:</p>
                   <p>• User research completed with 15 participants<br>
                   • 3 design concepts presented to stakeholders<br>
                   • Final direction approved by leadership<br>
                   • Development sprint starting next Monday</p>
                   <p>Could we schedule a quick sync tomorrow to go over the technical requirements? Let me know what time works best for you.</p>
                   <p>Best regards,<br>Sarah</p>`
        },
        {
            subject: 'Weekly Analytics Report',
            sender: 'Analytics Bot',
            email: 'analytics@company.com',
            date: 'Jan 1, 2026 at 8:00 AM',
            body: `<p>Hello Alex,</p>
                   <p>Here's your weekly analytics summary for December 25-31, 2025:</p>
                   <p><strong>Traffic Overview:</strong><br>
                   Total visitors: 45,230 (+12% vs last week)<br>
                   Page views: 128,450 (+8%)<br>
                   Avg. session duration: 4m 32s</p>
                   <p><strong>Top Performing Pages:</strong><br>
                   1. /dashboard - 15,230 views<br>
                   2. /analytics - 8,450 views<br>
                   3. /projects - 6,780 views</p>
                   <p>View the full report in your Analytics dashboard.</p>`
        },
        {
            subject: 'New Team Member Introduction',
            sender: 'HR Team',
            email: 'hr@company.com',
            date: 'Dec 31, 2025 at 2:30 PM',
            body: `<p>Dear Team,</p>
                   <p>We're excited to announce that Michael Torres will be joining our engineering team starting January 6th as a Senior Frontend Developer.</p>
                   <p>Michael comes to us with 8 years of experience in web development and has previously worked at several notable tech companies. He'll be working closely with the product team on our new features.</p>
                   <p>Please join us in welcoming Michael to the team!</p>
                   <p>Best,<br>HR Team</p>`
        }
    ];

    const msg = messages[index] || messages[0];

    document.querySelector('.message-view-subject').textContent = msg.subject;
    document.querySelector('.message-view-sender-name').textContent = msg.sender;
    document.querySelector('.message-view-sender-email').textContent = msg.email;
    document.querySelector('.message-view-date').textContent = msg.date;
    document.querySelector('.message-view-body').innerHTML = msg.body;
}

// ===== Kanban =====
function initKanban() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-cards');

    cards.forEach(card => {
        card.setAttribute('draggable', true);

        card.addEventListener('dragstart', (e) => {
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', (e) => {
            card.classList.remove('dragging');
        });
    });

    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            column.appendChild(dragging);
        });
    });
}

// ===== Settings Toggles =====
function initToggles() {
    const toggles = document.querySelectorAll('.toggle input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function () {
            console.log(`${this.id} is now ${this.checked ? 'enabled' : 'disabled'}`);
        });
    });
}

function racunajSate() {
    const pocetnoVreme = document.getElementById("radno_vreme_start").value;
    const zavrsnoVreme = document.getElementById("radno_vreme_do").value;

    if (!pocetnoVreme || !zavrsnoVreme) {
        document.getElementById("ispis").textContent = "Oznaci pocetno i zavrsnao vreme!";
        return;
    }
    const [pocetniSat, pocetniMinuti] = pocetnoVreme.split(":").map(Number);
    const [zavrsniSat, zavrsniMinuti] = zavrsnoVreme.split(":").map(Number);

    const ukupniPocetniMinuti = pocetniSat * 60 + pocetniMinuti;
    const ukupniZavrsniMinuti = zavrsniSat * 60 + zavrsniMinuti;

    let ukupnaMinutnaRazlika = ukupniZavrsniMinuti - ukupniPocetniMinuti;

    if (ukupnaMinutnaRazlika < 0) {
        ukupnaMinutnaRazlika += 24 * 60;
    }

    /* const sati = Math.floor(ukupnaMinutnaRazlika / 60);
    const minuti = ukupnaMinutnaRazlika % 60; */

    const decimaleSati = ukupnaMinutnaRazlika / 60;

    /* document.getElementById("ispis").textContent =
        `Vreme: ${sati} sati i ${minuti} minuti`; */

    document.getElementById("ispis").textContent = `Provedeni sati: ${decimaleSati.toFixed(2)}`;
=======
    document.querySelectorAll('.theme-btn-snow').forEach(btn => btn.classList.toggle('active', theme === 'snow'));
    document.querySelectorAll('.theme-btn-carbon').forEach(btn => btn.classList.toggle('active', theme === 'carbon'));
}

// ===== Greeting =====
function setGreeting() {
    const el = document.getElementById('greeting');
    if (!el) return;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Dobro jutro' : hour < 17 ? 'Dobar dan' : 'Dobro veče';
    el.textContent = greeting + ', Popunite E-Građevinski dnevnik';
}

// ===== Hours Calculator (index.html) =====
function racunajSate() {
    const start = document.getElementById('radno_vreme_start');
    const end = document.getElementById('radno_vreme_do');
    const output = document.getElementById('ispis');
    if (!start || !end || !output) return;

    if (!start.value || !end.value) {
        output.textContent = 'Označi početno i završno vreme!';
        return;
    }

    const [sh, sm] = start.value.split(':').map(Number);
    const [eh, em] = end.value.split(':').map(Number);
    let diff = (eh * 60 + em) - (sh * 60 + sm);
    if (diff < 0) diff += 24 * 60;

    output.textContent = `Provedeni sati: ${(diff / 60).toFixed(2)}`;
>>>>>>> d7dc78b646dfd2ea188b2dc54728c194e4749300
}

// ===== Mobile Menu =====
function toggleMobileMenu() {
<<<<<<< HEAD
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (menu && overlay) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (menu && overlay) {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
=======
    document.querySelector('.mobile-menu')?.classList.toggle('active');
    document.querySelector('.mobile-menu-overlay')?.classList.toggle('active');
    document.body.style.overflow = document.querySelector('.mobile-menu')?.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    document.querySelector('.mobile-menu')?.classList.remove('active');
    document.querySelector('.mobile-menu-overlay')?.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Kanban Drag & Drop =====
function initKanban() {
    document.querySelectorAll('.kanban-card').forEach(card => {
        card.setAttribute('draggable', true);
        card.addEventListener('dragstart', () => card.classList.add('dragging'));
        card.addEventListener('dragend', () => card.classList.remove('dragging'));
    });
    document.querySelectorAll('.kanban-cards').forEach(col => {
        col.addEventListener('dragover', e => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (dragging) col.appendChild(dragging);
        });
    });
}

// ===== Analytics — Filter, Export =====
function filterTable() {
    // Connect to your backend/database here
    alert('Primeni filter — povežite sa bazom podataka.');
}

function exportCSV() {
    const table = document.getElementById('report-table');
    if (!table) return;
    const csv = [...table.rows].map(row =>
        [...row.cells].map(c => '"' + c.innerText.replace(/"/g, '""') + '"').join(',')
    );
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'dnevnici-izvestaj.csv';
    a.click();
}

function exportPDF() {
    window.print();
}

// ===== Objekti (inbox.html) =====
let objekti = JSON.parse(localStorage.getItem('egdnevnik_objekti') || '[]');
let selectedIdx = null;

function renderList(filter = '') {
    const list = document.getElementById('obj-list');
    const countEl = document.getElementById('obj-count');
    if (!list) return;

    const filtered = objekti.filter(o =>
        o.naziv.toLowerCase().includes(filter.toLowerCase()) ||
        (o.mesto || '').toLowerCase().includes(filter.toLowerCase())
    );

    if (countEl) {
        const n = filtered.length;
        countEl.textContent = n + (n === 1 ? ' objekat' : ' objekta');
    }

    if (filtered.length === 0) {
        list.innerHTML = `<div class="obj-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Nema rezultata
        </div>`;
        return;
    }

    list.innerHTML = filtered.map(o => {
        const idx = objekti.indexOf(o);
        const cls = o.status === 'aktivan' ? 'badge-aktivan' : o.status === 'pauza' ? 'badge-pauza' : 'badge-zavrsen';
        const lbl = o.status === 'aktivan' ? 'Aktivan' : o.status === 'pauza' ? 'Na pauzi' : 'Završen';
        return `<div class="obj-item${selectedIdx === idx ? ' active' : ''}" onclick="selectObjekat(${idx})">
            <div class="obj-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <div class="obj-info">
                <div class="obj-name">${o.naziv}</div>
                <div class="obj-meta">${o.mesto || 'Bez lokacije'} · <span class="badge-status ${cls} badge-inline">${lbl}</span></div>
            </div>
            <div class="obj-actions">
                <button class="btn-icon" onclick="event.stopPropagation();editObjekat(${idx})" title="Edituj">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
        </div>`;
    }).join('');
}

function selectObjekat(idx) {
    selectedIdx = idx;
    const o = objekti[idx];
    const empty = document.getElementById('detail-empty');
    const content = document.getElementById('detail-content');
    if (!o || !empty || !content) return;

    empty.style.display = 'none';
    content.classList.remove('detail-hidden');

    document.getElementById('d-naziv').textContent = o.naziv || '—';
    document.getElementById('d-adresa').textContent = o.adresa || '—';
    document.getElementById('d-mesto').textContent = o.mesto || '—';
    document.getElementById('d-investitor').textContent = o.investitor || '—';
    document.getElementById('d-izvodjac').textContent = o.izvodjac || '—';
    document.getElementById('d-pocetak').textContent = o.pocetak || '—';
    document.getElementById('d-napomena').textContent = o.napomena || '—';

    const badge = document.getElementById('d-status-badge');
    const cls = o.status === 'aktivan' ? 'badge-aktivan' : o.status === 'pauza' ? 'badge-pauza' : 'badge-zavrsen';
    const lbl = o.status === 'aktivan' ? 'Aktivan' : o.status === 'pauza' ? 'Na pauzi' : 'Završen';
    badge.className = 'badge-status ' + cls;
    badge.innerHTML = '<span class="dot"></span> ' + lbl;

    renderList(document.getElementById('search-obj')?.value || '');
}

function openModal(editIdx = null) {
    const title = document.getElementById('modal-title');
    const form = document.getElementById('modal-form');
    if (!title || !form) return;

    title.textContent = editIdx !== null ? 'Edituj Objekat' : 'Novi Objekat';

    if (editIdx !== null) {
        const o = objekti[editIdx];
        document.getElementById('m-naziv').value = o.naziv || '';
        document.getElementById('m-adresa').value = o.adresa || '';
        document.getElementById('m-mesto').value = o.mesto || '';
        document.getElementById('m-investitor').value = o.investitor || '';
        document.getElementById('m-izvodjac').value = o.izvodjac || '';
        document.getElementById('m-status').value = o.status || 'aktivan';
        document.getElementById('m-pocetak').value = o.pocetak || '';
        document.getElementById('m-napomena').value = o.napomena || '';
        form.dataset.editIdx = editIdx;
    } else {
        form.reset();
        delete form.dataset.editIdx;
    }

    document.getElementById('modal-overlay')?.classList.add('open');
}

function closeModal(e) {
    const overlay = document.getElementById('modal-overlay');
    if (!e || e.target === overlay || e.currentTarget?.classList.contains('modal-close')) {
        overlay?.classList.remove('open');
    }
}

function saveObjekat() {
    const naziv = document.getElementById('m-naziv')?.value.trim();
    if (!naziv) { alert('Naziv objekta je obavezan!'); return; }

    const o = {
        naziv,
        adresa: document.getElementById('m-adresa').value.trim(),
        mesto: document.getElementById('m-mesto').value.trim(),
        investitor: document.getElementById('m-investitor').value.trim(),
        izvodjac: document.getElementById('m-izvodjac').value.trim(),
        status: document.getElementById('m-status').value,
        pocetak: document.getElementById('m-pocetak').value,
        napomena: document.getElementById('m-napomena').value.trim(),
    };

    const form = document.getElementById('modal-form');
    if (form.dataset.editIdx !== undefined) {
        objekti[parseInt(form.dataset.editIdx)] = o;
    } else {
        objekti.push(o);
    }

    localStorage.setItem('egdnevnik_objekti', JSON.stringify(objekti));
    closeModal();
    renderList();
    if (selectedIdx !== null) selectObjekat(selectedIdx);
}

function editObjekat(idx) { openModal(idx); }
function editSelected() { if (selectedIdx !== null) openModal(selectedIdx); }

function deleteSelected() {
    if (selectedIdx === null) return;
    if (!confirm('Obriši objekat "' + objekti[selectedIdx].naziv + '"?')) return;
    objekti.splice(selectedIdx, 1);
    localStorage.setItem('egdnevnik_objekti', JSON.stringify(objekti));
    selectedIdx = null;
    const empty = document.getElementById('detail-empty');
    const content = document.getElementById('detail-content');
    if (empty) empty.style.display = 'flex';
    if (content) content.classList.add('detail-hidden');
    renderList();
}

function searchObjekti() {
    renderList(document.getElementById('search-obj')?.value || '');
>>>>>>> d7dc78b646dfd2ea188b2dc54728c194e4749300
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    setGreeting();

<<<<<<< HEAD
    if (document.querySelector('.kanban-board')) {
        initKanban();
    }

    if (document.querySelector('.toggle')) {
        initToggles();
    }

    // Close mobile menu on overlay click
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
});
=======
    if (document.querySelector('.kanban-card')) initKanban();
    if (document.getElementById('obj-list')) renderList();

    document.querySelector('.mobile-menu-overlay')?.addEventListener('click', closeMobileMenu);
});
>>>>>>> d7dc78b646dfd2ea188b2dc54728c194e4749300
