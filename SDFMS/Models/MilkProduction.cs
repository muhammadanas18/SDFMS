using System;
using System.Collections.Generic;

namespace SDFMS.Models;

public partial class MilkProduction
{
    public int RecordId { get; set; }

    public int? AnimalId { get; set; }

    public DateOnly? DateRecorded { get; set; }

    public decimal? MilkQuantity { get; set; }

    public string? Remarks { get; set; }

    public virtual Animal? Animal { get; set; }
}
