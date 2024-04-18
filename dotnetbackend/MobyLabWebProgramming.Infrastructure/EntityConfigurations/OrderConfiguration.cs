using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Hosting;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.User) // This specifies a one-to-many relation.
            .WithMany(e => e.Orders) // This provides the reverse mapping for the one-to-many relation. 
            .HasForeignKey(e => e.UserId) // Here the foreign key column is specified.
            .HasPrincipalKey(e => e.Id) // This specifies the referenced key in the referenced table.
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(e => e.Address) // This specifies a one-to-many relation.
            .WithOne(e => e.Order) // This provides the reverse mapping for the one-to-many relation. 
            .HasForeignKey<Order>(e => e.AddressId) // Here the foreign key column is specified.
            .HasPrincipalKey<Address>(e => e.Id) // This specifies the referenced key in the referenced table.
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(e => e.Books) // This specifies a one-to-many relation.
            .WithMany(e => e.Orders) // This provides the reverse mapping for the one-to-many relation.
            .UsingEntity<OrderBook>(
                j => j.Property(e => e.Quantity));

        builder.HasMany(e => e.OrderBooks) // This specifies a one-to-many relation.
            .WithOne() // This provides the reverse mapping for the one-to-many relation. 
            .HasForeignKey(e => e.OrderId) // Here the foreign key column is specified.
            .HasPrincipalKey(e => e.Id) // This specifies the referenced key in the referenced table.
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}