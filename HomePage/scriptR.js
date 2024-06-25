// Управление модальными окнами

const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const openLoginModalBtn = document.getElementById('openLoginModal');
const openRegisterModalBtn = document.getElementById('openRegisterModal');
const closeLoginModalBtn = document.getElementById('closeLoginModal');
const closeRegisterModalBtn = document.getElementById('closeRegisterModal');
const openModalGrandR=document.getElementById('openRegisterModal1');
const openModalGrandL=document.getElementById('openLoginModal1');
openLoginModalBtn.onclick = () => {
    loginModal.style.display = 'block';
};
openModalGrandL.onclick = () => {
    loginModal.style.display = 'block';
};
openRegisterModalBtn.onclick = () => {
    registerModal.style.display = 'block';
};
openModalGrandR.onclick = () => {
    registerModal.style.display = 'block';
};

closeLoginModalBtn.onclick = () => {
    loginModal.style.display = 'none';
};

closeRegisterModalBtn.onclick = () => {
    registerModal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
};

// Генерация никнейма
function generateNickname() {
    const adjectives = ["Cool", "Smart", "Fast", "Brave", "Witty"];
    const nouns = ["Tiger", "Eagle", "Shark", "Lion", "Wolf"];
    return adjectives[Math.floor(Math.random() * adjectives.length)] + 
           nouns[Math.floor(Math.random() * nouns.length)];
}

let nicknameAttempts = 0;
const maxNicknameAttempts = 5;
const registerNickname = document.getElementById('registerNickname');
const generateNicknameBtn = document.getElementById('generateNickname');

generateNicknameBtn.onclick = () => {
    if (nicknameAttempts < maxNicknameAttempts) {
        registerNickname.value = generateNickname();
        nicknameAttempts++;
    } else {
        registerNickname.removeAttribute('readonly');
        generateNicknameBtn.disabled = true;
    }
};

// Валидация номера телефона
function validatePhoneNumber(phone) {
    const phonePattern = /^\+375 \d{2} \d{3}-\d{2}-\d{2}$/;
    return phonePattern.test(phone);
}

// Валидация возраста
function validateAge(dob) {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 16;
}

// Валидация пароля
function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    const commonPasswords = ["123456", "password", "123456789", "12345678", "12345", "1234567", "qwerty"];
    return passwordPattern.test(password) && !commonPasswords.includes(password);
}

// Обработка регистрации
document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const phone = document.getElementById('registerPhone').value;
    const email = document.getElementById('registerEmail').value;
    const dob = document.getElementById('registerDOB').value;
    const passwordChoice = document.getElementById('registerPasswordChoice').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const fatherName = document.getElementById('registerFatherName').value;
    const nickname = document.getElementById('registerNickname').value;
    const agreement = document.getElementById('registerAgreement').checked;

    if (!validatePhoneNumber(phone)) {
        alert('Invalid phone number. It should be in format +375 XX XXX-XX-XX');
        
        return;
    }

    if (!validateAge(dob)) {
        alert('You must be at least 16 years old to register.');
        return;
    }

    if (passwordChoice === 'manual') {
        if (!validatePassword(password)) {
            alert('Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    }

    if (!agreement) {
        alert('You must read and accept the User Agreement.');
        return;
    }

    const newUser = {
        phone,
        email,
        dob,
        password: passwordChoice === 'manual' ? password : generatePassword(),
        firstName,
        lastName,
        fatherName,
        nickname
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    registerModal.style.display = 'none';
});

// Обработка входа
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const accountName = document.getElementById('loginAccountName').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(user => user.nickname === accountName && user.password === password);

    if (user) {
        alert('Login successful');
        loginModal.style.display = 'none';

        // Сохраняем информацию о текущем пользователе в localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // После успешной авторизации проверяем, авторизован ли пользователь
        checkAuthorization();
    } else {
        alert('Invalid account name or password');
    }
});
// Добавляем обработчик события для кнопки выхода
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('currentUser'); // Удаление данных о текущем пользователе
    alert('Вы успешно вышли из аккаунта');
    // Перенаправление на страницу входа (или на другую страницу)
    window.location.href = 'index.html'; // Замените на соответствующий путь к странице входа
});
document.getElementById('logoutButton1').addEventListener('click', () => {
    localStorage.removeItem('currentUser'); // Удаление данных о текущем пользователе
    alert('Вы успешно вышли из аккаунта');
    // Перенаправление на страницу входа (или на другую страницу)
    window.location.href = 'index.html'; // Замените на соответствующий путь к странице входа
});
// Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const logoutButton = document.getElementById('logoutButton');
    const logoutButton1 = document.getElementById('logoutButton1');
    if (currentUser) {
        // Пользователь авторизован, отображаем кнопку выхода
        logoutButton.style.display = 'block';
        logoutButton1.style.display = 'block';
    } else {
        // Пользователь не авторизован, скрываем кнопку выхода
        logoutButton.style.display = 'none';
        logoutButton1.style.display = 'none';
    }
});
const opticalLink = document.getElementById('opticalLink');
const sunLink = document.getElementById('sunLink');
opticalLink.addEventListener('click', function(event) {
    // Проверяем статус авторизации
    if (!isLoggedIn()) {
        event.preventDefault(); // Отменяем стандартное действие перехода по ссылке
        alert('Please log in to access this page.');
        // Дополнительно можно перенаправить на страницу входа
        // window.location.href = '/login.html';
    }
});

sunLink.addEventListener('click', function(event) {
    // Проверяем статус авторизации
    if (!isLoggedIn()) {
        event.preventDefault(); // Отменяем стандартное действие перехода по ссылке
        alert('Please log in to access this page.');
        // Дополнительно можно перенаправить на страницу входа
        // window.location.href = '/login.html';
    }
});
function isLoggedIn() {
    // Здесь можно проверить, есть ли какие-то данные о текущем пользователе (например, через localStorage или другой механизм)
    // Возвращаем true, если пользователь авторизован, и false, если нет
    // Пример:
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser !== null; // Пример простой проверки наличия текущего пользователя в localStorage
}