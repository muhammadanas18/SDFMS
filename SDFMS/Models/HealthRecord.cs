using System;
using System.Collections.Generic;

namespace SDFMS.Models;

public partial class HealthRecord
{
    public int RecordId { get; set; }

    public int? AnimalId { get; set; }

    public DateOnly? VaccinationDate { get; set; }

    public string? TreatmentDetails { get; set; }

    public DateOnly? NextCheckupDate { get; set; }

    public virtual Animal? Animal { get; set; }
}
