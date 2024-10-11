public class StudentRepository
{
    private readonly AppDbContext _context;

    public StudentRepository(AppDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Student> GetAllStudents()
    {
        return _context.Students.ToList();
    }

    public Student GetStudentById(int id)
    {
        return _context.Students.FirstOrDefault(s => s.StudentId == id);
    }

    public void AddStudent(Student student)
    {
        _context.Students.Add(student);
        _context.SaveChanges();
    }

    public void UpdateStudent(Student student)
    {
        _context.Students.Update(student);
        _context.SaveChanges();
    }

    public void DeleteStudent(int id)
    {
        var student = _context.Students.Find(id);
        if (student != null)
        {
            _context.Students.Remove(student);
            _context.SaveChanges();
        }
    }
}
