using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.AddressField1)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.AddressField2)
           .HasMaxLength(255)
           .IsRequired();
        builder.Property(e => e.City)
          .HasMaxLength(255)
          .IsRequired();
        builder.Property(e => e.Country)
          .HasMaxLength(255)
          .IsRequired();
        builder.Property(e => e.ZipCode)
          .HasMaxLength(255)
          .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();
    }
}
