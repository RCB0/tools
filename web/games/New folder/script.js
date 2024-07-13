
const gameContainer = document.querySelector('.game');
const bulletsContainer = document.getElementById('bullets');
let moneyEarned = 0;

// Function to generate random enemy size
function getRandomSize() {
    return Math.floor(Math.random() * 30) + 20; // Adjust size range as needed
}

// Function to create multiple enemies
function createEnemies() {
    const numEnemies = 10; // Adjust number of enemies as needed
    for (let i = 0; i < numEnemies; i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        const size = getRandomSize();
        enemy.style.width = size + 'px';
        enemy.style.height = size + 'px';
        enemy.style.left = Math.random() * (gameContainer.clientWidth - size) + 'px';
        enemy.style.top = Math.random() * (gameContainer.clientHeight - size) + 'px';
        gameContainer.appendChild(enemy);
    }
}

// Function to calculate money earned based on enemy size
function calculateMoney(size) {
    return Math.floor(size / 10); // Adjust money calculation as needed
}

// Event listener for shooting bullets
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bullet-btn')) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const bulletX = player.getBoundingClientRect().left + player.offsetWidth / 2;
        const bulletY = player.getBoundingClientRect().top + player.offsetHeight / 2;
        const angle = Math.atan2(mouseY - bulletY, mouseX - bulletX);
        const numBullets = 5; // Adjust number of bullets as needed
        const spacing = 20; // Adjust spacing between bullets as needed
        for (let i = 0; i < numBullets; i++) {
            const newBullet = document.createElement('div');
            newBullet.classList.add('bullet');
            newBullet.style.left = bulletX + 'px';
            newBullet.style.top = bulletY + 'px';
            const offsetX = Math.cos(angle) * (i * spacing);
            const offsetY = Math.sin(angle) * (i * spacing);
            bulletsContainer.appendChild(newBullet);
            const bulletSpeed = 5; // Adjust bullet speed as needed
            moveBullet(newBullet, offsetX, offsetY, bulletSpeed);
        }
    }
});

// Function to move bullets
function moveBullet(bullet, offsetX, offsetY, speed) {
    const moveBulletInterval = setInterval(() => {
        const bulletX = parseInt(bullet.style.left) + offsetX;
        const bulletY = parseInt(bullet.style.top) + offsetY;
        bullet.style.left = bulletX + 'px';
        bullet.style.top = bulletY + 'px';
        if (bulletX < 0 || bulletX > gameContainer.clientWidth || bulletY < 0 || bulletY > gameContainer.clientHeight) {
            clearInterval(moveBulletInterval);
            bullet.remove();
        } else {
            const enemies = document.querySelectorAll('.enemy');
            enemies.forEach(enemy => {
                const enemyRect = enemy.getBoundingClientRect();
                if (
                    bulletX > enemyRect.left &&
                    bulletX < enemyRect.right &&
                    bulletY > enemyRect.top &&
                    bulletY < enemyRect.bottom
                ) {
                    const enemySize = Math.max(enemyRect.width, enemyRect.height);
                    moneyEarned += calculateMoney(enemySize);
                    document.getElementById('money').textContent = 'Money: $' + moneyEarned;
                    enemy.remove();
                    clearInterval(moveBulletInterval);
                    bullet.remove();
                }
            });
        }
    }, 1000 / 60); // Adjust bullet movement speed as needed
}

// Call function to create enemies
createEnemies();

// Event listener for mouse down event
player.addEventListener('mousedown', (event) => {
    const rect = gameContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const newX = offsetX - player.clientWidth / 2; // Adjust for rocket width
    const newY = offsetY - player.clientHeight / 2; // Adjust for rocket height
    player.style.left = newX + 'px';
    player.style.top = newY + 'px';
});

// Event listener for mouse move event
document.addEventListener('mousemove', (event) => {
    if (event.buttons === 1) { // Check if left mouse button is clicked
        const rect = gameContainer.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const newX = offsetX - player.clientWidth / 2; // Adjust for rocket width
        const newY = offsetY - player.clientHeight / 2; // Adjust for rocket height
        player.style.left = newX + 'px';
        player.style.top = newY + 'px';
    }
});


function openSettingsDialog() {
    var dialog = document.getElementById('settingsDialog');
    dialog.showModal();
}

function closeSettingsDialog() {
    var dialog = document.getElementById('settingsDialog');
    dialog.close();
}

function openShopDialog() {
    var dialog = document.getElementById('shopDialog');
    dialog.showModal();
}

function closeShopDialog() {
    var dialog = document.getElementById('shopDialog');
    dialog.close();
}

function performAction() {
    // Placeholder function for button actions
    console.log('Action performed');
}


// Function to handle button click
function performAction(index) {
    selectedButtonIndex = index;
}

// Function to handle mouse click
document.addEventListener('click', function(event) {
    if (selectedButtonIndex !== null) {
        const button = document.querySelector(`.btn button:nth-child(${selectedButtonIndex + 1})`);
        const icon = button.querySelector('i');

        // Create a new tag with the same icon
        const newTag = document.createElement('i');
        newTag.className = icon.className;
        newTag.style.position = 'absolute';
        newTag.style.top = `${event.clientY}px`;
        newTag.style.left = `${event.clientX}px`;
        document.body.appendChild(newTag);

        // Remove the selected button index
        selectedButtonIndex = null;
    }
});

// Function to handle keyboard input
document.addEventListener('keydown', function(event) {
    // Get the numeric value of the pressed key
    const keyNumber = parseInt(event.key);

    // Check if the pressed key is a number between 1 and 5
    if (keyNumber >= 1 && keyNumber <= 5) {
        // Perform the action corresponding to the pressed key
        performAction(keyNumber - 1);
    }
});

// Function to move bullets in the direction of the rocket
document.addEventListener('mousemove', function(event) {
    const rocket = document.getElementById('player');
    const bullets = document.getElementById('bullets').children;

    // Calculate the angle between the rocket and the mouse position
    const angle = Math.atan2(event.clientY - rocket.offsetTop, event.clientX - rocket.offsetLeft);

    // Move each bullet in the direction of the angle
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        const speed = 10; // Adjust the speed as needed

        // Calculate the new position of the bullet
        const newX = bullet.offsetLeft + Math.cos(angle) * speed;
        const newY = bullet.offsetTop + Math.sin(angle) * speed;

        // Move the bullet to the new position
        bullet.style.left = `${newX}px`;
        bullet.style.top = `${newY}px`;
    }
});
