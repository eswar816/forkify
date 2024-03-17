import View from "./View";
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if(!btn) return

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    console.log("prev----",this._generateMarkupButton("prev", "hidden"));
    console.log("number----",this._generatePageNumber());
    // page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      const a = this._generateMarkupButton("prev", "hidden") + this._generatePageNumber() + this._generateMarkupButton("next");
      console.log("a----",a);
      return a
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton("prev") + this._generatePageNumber() + this._generateMarkupButton("next", "hidden");
    }

    // Other page
    if (currentPage < numPages) {
      return this._generateMarkupButton("prev") + this._generatePageNumber() + this._generateMarkupButton("next");
    }

    // page 1, and there are NO other pages
    return ''
  }

  _generateMarkupButton(type, className = '') {
    const currentPage = this._data.page;
    // return `          
    // <button data-goto="${type === "next" ? (currentPage + 1) : (currentPage - 1)}" class="btn--inline pagination__btn--${type} ${className}">
    //     <span>Page ${type === "next" ? (currentPage + 1) : (currentPage - 1)}</span>
    //     <svg class="search__icon">
    //         <use href="${icons}#icon-arrow-${type === "next" ? "right" : "left"}"></use>
    //     </svg>
    // </button>`
    const next = `
    <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next ${className}">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;

    const prev = `
    <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev ${className}">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
    `;

    const paginationType = {
      "next": next,
      "prev": prev,
      "both" : prev + next
    }
    return paginationType[type];
  }

  _generatePageNumber(){
    const currentPage = this._data.page;
    return `<div class="pagination-page_number">
        <span>${currentPage}</span>
      </div>`;
  }
}


export default new PaginationView();