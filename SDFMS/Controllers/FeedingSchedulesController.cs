using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SDFMS.Models;

namespace SDFMS.Controllers
{
    public class FeedingSchedulesController : Controller
    {
        private readonly SmartDairyFarmContext _context;

        public FeedingSchedulesController(SmartDairyFarmContext context)
        {
            _context = context;
        }

        // GET: FeedingSchedules
        public async Task<IActionResult> Index()
        {
            var smartDairyFarmContext = _context.FeedingSchedules.Include(f => f.Animal);
            return View(await smartDairyFarmContext.ToListAsync());
        }

        // GET: FeedingSchedules/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var feedingSchedule = await _context.FeedingSchedules
                .Include(f => f.Animal)
                .FirstOrDefaultAsync(m => m.ScheduleId == id);
            if (feedingSchedule == null)
            {
                return NotFound();
            }

            return View(feedingSchedule);
        }

        // GET: FeedingSchedules/Create
        public IActionResult Create()
        {
            ViewData["AnimalId"] = new SelectList(_context.Animals, "AnimalId", "AnimalId");
            return View();
        }

        // POST: FeedingSchedules/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ScheduleId,AnimalId,FeedingTime,FeedType,Quantity,Status")] FeedingSchedule feedingSchedule)
        {
            if (ModelState.IsValid)
            {
                _context.Add(feedingSchedule);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AnimalId"] = new SelectList(_context.Animals, "AnimalId", "AnimalId", feedingSchedule.AnimalId);
            return View(feedingSchedule);
        }

        // GET: FeedingSchedules/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var feedingSchedule = await _context.FeedingSchedules.FindAsync(id);
            if (feedingSchedule == null)
            {
                return NotFound();
            }
            ViewData["AnimalId"] = new SelectList(_context.Animals, "AnimalId", "AnimalId", feedingSchedule.AnimalId);
            return View(feedingSchedule);
        }

        // POST: FeedingSchedules/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ScheduleId,AnimalId,FeedingTime,FeedType,Quantity,Status")] FeedingSchedule feedingSchedule)
        {
            if (id != feedingSchedule.ScheduleId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(feedingSchedule);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FeedingScheduleExists(feedingSchedule.ScheduleId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["AnimalId"] = new SelectList(_context.Animals, "AnimalId", "AnimalId", feedingSchedule.AnimalId);
            return View(feedingSchedule);
        }

        // GET: FeedingSchedules/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var feedingSchedule = await _context.FeedingSchedules
                .Include(f => f.Animal)
                .FirstOrDefaultAsync(m => m.ScheduleId == id);
            if (feedingSchedule == null)
            {
                return NotFound();
            }

            return View(feedingSchedule);
        }

        // POST: FeedingSchedules/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var feedingSchedule = await _context.FeedingSchedules.FindAsync(id);
            if (feedingSchedule != null)
            {
                _context.FeedingSchedules.Remove(feedingSchedule);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool FeedingScheduleExists(int id)
        {
            return _context.FeedingSchedules.Any(e => e.ScheduleId == id);
        }
    }
}
