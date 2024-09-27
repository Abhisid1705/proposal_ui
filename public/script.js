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
        const response = await fetch('/notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ read: 0 })
        });
        const notifications = await response.json();
        const notificationList = document.getElementById('notifications');
        notificationList.innerHTML = '';
        notifications.forEach(notification => {
            const li = document.createElement('li');
            li.textContent = notification.message;
            notificationList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
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

function handleCreateProposal(event) {
    event.preventDefault();
    // Handle form submission logic here
}

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