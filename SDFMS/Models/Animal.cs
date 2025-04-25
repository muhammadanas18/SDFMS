using System;
using System.Collections.Generic;

namespace SDFMS.Models;

public partial class Animal
{
    public int AnimalId { get; set; }

    public string AnimalTagNo { get; set; } = null!;

    public string? Breed { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public string? Gender { get; set; }

    public string? HealthStatus { get; set; }

    public DateTime? EntryDate { get; set; }

    public virtual ICollection<FeedingSchedule> FeedingSchedules { get; set; } = new List<FeedingSchedule>();

    public virtual ICollection<HealthRecord> HealthRecords { get; set; } = new List<HealthRecord>();

    public virtual ICollection<MilkProduction> MilkProductions { get; set; } = new List<MilkProduction>();
}
