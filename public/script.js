async function toggleNotifications() {
    const notificationList = document.getElementById('notificationList');
    if (notificationList.style.display === 'none' || notificationList.style.display === '') {
        notificationList.style.display = 'block';
        await fetchNotifications();
    } else {
        notificationList.style.display = 'none';
    }
}


async function fetchNotifications() {
    try {
        const userId=localStorage.getItem('logedinuserid');
        const response = await fetchWithToken(`http://localhost:8081/notifications/user/${userId}/read/0`)
        const notifications = await response.json();
        const notificationList = document.getElementById('notifications');
        const notificationBell = document.querySelector('.notification-bell');
        notificationList.innerHTML = '';

        let hasUnread = false;
        notifications.forEach(notification => {
            const li = document.createElement('li');
            li.textContent = notification.message;
            li.dataset.id=notification.notification_id;
            notificationList.appendChild(li);

            if (!notification.read) {
                hasUnread = true;
            }
        });

        if (hasUnread) {
            notificationBell.classList.add('unread');
        } else {
            notificationBell.classList.remove('unread');
        }
        notificationList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                markRead(event.target.dataset.id, userId);
            }
        });
    } catch (error) {
        console.error(error);
    }
}

async function loadSidePanel() {
    try {
        const response = await fetch('/public/side-panel.html');
        const content = await response.text();
        document.getElementById('sidePanelContainer').innerHTML = content;
    } catch (error) {
        console.error('Error loading side panel:', error);
    }
}

async function loadNotificationPanel() {
    try {
        const response = await fetch('/public/notification-panel.html');
        const content = await response.text();
        document.getElementById('notificationPanelContainer').innerHTML = content;
    } catch (error) {
        console.error('Error loading notification panel:', error);
    }
}

// Load the side panel and notification panel on initial load
document.addEventListener('DOMContentLoaded', () => {
    loadSidePanel();
    loadNotificationPanel();
});



function toggleUserDropdown() {
    const assigneeSelect = document.getElementById('assignee');
    const specificUserSelect = document.getElementById('specificUser');
    if (assigneeSelect.value === 'specific') {
        specificUserSelect.classList.remove('hidden');
    } else {
        specificUserSelect.classList.add('hidden');
    }
}
async function navigateTo(page) {
    try {
        window.location.href=page;
    } catch (error) {
        console.error('Error loading page:', error);
    }
}

function executeScripts(content) {
    const container = document.getElementById('contentContainer');
    const scripts = container.getElementsByTagName('script');
    for (let script of scripts) {
        const newScript = document.createElement('script');
        newScript.text = script.text;
        document.body.appendChild(newScript);
    }
}

async function loadSidePanel() {
    try {
        const response = await fetch('/public/side-panel.html');
        const content = await response.text();
        document.getElementById('sidePanelContainer').innerHTML = content;
    } catch (error) {
        console.error('Error loading side panel:', error);
    }
}

async function loadNotificationPanel() {
    try {
        const response = await fetch('/public/notification-panel.html');
        const content = await response.text();
        document.getElementById('notificationPanelContainer').innerHTML = content;
    } catch (error) {
        console.error('Error loading notification panel:', error);
    }
}

// Load the side panel and notification panel on initial load
document.addEventListener('DOMContentLoaded', () => {
    loadSidePanel();
    loadNotificationPanel();
});
async function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('token');

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    });
}
async function markRead(id,userid){
    const response = await fetchWithToken(`http://localhost:8081/notifications/${id}/user/${userid}/read/1`)
}
function logout() {
    // Clear the user session
    localStorage.removeItem('logedinuserid');
    // Redirect to index.html
    window.location.href = 'index.html';
}