const { nanoid }  = require('nanoid')
const D_Books = require('../model/D_Books')
const {
  successWithoutMessage,
  successWithMessage,
  validation,
  getDate,
  failed
} = require('../utils')

const postNewBook = (request, h) => {
  let res='' 

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  // validation
  const valid = validation({ name, readPage, pageCount }, 'create');
 
  if(!valid.status){
    return failed(h, 400, valid.message); 

  } else {
     
    const id  = nanoid(16)
    const finished = (pageCount === readPage)
    const insertedAt = getDate()
    const updatedAt  = insertedAt
   
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      insertedAt,
      updatedAt,
    } 
   
    // insert
    D_Books.push(newBook)
   
    const isSuccess = D_Books.filter(D_Books=>D_Books.id === id).length > 0
    
    if(isSuccess){ 
      return successWithoutMessage(h, 200, { bookId:id } ); 
   
    }else{ 
      return failed(h, 404, 'Buku tidak ditemukan');
    } 
  }  
}

const updateBookById = (request, h) => {
  const { id } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const finished = pageCount === readPage;
  const index = D_Books.findIndex(data => data.id === id);
  const valid = validation({ name, readPage, pageCount }, 'update');
  
  if (!valid.status) {
    return failed(h, 400, valid.message);
  }else if (index !== -1) {
    D_Books[index] = {
      ...D_Books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      getDate,
    };

    return successWithMessage(h, 200, 'Buku berhasil diperbarui', {
      id: D_Books[index].id,
      name: D_Books[index].name,
      publisher: D_Books[index].publisher,
    });
    
  }else{
    return failed(h, 404, 'Gagal memperbarui buku. Id tidak ditemukan');
  }

};

const deleteBookById = (request, h) => {
  const {id} = request.params;
  const book = D_Books.findIndex((D_Books) => D_Books.id === id);

  if (book !== -1) {
    D_Books.splice(D_Books, 1);
    return successWithMessage(h, 200, 'Buku berhasil dihapus');
  } else { 
    return failed(h, 404, 'Buku gagal dihapus. Id tidak ditemukan')
  } 
};

const getBookById = (request, h) => {

  const {id} = request.params;
  const book = D_Books.filter((data) => data.id === id)[0];

  if (book !== undefined) {
    return successWithoutMessage(h, 200, book) 

  } else {
    return failed(h, 404, 'Buku tidak ditemukan');
  }
}

const getAllBook = (request, h) => {
  let booksResponse = D_Books;

  booksResponse = D_Books.map((D_Books)=>{
    return {
      'id': D_Books.id,
      'name': D_Books.name,
      'publisher': D_Books.publisher,
    };
  });

  return successWithoutMessage(h, 200, booksResponse)
};

module.exports = {
  postNewBook,
  getAllBook,
  getBookById,
  updateBookById,
  deleteBookById
}