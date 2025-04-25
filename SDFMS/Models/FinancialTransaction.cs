using System;
using System.Collections.Generic;

namespace SDFMS.Models;

public partial class FinancialTransaction
{
    public int TransactionId { get; set; }

    public DateTime? TransactionDate { get; set; }

    public string? TransactionType { get; set; }

    public decimal? Amount { get; set; }

    public string? Description { get; set; }
}
