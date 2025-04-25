using System;
using System.Collections.Generic;

namespace SDFMS.Models;

public partial class Inventory
{
    public int ItemId { get; set; }

    public string? ItemName { get; set; }

    public string? Category { get; set; }

    public int? QuantityAvailable { get; set; }

    public int? ReorderLevel { get; set; }

    public DateTime? LastUpdated { get; set; }
}
