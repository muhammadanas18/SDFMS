using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using SDFMS.Models;

namespace SDFMS.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Animals()
        {
            return View();
        }
        public IActionResult Animalhealth()
        {
            return View();
        }
        public IActionResult Milkproduction()
        {
            return View();
        }
        public IActionResult Feedingscheduler()
        {
            return View();
        }
        public IActionResult Inventory()
        {
            return View();
        }
        public IActionResult Financial()
        {
            return View();
        }
        public IActionResult Tasks()
        {
            return View();
        }
        public IActionResult Waste()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
