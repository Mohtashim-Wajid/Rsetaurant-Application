/*

using RestaurantAPI;
var app = Startup.InitializeApp(args);
app.Run();

*/

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace RestaurantAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}




