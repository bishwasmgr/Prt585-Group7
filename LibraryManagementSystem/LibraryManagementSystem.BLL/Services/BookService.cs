using System.Collections.Generic;
using System.Threading.Tasks;
using LibraryManagementSystem.BLL.Interfaces;
using LibraryManagementSystem.DAL.Models;
using LibraryManagementSystem.DAL.Repositories;

namespace LibraryManagementSystem.BLL.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return await _bookRepository.GetAllBooks();
        }

        public async Task<Book> GetBookById(int id)
        {
            return await _bookRepository.GetBookById(id);
        }

        public async Task AddBook(Book book)
        {
            await _bookRepository.AddBook(book);
        }

        public async Task UpdateBook(Book book)
        {
            await _bookRepository.UpdateBook(book);
        }

        public async Task DeleteBook(int id)
        {
            await _bookRepository.DeleteBook(id);
        }
    }
}
