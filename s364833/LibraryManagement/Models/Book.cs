namespace LibraryManagement.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string ISBN { get; set; } = null!;
        public int NumberOfCopies { get; set; }

        public bool IsAvailable => NumberOfCopies > 0;
    }
}
