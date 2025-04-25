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
    public class MilkProductionsController : Controller
    {
        private readonly SmartDairyFarmContext _context;

        public MilkProductionsController(SmartDairyFarmContext context)
        {
            _context = context;
        }

        // GET: MilkProductions
        public async Task<IActionResult> Index()
        {
            var smartDairyFarmContext = _context.MilkProductions.Include(m => m.Animal);
            return View(await smartDairyFarmContext.ToListAsync());
        }

        // GET: MilkProductions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var milkProduction = await _context.MilkProductions
                .Include(m => m.Animal)
                .FirstOrDefaultAsync(m => m.RecordId == id);
            if (milkProduction == null)
            {
                return NotFound();
            }

            return View(milkProduction);
        }

        // GET: MilkProductions/Create
        public IActionResult Create()
        {
            ViewData["AnimalId"] = new SelectList(_context.Animals, "AnimalId", "AnimalId");
            return View();
        }

        // POST: MilkProductions/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("RecordId,AnimalId,DateRecorded,MilkQuantity,Remarks")] MilkProduction milkProduction)
        {
            if (ModelState.IsValid)
            {
                _context.Add(milkProduction);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AnimalId"] = new SelectList(_context.Animals, "AnimalId", "AnimalId", milkProduction.AnimalId);
            return View(milkProduction);
        }

        // GET: MilkProductions/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var milkProduction = await _context.MilkProductions.FindAsync(id);
            if (milkProduction == null)
            {
                return NotFound();
            }
            ViewData["AnimalId"] = new SelectList(_context.Animals, "AnimalId", "AnimalId", milkProduction.AnimalId);
            return View(milkProduction);
        }

        // POST: MilkProductions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("RecordId,AnimalId,DateRecorded,MilkQuantity,Remarks")] MilkProduction milkProduction)
        {
            if (id != milkProduction.RecordId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(milkProduction);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MilkProductionExists(milkProduction.RecordId))
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
            ViewData["AnimalId"] = new SelectList(_context.Animals, "AnimalId", "AnimalId", milkProduction.AnimalId);
            return View(milkProduction);
        }

        // GET: MilkProductions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var milkProduction = await _context.MilkProductions
                .Include(m => m.Animal)
                .FirstOrDefaultAsync(m => m.RecordId == id);
            if (milkProduction == null)
            {
                return NotFound();
            }

            return View(milkProduction);
        }

        // POST: MilkProductions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var milkProduction = await _context.MilkProductions.FindAsync(id);
            if (milkProduction != null)
            {
                _context.MilkProductions.Remove(milkProduction);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MilkProductionExists(int id)
        {
            return _context.MilkProductions.Any(e => e.RecordId == id);
        }
    }
}
