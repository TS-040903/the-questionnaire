const form = document.querySelector('.form');
const button = document.getElementById('button');
const githubUsername = 'TS-040903';

form.addEventListener('submit', async(event) => {
    event.preventDefault();

    const formData = {
        name: form.name.value,
        secondName: form.secondName.value,
        phone: form.phone.value,
        email: form.email.value,
        agree: form.agree.checked,
    };

    try {
        const response = await fetch('https://polinashneider.space/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${githubUsername}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();


        showSuccessNotification(data.message || "Данные успешно отправлены!");
        form.reset();

    } catch (error) {

        showErrorNotification(error.message || "Произошла ошибка при отправке данных.");
    }
});




function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification', 'success');
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification', 'error');
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 5000);
}