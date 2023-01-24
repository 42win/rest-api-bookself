const { 
  postNewBook,
  getAllBook,
  getBookById,
  updateBookById,
  deleteBookById
} = require('../controller/C_Book')

  const routes = [
    // {
    //   method: 'GET',
    //   path: '/',
    //   handler: () => {
    //       return "ini adalah halaman home"
    //   },
    // }, 

    // {
    //   method: '*',
    //   path: '/',
    //   handler: () => {
    //       return "halaman ini tidak bisa diakses"
    //   },
    // }, 
 
    {
      method: 'POST',
      path: '/books',
      handler: postNewBook,
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllBook,
    },
    {
      method: 'GET',
      path: '/books/{id}',
      handler: getBookById,
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: updateBookById,
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: deleteBookById,
    },
  ];
   
  module.exports = routes;