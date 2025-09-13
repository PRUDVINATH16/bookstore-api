const form = document.getElementById('bookForm');
const responseText = document.getElementById('response');
const getAllBooksBtn = document.querySelector('.getAllBooks');
const allBooksResultContainer = document.querySelector('.all-books-result');
const getBookByIdBtn = document.querySelector('.getBookById');
const bookIdInput = document.querySelector('#bookId');
const SingleBookResultContainer = document.querySelector('.book-result');
const deleteBookByIdBtn = document.querySelector('.deleteBookById');
const deleteBookIdInput = document.querySelector('#deleteBookId');
const deleteBookResultContainer = document.querySelector('.delete-book-result');
const updateBookByIdBtn = document.querySelector('.updateBookById');
const updateBookIdInput = document.querySelector('#updateBookId');
const updateBookTitleInput = document.querySelector('#updateBookTitle');
const updateBookAuthorInput = document.querySelector('#updateBookAuthor');
const updateBookPriceInput = document.querySelector('#updateBookPrice');
const updateBookResultContainer = document.querySelector('.update-book-result');

// Clear input fields function
function clearInputs(inputs) {
  inputs.forEach(input => {
    if (input) input.value = '';
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('http://localhost:3000/api/books/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    responseText.innerText = result.message || 'Something happened';
    
    // Clear form inputs after successful submission
    if (result.success || result.message) {
      form.reset();
    }

  } catch (err) {
    responseText.innerText = 'Error adding book';
    console.error(err);
  }
});

getAllBooksBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/books/get');
    const result = await response.json();
    allBooksResultContainer.innerHTML = '';
    
    if (result.success) {
      if (result.data.length === 0) {
        allBooksResultContainer.innerHTML = '<p style="padding: 1rem; text-align: center;">No books found.</p>';
      } else {
        result.data.forEach(book => {
          allBooksResultContainer.innerHTML += `
            <div class="book">
              <h3>${book.title}</h3>
              <p>Author: ${book.author}</p>
              <p>Price: ₹${book.price}</p>
            </div>
          `;
        });
      }
    } else {
      allBooksResultContainer.innerHTML = '<p style="padding: 1rem; text-align: center;">Failed to fetch books.</p>';
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    allBooksResultContainer.innerHTML = '<p style="padding: 1rem; text-align: center;">Error fetching books.</p>';
  }
});

getBookByIdBtn.addEventListener('click', async () => {
  const bookId = bookIdInput.value;
  if (!bookId) {
    SingleBookResultContainer.innerHTML = '<p>Please enter a book ID.</p>';
    return;
  }
  
  try {
    const response = await fetch(`http://localhost:3000/api/books/get/${bookId}`);
    const result = await response.json();
    SingleBookResultContainer.innerHTML = '';
    
    if (result.success) {
      SingleBookResultContainer.innerHTML = `
        <div class="book">
          <h3>${result.data.title}</h3>
          <p>Author: ${result.data.author}</p>
          <p>Price: ₹${result.data.price}</p>
        </div>
      `;
      // Clear input after successful fetch
      bookIdInput.value = '';
    } else {
      SingleBookResultContainer.innerHTML = `<p>${result.message}</p>`;
    }
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    SingleBookResultContainer.innerHTML = '<p>Error fetching book.</p>';
  }
});

deleteBookByIdBtn.addEventListener('click', async () => {
  const bookId = deleteBookIdInput.value;
  if (!bookId) {
    deleteBookResultContainer.innerHTML = '<p>Please enter a book ID to delete.</p>';
    return;
  }
  
  try {
    const response = await fetch(`http://localhost:3000/api/books/delete/${bookId}`, {
      method: 'DELETE'
    });
    
    const result = await response.json();
    deleteBookResultContainer.innerHTML = result.message || 'Something happened';
    
    // Clear input after successful deletion
    if (result.success) {
      deleteBookIdInput.value = '';
    }
    
  } catch (error) {
    console.error('Error deleting book:', error);
    deleteBookResultContainer.innerHTML = '<p>Error deleting book.</p>';
  }
});

updateBookByIdBtn.addEventListener('click', async () => {
  const bookId = updateBookIdInput.value;
  const title = updateBookTitleInput.value;
  const author = updateBookAuthorInput.value;
  const price = updateBookPriceInput.value;

  if (!bookId || !title || !author || !price) {
    updateBookResultContainer.innerHTML = 'Please fill in all fields.';
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/books/update/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author, price })
    });

    const result = await response.json();
    updateBookResultContainer.innerHTML = result.message || 'Something happened';

    // Clear all update inputs after successful update
    if (result.success) {
      clearInputs([updateBookIdInput, updateBookTitleInput, updateBookAuthorInput, updateBookPriceInput]);
    }

  } catch (error) {
    console.error('Error updating book:', error);
    updateBookResultContainer.innerHTML = 'Error updating book';
  }
});