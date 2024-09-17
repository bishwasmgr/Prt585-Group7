namespace LibraryManagement.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string StudentId { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = "Student"; // Default role is "Student"

        public ICollection<BookRequest>? BookRequests { get; set; }
    }
}
