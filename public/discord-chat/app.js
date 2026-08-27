let messages = [];
const container = document.getElementById('messages-container');
const searchInput = document.getElementById('search-input');
const userFilter = document.getElementById('user-filter');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxDownload = document.getElementById('lightbox-download');
const lightboxClose = document.getElementById('lightbox-close');

const USERS = {
  "668798424056856587": {
    name: "Golub4ik",
    clan: "Ado",
    class: "is-golub4ik",
    avatar: "avatars/668798424056856587.png"
  },
  "1332668157457993748": {
    name: "ФРГУТА",
    clan: null,
    class: "is-frgyta",
    avatar: "avatars/1332668157457993748.png"
  }
};

function formatDateSeparator(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatFullTimestamp(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function parseMarkdown(text, searchQuery = '') {
  if (!text) return '';
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  escaped = escaped.replace(/```([a-z]*)\n([\s\S]*?)```/gi, (match, lang, code) => {
    return `<pre><code>${code}</code></pre>`;
  });

  escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
  escaped = escaped.replace(/\*\*\*([^*]+)\*\*\*/g, '<b><i>$1</i></b>');
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  escaped = escaped.replace(/\*([^*]+)\*/g, '<i>$1</i>');
  escaped = escaped.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  escaped = escaped.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

  escaped = escaped.replace(/&lt;@!?(\d+)&gt;/g, (match, id) => {
    const u = USERS[id];
    return `<span class="badge" style="background:var(--mention-bg);color:var(--brand-experiment);">@${u ? u.name : id}</span>`;
  });

  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${q})`, 'gi');
    escaped = escaped.replace(regex, '<mark>$1</mark>');
  }

  return escaped;
}

function openLightbox(src, filename) {
  lightboxImg.src = src;
  lightboxDownload.href = src;
  lightboxDownload.setAttribute('download', filename || 'discord_image');
  lightbox.classList.add('active');
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
}
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox) lightbox.classList.remove('active');
});

function renderMessages() {
  container.innerHTML = '';
  const searchQuery = searchInput.value.toLowerCase();
  const filterAuthor = userFilter.value;

  let filtered = messages.filter(m => {
    if (filterAuthor === 'attachments' && (!m.attachments || m.attachments.length === 0)) return false;
    if (filterAuthor !== 'all' && filterAuthor !== 'attachments' && m.author.id !== filterAuthor) return false;
    if (searchQuery) {
      const matchContent = (m.content || '').toLowerCase().includes(searchQuery);
      const matchAuthor = (m.author.username || '').toLowerCase().includes(searchQuery) ||
                          (m.author.global_name || '').toLowerCase().includes(searchQuery);
      const matchAttachment = m.attachments && m.attachments.some(a => (a.filename || '').toLowerCase().includes(searchQuery));
      if (!matchContent && !matchAuthor && !matchAttachment) return false;
    }
    return true;
  });

  const resStat = document.getElementById('search-results-stat');
  if (searchQuery || filterAuthor !== 'all') {
    if (resStat) {
      resStat.style.display = 'flex';
      document.getElementById('found-msgs').textContent = filtered.length;
    }
  } else {
    if (resStat) resStat.style.display = 'none';
  }

  let lastDate = null;
  let lastAuthorId = null;
  let lastTimestamp = null;

  filtered.forEach((msg) => {
    const msgDate = new Date(msg.timestamp);
    const dateStr = msgDate.toDateString();

    if (dateStr !== lastDate) {
      const divider = document.createElement('div');
      divider.className = 'date-divider';
      divider.innerHTML = `<span class="date-text">${formatDateSeparator(msg.timestamp)}</span>`;
      container.appendChild(divider);
      lastDate = dateStr;
      lastAuthorId = null;
    }

    const isSameAuthor = lastAuthorId === msg.author.id;
    const timeDiff = lastTimestamp ? (msgDate - lastTimestamp) / 1000 : 9999;
    const isGrouped = isSameAuthor && timeDiff < 300 && !msg.referenced_message;

    const groupEl = document.createElement('div');
    groupEl.className = 'message-group' + (msg.referenced_message ? ' has-reply' : '');
    groupEl.id = `msg-${msg.id}`;

    let authorInfo = USERS[msg.author.id] || {
      name: msg.author.global_name || msg.author.username,
      clan: null,
      class: '',
      avatar: `avatars/${msg.author.id}.png`
    };

    let html = '';

    if (msg.referenced_message) {
      const ref = msg.referenced_message;
      const refAuthor = USERS[ref.author.id] ? USERS[ref.author.id].name : (ref.author.global_name || ref.author.username);
      const refAvatar = USERS[ref.author.id] ? USERS[ref.author.id].avatar : `avatars/${ref.author.id}.png`;
      const refText = (ref.content || (ref.attachments && ref.attachments.length ? '[Вложение]' : '...'));

      html += `
        <div class="reply-context" onclick="scrollToMsg('${ref.id}')">
          <img class="reply-avatar" src="${refAvatar}" onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'">
          <span class="reply-author">${refAuthor}</span>
          <span class="reply-content">${parseMarkdown(refText)}</span>
        </div>
      `;
    }

    if (!isGrouped) {
      html += `
        <img class="message-avatar" src="${authorInfo.avatar}" onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'" alt="avatar">
        <div class="message-header">
          <span class="author-name ${authorInfo.class}">${authorInfo.name}</span>
          ${authorInfo.clan ? `<span class="author-clan-tag">${authorInfo.clan}</span>` : ''}
          <span class="timestamp" title="${formatFullTimestamp(msg.timestamp)}">${formatTime(msg.timestamp)}</span>
        </div>
      `;
    } else {
      html += `
        <span class="compact-timestamp" title="${formatFullTimestamp(msg.timestamp)}">${formatTime(msg.timestamp)}</span>
      `;
    }

    if (msg.content) {
      html += `<div class="message-text">${parseMarkdown(msg.content, searchQuery)}</div>`;
    }

    if (msg.attachments && msg.attachments.length > 0) {
      html += `<div class="attachments-list">`;
      msg.attachments.forEach(att => {
        const localPath = `attachments/${att.id}_${att.filename}`;
        const isImage = (att.content_type && att.content_type.startsWith('image/')) || /\.(png|jpg|jpeg|gif|webp)$/i.test(att.filename);

        if (isImage) {
          html += `
            <div class="attachment-image-wrapper" onclick="openLightbox('${localPath}', '${att.filename}')">
              <img class="attachment-image" src="${localPath}" onerror="this.src='${att.url}'" alt="${att.filename}" loading="lazy">
              <div class="attachment-meta">
                <span>${att.filename}</span>
                <span>${(att.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>
          `;
        } else {
          html += `
            <div class="embed-card">
              <a class="embed-title" href="${localPath}" download="${att.filename}">📎 ${att.filename}</a>
              <span class="embed-desc">${(att.size / 1024).toFixed(1)} KB</span>
            </div>
          `;
        }
      });
      html += `</div>`;
    }

    if (msg.embeds && msg.embeds.length > 0) {
      msg.embeds.forEach(embed => {
        if (embed.type === 'gifv' || embed.video) {
          const videoUrl = (embed.video && embed.video.url) || (embed.thumbnail && embed.thumbnail.url);
          html += `
            <div class="embed-media">
              ${embed.video ? `<video src="${embed.video.url}" autoplay loop muted playsinline></video>` : `<img src="${videoUrl}">`}
            </div>
          `;
        } else if (embed.type === 'link' || embed.title) {
          html += `
            <div class="embed-card">
              ${embed.provider ? `<div class="embed-provider">${embed.provider.name}</div>` : ''}
              ${embed.title ? `<a class="embed-title" href="${embed.url}" target="_blank">${embed.title}</a>` : ''}
              ${embed.description ? `<div class="embed-desc">${embed.description}</div>` : ''}
              ${embed.thumbnail ? `<div class="embed-media"><img src="${embed.thumbnail.url}"></div>` : ''}
            </div>
          `;
        }
      });
    }

    groupEl.innerHTML = html;
    container.appendChild(groupEl);

    lastAuthorId = msg.author.id;
    lastTimestamp = msgDate;
  });
}

function scrollToMsg(id) {
  const el = document.getElementById(`msg-${id}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('highlighted');
    setTimeout(() => el.classList.remove('highlighted'), 2000);
  }
}

document.getElementById('jump-top').addEventListener('click', () => {
  container.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('jump-bottom').addEventListener('click', () => {
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
});

document.getElementById('download-json-btn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'discord_dm_1535603914122985604.json';
  a.click();
  URL.revokeObjectURL(url);
});

searchInput.addEventListener('input', renderMessages);
userFilter.addEventListener('change', renderMessages);

function setupStats() {
  document.getElementById('total-msgs').textContent = messages.length;
  let mediaCount = 0;
  messages.forEach(m => {
    if (m.attachments) mediaCount += m.attachments.length;
  });
  document.getElementById('total-media').textContent = mediaCount;

  if (messages.length > 0) {
    const first = new Date(messages[0].timestamp);
    const last = new Date(messages[messages.length - 1].timestamp);
    document.getElementById('dialog-period').textContent = 
      `${first.toLocaleDateString('ru-RU')} — ${last.toLocaleDateString('ru-RU')}`;
  }
}

function init() {
  if (window.__MESSAGES_DATA__ && Array.isArray(window.__MESSAGES_DATA__)) {
    messages = window.__MESSAGES_DATA__;
    setupStats();
    renderMessages();
    return;
  }

  fetch('messages.json')
    .then(r => r.json())
    .then(data => {
      messages = data;
      setupStats();
      renderMessages();
    })
    .catch(err => {
      container.innerHTML = `<div style="padding:20px;color:#ed4245;">Ошибка загрузки сообщений: ${err.message}</div>`;
    });
}

init();