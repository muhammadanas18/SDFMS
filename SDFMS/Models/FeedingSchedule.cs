using System;
using System.Collections.Generic;

namespace SDFMS.Models;

public partial class FeedingSchedule
{
    public int ScheduleId { get; set; }

    public int? AnimalId { get; set; }

    public TimeOnly? FeedingTime { get; set; }

    public string? FeedType { get; set; }

    public decimal? Quantity { get; set; }

    public string? Status { get; set; }

    public virtual Animal? Animal { get; set; }
}
