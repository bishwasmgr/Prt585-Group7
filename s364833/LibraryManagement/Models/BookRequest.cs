namespace LibraryManagement.Models
{
    public class BookRequest
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int StudentId { get; set; }
        public DateTime RequestDate { get; set; }

        public Book? Book { get; set; }
        public Student? Student { get; set; }
    }
}
