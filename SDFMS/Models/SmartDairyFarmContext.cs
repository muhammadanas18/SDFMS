using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SDFMS.Models;

public partial class SmartDairyFarmContext : DbContext
{
    public SmartDairyFarmContext()
    {
    }

    public SmartDairyFarmContext(DbContextOptions<SmartDairyFarmContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Animal> Animals { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<FeedingSchedule> FeedingSchedules { get; set; }

    public virtual DbSet<FinancialTransaction> FinancialTransactions { get; set; }

    public virtual DbSet<HealthRecord> HealthRecords { get; set; }

    public virtual DbSet<Inventory> Inventories { get; set; }

    public virtual DbSet<MilkProduction> MilkProductions { get; set; }

    public virtual DbSet<EmployeeTasks> Tasks { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WasteManagement> WasteManagements { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Animal>(entity =>
        {
            entity.HasKey(e => e.AnimalId).HasName("PK__Animals__A21A7327C9FD18AA");

            entity.HasIndex(e => e.AnimalTagNo, "UQ__Animals__2AA9B7F27E2F52F9").IsUnique();

            entity.Property(e => e.AnimalId).HasColumnName("AnimalID");
            entity.Property(e => e.AnimalTagNo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Breed)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EntryDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.HealthStatus)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04FF1EE27A846");

            entity.Property(e => e.EmployeeId)
                .ValueGeneratedNever()
                .HasColumnName("EmployeeID");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<FeedingSchedule>(entity =>
        {
            entity.HasKey(e => e.ScheduleId).HasName("PK__FeedingS__9C8A5B6900604342");

            entity.Property(e => e.ScheduleId).HasColumnName("ScheduleID");
            entity.Property(e => e.AnimalId).HasColumnName("AnimalID");
            entity.Property(e => e.FeedType)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Quantity).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("Pending");

            entity.HasOne(d => d.Animal).WithMany(p => p.FeedingSchedules)
                .HasForeignKey(d => d.AnimalId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__FeedingSc__Anima__4222D4EF");
        });

        modelBuilder.Entity<FinancialTransaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Financia__55433A4B9FE208B7");

            entity.Property(e => e.TransactionId).HasColumnName("TransactionID");
            entity.Property(e => e.Amount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.TransactionDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TransactionType)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<HealthRecord>(entity =>
        {
            entity.HasKey(e => e.RecordId).HasName("PK__HealthRe__FBDF78C90FD02067");

            entity.Property(e => e.RecordId).HasColumnName("RecordID");
            entity.Property(e => e.AnimalId).HasColumnName("AnimalID");
            entity.Property(e => e.TreatmentDetails).HasColumnType("text");

            entity.HasOne(d => d.Animal).WithMany(p => p.HealthRecords)
                .HasForeignKey(d => d.AnimalId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__HealthRec__Anima__3B75D760");
        });

        modelBuilder.Entity<Inventory>(entity =>
        {
            entity.HasKey(e => e.ItemId).HasName("PK__Inventor__727E83EBD154551C");

            entity.ToTable("Inventory");

            entity.Property(e => e.ItemId).HasColumnName("ItemID");
            entity.Property(e => e.Category)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ItemName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.LastUpdated)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<MilkProduction>(entity =>
        {
            entity.HasKey(e => e.RecordId).HasName("PK__MilkProd__FBDF78C9A8752605");

            entity.ToTable("MilkProduction");

            entity.Property(e => e.RecordId).HasColumnName("RecordID");
            entity.Property(e => e.AnimalId).HasColumnName("AnimalID");
            entity.Property(e => e.DateRecorded).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.MilkQuantity).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Remarks).HasColumnType("text");

            entity.HasOne(d => d.Animal).WithMany(p => p.MilkProductions)
                .HasForeignKey(d => d.AnimalId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__MilkProdu__Anima__3E52440B");
        });

        modelBuilder.Entity<EmployeeTasks>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PK__Tasks__7C6949D1E03A61E5");

            entity.Property(e => e.TaskId).HasColumnName("TaskID");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("Pending");
            entity.Property(e => e.TaskDescription).HasColumnType("text");
             
            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.AssignedTo)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Tasks__AssignedT__5535A963");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC99CBCADD");

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E48037F538").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Employee).WithMany(p => p.Users)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Users__EmployeeI__619B8048");
        });

        modelBuilder.Entity<WasteManagement>(entity =>
        {
            entity.HasKey(e => e.WasteId).HasName("PK__WasteMan__716E55219A6E45AB");

            entity.ToTable("WasteManagement");

            entity.Property(e => e.WasteId).HasColumnName("WasteID");
            entity.Property(e => e.DisposalDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.DisposalMethod)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Quantity).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Sold).HasDefaultValue(false);
            entity.Property(e => e.WasteType)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
