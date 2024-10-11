[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{
    private readonly StudentService _studentService;

    public StudentController(StudentService studentService)
    {
        _studentService = studentService;
    }

    [HttpGet]
    public IActionResult GetAllStudents()
    {
        return Ok(_studentService.GetAllStudents());
    }

    [HttpGet("{id}")]
    public IActionResult GetStudentById(int id)
    {
        var student = _studentService.GetStudentById(id);
        if (student == null)
        {
            return NotFound();
        }
        return Ok(student);
    }

    [HttpPost]
    public IActionResult AddStudent([FromBody] Student student)
    {
        _studentService.AddStudent(student);
        return CreatedAtAction(nameof(GetStudentById), new { id = student.StudentId }, student);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateStudent(int id, [FromBody] Student student)
    {
        if (id != student.StudentId)
        {
            return BadRequest();
        }

        _studentService.UpdateStudent(student);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteStudent(int id)
    {
        _studentService.DeleteStudent(id);
        return NoContent();
    }
}
