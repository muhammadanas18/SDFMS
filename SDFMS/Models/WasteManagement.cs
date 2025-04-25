using System;
using System.Collections.Generic;

namespace SDFMS.Models;

public partial class WasteManagement
{
    public int WasteId { get; set; }

    public string? WasteType { get; set; }

    public DateOnly? DisposalDate { get; set; }

    public string? DisposalMethod { get; set; }

    public decimal? Quantity { get; set; }

    public bool? Sold { get; set; }
}
