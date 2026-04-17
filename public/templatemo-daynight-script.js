/* ========================================
   DayNight Admin - JavaScript
   templatemo-daynight-script.js
   ======================================== */

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
    const start = document.getElementById('radno_vreme_pocetak');
    const end = document.getElementById('radno_vreme_kraj');
    const output = document.getElementById('ukupni_sati');
    if (!start || !end || !output) return;

    if (!start.value || !end.value) {
        output.textContent = 'Označi početno i završno vreme!';
        return;
    }

    const [sh, sm] = start.value.split(':').map(Number);
    const [eh, em] = end.value.split(':').map(Number);
    let diff = (eh * 60 + em) - (sh * 60 + sm);
    if (diff < 0) diff += 24 * 60;

    output.value = `Provedeni sati: ${(diff / 60).toFixed(2)}`;
}

function disReadOnly() {

    const izvodjac_radova = document.querySelector('#izvodjac_radova');
            izvodjac_radova.removeAttribute('readonly');
    const objekat = document.querySelector('#objekat');
            objekat.removeAttribute('readonly');
    const mesto = document.querySelector('#mesto');
            mesto.removeAttribute('readonly');
    const investitor = document.querySelector('#investitor');
            investitor.removeAttribute('readonly');
    const dan = document.querySelector('#dan');
            dan.removeAttribute('readonly');
    const datum = document.querySelector('#datum');
            datum.removeAttribute('readonly');
    const radno_vreme_pocetak = document.querySelector('#radno_vreme_pocetak');
            radno_vreme_pocetak.removeAttribute('readonly');
    const radno_vreme_kraj = document.querySelector('#radno_vreme_kraj');
            radno_vreme_kraj.removeAttribute('readonly');
    const podizvodjac_radova_name = document.querySelector('#podizvodjac_radova_name');
            podizvodjac_radova_name.removeAttribute('readonly');
    const opis_posla = document.querySelector('#opis_posla');
            opis_posla.removeAttribute('readonly');
    const status_kvara = document.querySelector('#status_kvara');
            status_kvara.removeAttribute('readonly');
}

// ===== Mobile Menu =====
function toggleMobileMenu() {
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
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    setGreeting();

    if (document.querySelector('.kanban-card')) initKanban();
    if (document.getElementById('obj-list')) renderList();

    document.querySelector('.mobile-menu-overlay')?.addEventListener('click', closeMobileMenu);
});
