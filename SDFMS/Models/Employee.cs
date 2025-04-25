using System;
using System.Collections.Generic;

namespace SDFMS.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<EmployeeTasks> Tasks { get; set; } = new List<EmployeeTasks>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
