using System;
using System.Collections.Generic;

namespace SDFMS.Models;

public partial class EmployeeTasks
{
    public int TaskId { get; set; }

    public int? AssignedTo { get; set; }

    public string? TaskDescription { get; set; }

    public DateOnly? DueDate { get; set; }

    public string? Status { get; set; }

    public virtual Employee? AssignedToNavigation { get; set; }
}
