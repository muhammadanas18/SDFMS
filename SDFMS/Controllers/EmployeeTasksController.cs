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
    public class EmployeeTasksController : Controller
    {
        private readonly SmartDairyFarmContext _context;

        public EmployeeTasksController(SmartDairyFarmContext context)
        {
            _context = context;
        }

        // GET: EmployeeTasks
        public async Task<IActionResult> Index()
        {
            var smartDairyFarmContext = _context.Tasks.Include(e => e.AssignedToNavigation);
            return View(await smartDairyFarmContext.ToListAsync());
        }

        // GET: EmployeeTasks/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var employeeTasks = await _context.Tasks
                .Include(e => e.AssignedToNavigation)
                .FirstOrDefaultAsync(m => m.TaskId == id);
            if (employeeTasks == null)
            {
                return NotFound();
            }

            return View(employeeTasks);
        }

        // GET: EmployeeTasks/Create
        public IActionResult Create()
        {
            ViewData["AssignedTo"] = new SelectList(_context.Employees, "EmployeeId", "EmployeeId");
            return View();
        }

        // POST: EmployeeTasks/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("TaskId,AssignedTo,TaskDescription,DueDate,Status")] EmployeeTasks employeeTasks)
        {
            if (ModelState.IsValid)
            {
                _context.Add(employeeTasks);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AssignedTo"] = new SelectList(_context.Employees, "EmployeeId", "EmployeeId", employeeTasks.AssignedTo);
            return View(employeeTasks);
        }

        // GET: EmployeeTasks/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var employeeTasks = await _context.Tasks.FindAsync(id);
            if (employeeTasks == null)
            {
                return NotFound();
            }
            ViewData["AssignedTo"] = new SelectList(_context.Employees, "EmployeeId", "EmployeeId", employeeTasks.AssignedTo);
            return View(employeeTasks);
        }

        // POST: EmployeeTasks/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("TaskId,AssignedTo,TaskDescription,DueDate,Status")] EmployeeTasks employeeTasks)
        {
            if (id != employeeTasks.TaskId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(employeeTasks);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EmployeeTasksExists(employeeTasks.TaskId))
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
            ViewData["AssignedTo"] = new SelectList(_context.Employees, "EmployeeId", "EmployeeId", employeeTasks.AssignedTo);
            return View(employeeTasks);
        }

        // GET: EmployeeTasks/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var employeeTasks = await _context.Tasks
                .Include(e => e.AssignedToNavigation)
                .FirstOrDefaultAsync(m => m.TaskId == id);
            if (employeeTasks == null)
            {
                return NotFound();
            }

            return View(employeeTasks);
        }

        // POST: EmployeeTasks/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var employeeTasks = await _context.Tasks.FindAsync(id);
            if (employeeTasks != null)
            {
                _context.Tasks.Remove(employeeTasks);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool EmployeeTasksExists(int id)
        {
            return _context.Tasks.Any(e => e.TaskId == id);
        }
    }
}
