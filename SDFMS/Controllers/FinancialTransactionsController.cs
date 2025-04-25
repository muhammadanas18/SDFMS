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
    public class FinancialTransactionsController : Controller
    {
        private readonly SmartDairyFarmContext _context;

        public FinancialTransactionsController(SmartDairyFarmContext context)
        {
            _context = context;
        }

        // GET: FinancialTransactions
        public async Task<IActionResult> Index()
        {
            return View(await _context.FinancialTransactions.ToListAsync());
        }

        // GET: FinancialTransactions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var financialTransaction = await _context.FinancialTransactions
                .FirstOrDefaultAsync(m => m.TransactionId == id);
            if (financialTransaction == null)
            {
                return NotFound();
            }

            return View(financialTransaction);
        }

        // GET: FinancialTransactions/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: FinancialTransactions/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("TransactionId,TransactionDate,TransactionType,Amount,Description")] FinancialTransaction financialTransaction)
        {
            if (ModelState.IsValid)
            {
                _context.Add(financialTransaction);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(financialTransaction);
        }

        // GET: FinancialTransactions/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var financialTransaction = await _context.FinancialTransactions.FindAsync(id);
            if (financialTransaction == null)
            {
                return NotFound();
            }
            return View(financialTransaction);
        }

        // POST: FinancialTransactions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("TransactionId,TransactionDate,TransactionType,Amount,Description")] FinancialTransaction financialTransaction)
        {
            if (id != financialTransaction.TransactionId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(financialTransaction);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FinancialTransactionExists(financialTransaction.TransactionId))
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
            return View(financialTransaction);
        }

        // GET: FinancialTransactions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var financialTransaction = await _context.FinancialTransactions
                .FirstOrDefaultAsync(m => m.TransactionId == id);
            if (financialTransaction == null)
            {
                return NotFound();
            }

            return View(financialTransaction);
        }

        // POST: FinancialTransactions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var financialTransaction = await _context.FinancialTransactions.FindAsync(id);
            if (financialTransaction != null)
            {
                _context.FinancialTransactions.Remove(financialTransaction);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool FinancialTransactionExists(int id)
        {
            return _context.FinancialTransactions.Any(e => e.TransactionId == id);
        }
    }
}
