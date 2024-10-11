public class StudentService
{
    private readonly StudentRepository _studentRepository;

    public StudentService(StudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }

    public IEnumerable<Student> GetAllStudents()
    {
        return _studentRepository.GetAllStudents();
    }

    public Student GetStudentById(int id)
    {
        return _studentRepository.GetStudentById(id);
    }

    public void AddStudent(Student student)
    {
        _studentRepository.AddStudent(student);
    }

    public void UpdateStudent(Student student)
    {
        _studentRepository.UpdateStudent(student);
    }

    public void DeleteStudent(int id)
    {
        _studentRepository.DeleteStudent(id);
    }
}
