using LibraryManagementSystem.BLL.Interfaces;
using LibraryManagementSystem.BLL.Services;
using LibraryManagementSystem.DAL.Data;
using LibraryManagementSystem.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        // DB Context
        services.AddDbContext<LibraryDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

        // Dependency Injection
        services.AddScoped<IBookService, BookService>();
        services.AddScoped<IBookRepository, BookRepository>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
