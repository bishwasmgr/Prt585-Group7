using System.Collections.Generic;
using System.Threading.Tasks;
using LibraryManagementSystem.DAL.Models;

namespace LibraryManagementSystem.BLL.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetAllBooks();
        Task<Book> GetBookById(int id);
        Task AddBook(Book book);
        Task UpdateBook(Book book);
        Task DeleteBook(int id);
    }
}
