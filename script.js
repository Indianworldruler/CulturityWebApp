// Sample data for behavior insights and upcoming festivals
const culturalData = {
    "North India": {
        behaviorInsights: [
            "Consumers prefer traditional festivals and cultural events.",
            "Social media influence is significant in decision making.",
            "Food festivals attract large crowds."
        ],
        upcomingFestivals: [
            
            { name: "Holi", date: "2025-03-25" }
        ],
        upcomingEvents: [
            { name: "Taj Mahotsav", date: "2025-02-18" }
        ]
    },
    "South India": {
        behaviorInsights: [
            "Regional cuisines are a key focus for consumers.",
            "Festivals are celebrated with grandeur.",
            "Cultural heritage influences purchasing decisions."
        ],
        upcomingFestivals: [
            { name: "Pongal", date: "2025-01-14" }
        ],
        upcomingEvents: [
            { name: "International Esports Masters", date: "Scheduled 2025" }
        ]
    },
    "East India": {
        behaviorInsights: [
            "Durga Puja is the most significant festival.",
            "Art and handicrafts have a strong market.",
            "Cultural events are often tied to local traditions."
        ],
        upcomingFestivals: [
            { name: "Bihar Diwas", date: "2025-03-22" }
        ],
        upcomingEvents: [
            { name: "KONARK DANCE FESTIVAL", date: "1st-5th December" }
        ]
    },
    "West India": {
        behaviorInsights: [
            "Diversity in culture leads to varied consumer preferences.",
            "Cultural festivals see significant tourist involvement.",
            "Traditional clothing has a prominent market."
        ],
        upcomingFestivals: [
            { name: "Holi", date: "2025-03-14" },
            { name: "Ugadi", date: "2025-03-30" }
        ],
        upcomingEvents: [
            { name: "Surat International Textile Expo", date: "To be announced" }
        ]
    }
};

let users = [];
let currentUser = null;

// Function to handle user registration
document.getElementById('registrationForm').onsubmit = function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const region = document.getElementById('region').value;

    // Check if user already exists
    if (users.some(user => user.username === username)) {
        alert('User already exists!');
        return;
    }

    // Add user to the list
    users.push({ username, password, region });
    alert('User registered successfully!');

    // Reset form and hide previous user data
    e.target.reset();
    document.getElementById('behaviorInsights').innerHTML = '';
    document.getElementById('festivalRecommendations').innerHTML = '';
    document.getElementById('eventCalendar').innerHTML = '';
    currentUser = null;
    document.getElementById('userList').innerHTML = '';
};

// Function to handle user login
document.getElementById('loginForm').onsubmit = function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Check if user exists
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        currentUser = user;
        alert('Login successful!');
        updateUserInfo();
        updateUserList();
        e.target.reset();
    } else {
        alert('Invalid username or password!');
    }
};

// Function to update user info based on the current logged-in user
function updateUserInfo() {
    if (currentUser) {
        const regionData = culturalData[currentUser.region];

        // Show behavior insights
        const insightsHTML = regionData.behaviorInsights.map(insight => `<p>${insight}</p>`).join('');
        document.getElementById('behaviorInsights').innerHTML = insightsHTML;

        // Show upcoming festivals and events
        updateUpcomingFestivals(regionData.upcomingFestivals);
        updateUpcomingEvents(regionData.upcomingEvents);
    }
}

// Function to update user list
function updateUserList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.username;
        userList.appendChild(listItem);
    });
}

// Function to update upcoming festivals
function updateUpcomingFestivals(festivals) {
    const today = new Date();
    const festivalRecommendations = document.getElementById('festivalRecommendations');
    festivalRecommendations.innerHTML = '';

    // Filter upcoming festivals for this year and next year
    const upcomingFestivals = festivals.filter(festival => {
        return new Date(festival.date) >= today;
    });

    if (upcomingFestivals.length > 0) {
        upcomingFestivals.forEach(festival => {
            festivalRecommendations.innerHTML += `<p>${festival.name} - ${festival.date}</p>`;
        });
    } else {
        festivalRecommendations.innerHTML = '<p>No upcoming festivals available for your region.</p>';
    }
}

// Function to update upcoming events
function updateUpcomingEvents(events) {
    const today = new Date();
    const eventCalendar = document.getElementById('eventCalendar');
    eventCalendar.innerHTML = '';

    // Filter upcoming events for this year and next year
    const upcomingEvents = events.filter(event => {
        return new Date(event.date) >= today;
    });

    if (upcomingEvents.length > 0) {
        upcomingEvents.forEach(event => {
            eventCalendar.innerHTML += `<p>${event.name} - ${event.date}</p>`;
        });
    } else {
        eventCalendar.innerHTML = '<p>No upcoming cultural events available for your region.</p>';
    }
}

// Function to delete user
document.getElementById('deleteUser').onclick = function () {
    if (currentUser) {
        users = users.filter(user => user.username !== currentUser.username);
        alert('User deleted successfully!');
        currentUser = null;
        document.getElementById('behaviorInsights').innerHTML = '';
        document.getElementById('festivalRecommendations').innerHTML = '';
        document.getElementById('eventCalendar').innerHTML = '';
        updateUserList();
    } else {
        alert('No user is currently logged in.');
    }
};
