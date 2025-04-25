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
    public class WasteManagementsController : Controller
    {
        private readonly SmartDairyFarmContext _context;

        public WasteManagementsController(SmartDairyFarmContext context)
        {
            _context = context;
        }

        // GET: WasteManagements
        public async Task<IActionResult> Index()
        {
            return View(await _context.WasteManagements.ToListAsync());
        }

        // GET: WasteManagements/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var wasteManagement = await _context.WasteManagements
                .FirstOrDefaultAsync(m => m.WasteId == id);
            if (wasteManagement == null)
            {
                return NotFound();
            }

            return View(wasteManagement);
        }

        // GET: WasteManagements/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: WasteManagements/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("WasteId,WasteType,DisposalDate,DisposalMethod,Quantity,Sold")] WasteManagement wasteManagement)
        {
            if (ModelState.IsValid)
            {
                _context.Add(wasteManagement);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(wasteManagement);
        }

        // GET: WasteManagements/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var wasteManagement = await _context.WasteManagements.FindAsync(id);
            if (wasteManagement == null)
            {
                return NotFound();
            }
            return View(wasteManagement);
        }

        // POST: WasteManagements/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("WasteId,WasteType,DisposalDate,DisposalMethod,Quantity,Sold")] WasteManagement wasteManagement)
        {
            if (id != wasteManagement.WasteId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(wasteManagement);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!WasteManagementExists(wasteManagement.WasteId))
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
            return View(wasteManagement);
        }

        // GET: WasteManagements/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var wasteManagement = await _context.WasteManagements
                .FirstOrDefaultAsync(m => m.WasteId == id);
            if (wasteManagement == null)
            {
                return NotFound();
            }

            return View(wasteManagement);
        }

        // POST: WasteManagements/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var wasteManagement = await _context.WasteManagements.FindAsync(id);
            if (wasteManagement != null)
            {
                _context.WasteManagements.Remove(wasteManagement);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool WasteManagementExists(int id)
        {
            return _context.WasteManagements.Any(e => e.WasteId == id);
        }
    }
}
