

let users = []; // Tablica przechowująca użytkowników (może być później uzupełniona danymi)
//funkcja rendujaca uzytkownika z bazy danych na stronie
const userSelect = document.getElementById('user'); // Pobranie elementu <select> o id="user"

// Pętla for, która przechodzi przez wszystkich użytkowników w tablicy `users`
// Zmienna, która przechowuje wszystkie opcje jako jeden duży tekst HTML
let options = '';

// Przechodzimy przez wszystkich użytkowników i tworzymy opcje w formie tekstowej
for (let i = 0; i < users.length; i++) {
    const user = users[i];
    options += `<option value="${user.id}">${user.name}</option>`;
}

// Wstawiamy wszystkie opcje na raz do elementu <select>
userSelect.innerHTML = options;

async function fetchUser() {
    try {
        const response = await fetch('http://127.0.0.1:8000/user');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const userSelect = document.getElementById('user');

        // Tworzymy zmienną, która będzie zawierać wszystkie opcje jako ciąg tekstowy
        let optionsHTML = '';
        
        // Pętla, która generuje tekst HTML dla każdej opcji
        for (let i = 0; i < data.users.length; i++) {
            const user = data.users[i];
            optionsHTML += `<option value="${user.id}">${user.name}</option>`;
        }

        // Dodajemy wszystkie opcje na raz do elementu <select>
        userSelect.innerHTML = optionsHTML;

    } catch (error) {
        console.error('Error fetching users:', error);
    }
}



//wyslanie danych z formularza na endpoint w create i zapisanie do bazy danych 
/*function submitPost() {
    const formContent = new FormData(document.getElementById('postFormCreate'));

   
    fetch('http://127.0.0.1:8000/create/', { // Upewnij się, że adres URL jest poprawny
        method: 'POST',
        body: formContent,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Post erfolgreich erstellt');
            setTimeout(() => {
                window.location.href='index.html';
            }, 1000);
            
        } else {
            console.error('Fehler beim Erstellen des Posts: ' + data.error);
        }
    })
    .catch(error => console.error('Fehler:', error));
}
*/
//funkcja zapisuje w bazie danych i wyswietal zakutalizowane listy postow przez wywolanie funkcji fetchPosts
function submitPost() {
    var formContent = new FormData(document.getElementById('postFormCreate'));

    fetch('http://127.0.0.1:8000/create/', {
        method: 'POST',
        body: formContent,
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.success) {
            console.log('Post erfolgreich erstellt');
            fetchPosts(); // Pobranie i wyświetlenie zaktualizowanej listy postów
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            console.error('Fehler beim Erstellen des Posts: ' + data.error);
        }
    })
    .catch(function(error) {
        console.error('Fehler:', error);
    });
}



//funkcja pobierajaca uzytkownika z bazy danych
/*async function fetchUser() {
    try {
        const response = await fetch('http://127.0.0.1:8000/user');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        const userSelect = document.getElementById('user');
        data.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}*/
//////////////////////////////////////
//funkcja pobiera dane z posts models urls posts
async function fetchPosts() {
    try {
        const response = await fetch('http://127.0.0.1:8000/posts/');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.success) {
            renderPosts(data.posts);
        } else {
            console.error('Error fetching posts:', data.error);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}
//funkcja pokazuje posty po stronie klienta
function renderPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Wyczyszczenie zawartości kontenera przed dodaniem nowych postów

    let postsHTML = ''; // Tworzymy pusty string, do którego będziemy dodawać HTML

    for (let i = 0; i < posts.length; i++) { // Klasyczna pętla for
        const post = posts[i]; // Aktualny post z tablicy

        // Tworzymy całą strukturę HTML jako string
        postsHTML += `
            <div class="post">
                <h3>User: ${post.user}</h3>
                <img src="${post.image}" alt="${post.user}'s post">
                <p>Location: ${post.location}</p>
                <p>Description: ${post.description}</p>
                <p>Posted on: ${post.created_at}</p>
            </div>
        `;
    }

    // Wstawienie całości jako jeden ciąg znaków do kontenera
    postsContainer.innerHTML = postsHTML;
}





