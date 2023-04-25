{
  'use strict';
  const select = {
    bookTemplate: '#template-book',
    booksList: '.books-list',
    bookImage: '.book__image',
    form: '.filters',
  };
  const classNames = {
    favorite: 'favorite',
    shouldBeHidden: 'hidden',
  };
  const templates = {
    books: Handlebars.compile(document.querySelector(select.bookTemplate).innerHTML),
  };
  const filters = [];
  class BooksList {
    constructor() {
      const thisBookList = this;

      thisBookList.render();
      thisBookList.getElements();
      thisBookList.initActions();
    }
    getElements() {
      const thisBookList = this;

      thisBookList.booksContainer = document.querySelector(select.booksList);
      thisBookList.booksForm = document.querySelector(select.form);
    }
    render() {
      const thisBookList = this;

      for (let book of dataSource.books) {
        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        const ratingWidth = 10 * ratingBgc;
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;
        /* generate HTML */
        const generatedHTML = templates.books(book);
        /* generate elementDOM */
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        /* find book container */
        const booksContainer = document.querySelector(select.booksList);
        /* add elemnt to book */
        booksContainer.appendChild(generatedDOM);
      }
    }
    initActions() {
      const thisBookList = this;

      const favoriteBooks = [];
      /*  add event listener to clickable trigger on event dblclick */
      thisBookList.booksContainer.addEventListener('dblclick', function (event) {
        /* prevent default action for event */
        event.preventDefault();
        /*find atribute data-id */
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(bookId)) {
          /* add active class to classList favorite */
          event.target.offsetParent.classList.add(classNames.favorite);
          favoriteBooks.push(bookId);
        } else {
          /* remove active class to classList favorite */
          event.target.offsetParent.classList.remove(classNames.favorite);
          favoriteBooks.pop(bookId);
        }
      });
      thisBookList.booksForm.addEventListener('click', function (event) {
        const filter = event.target;
        const checked = filter.checked;
        if (filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter') {
          if (checked) {
            filters.push(filter.value);
          } else if (!checked) {
            filters.pop(filter.value);
          }
        }
        thisBookList.filterBooks();
      });
    }
    filterBooks() {
    /* check every element from dataSource.books */
      for (let book of dataSource.books) {
        let shouldBeHidden = false;
        const selected = document.querySelector('.book__image[data-id="' + book.id + '"]');

        for (const filter of filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden == true) {
          selected.classList.add(classNames.shouldBeHidden);
        } else {
          selected.classList.remove(classNames.shouldBeHidden);
        }
      }
    }
    determineRatingBgc(rating) {
      const thisBookList = this;

      thisBookList.ratingBgc = '';
      /* Add style color gradient to under the image */
      if (rating < 6) thisBookList.ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      else if (rating > 6 && rating <= 8) thisBookList.ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      else if (rating > 8 && rating <= 9) thisBookList.ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      else if (rating > 9) thisBookList.ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';

      return thisBookList.ratingBgc;
    }
  }
  const app = new BooksList();
  console.log(app);
}