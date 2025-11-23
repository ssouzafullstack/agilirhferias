using AgiliRHFerias.Contracts;
using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.WebAPI.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using NLog;
using System.IO;

namespace AgiliRHFerias.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            LogManager.Setup().LoadConfigurationFromFile(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));

            builder.Services.ConfigureCors();
            builder.Services.ConfigureIISIntegration();
            builder.Services.ConfigureLoggerService();
            builder.Services.ConfigureRepositoryManager();
            builder.Services.ConfigureServiceManager();
            builder.Services.ConfigureSqlContext(builder.Configuration);
            builder.Services.ConfigureResponseCaching();
            builder.Services.AddAuthentication();
            builder.Services.ConfigureIdentity();
            builder.Services.ConfigureJWT(builder.Configuration);
            builder.Services.ConfigureSwagger();
            builder.Services.AddHttpContextAccessor();

            builder.Services.AddControllers()
                            .AddApplicationPart(typeof(Presentation.AssemblyReference).Assembly)
                            .AddNewtonsoftJson(options =>
                            {
                                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                            });

            builder.Services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            builder.Services.AddScoped<ValidationFilterAttribute>();
            builder.Services.AddScoped<IUserContextService, UserContextService>();

            builder.Services.AddAutoMapper(cfg => { }, typeof(Program).Assembly);

            var app = builder.Build();

            var logger = app.Services.GetRequiredService<ILoggerManager>();
            app.ConfigureExceptionHandler(logger);

            if (app.Environment.IsProduction())
            {
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseSwaggerUI(s =>
            {
                s.SwaggerEndpoint("/swagger/v1/swagger.json", "AgiliRH WebAPI v1");
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.All
            });

            app.UseCors("CorsPolicy");
            app.UseResponseCaching();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
