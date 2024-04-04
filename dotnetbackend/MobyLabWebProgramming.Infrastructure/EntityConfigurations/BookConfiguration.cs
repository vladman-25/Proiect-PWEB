/*
 * public class Book : BaseEntity {
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Year { get; set; } = default!;
    public float Price { get; set; } = default!;

    public Author Author { get; set; } = default!;
    public Publisher Publisher { get; set; } = default!;
    public ICollection<BookGenreEnum> Genres { get; set; } = default!;
}
 */

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class BoookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.Title)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Description)
           .HasMaxLength(255)
           .IsRequired();
        builder.Property(e => e.Price)
           .IsRequired();

        /*builder.Property(e => e.Genres)
           .IsRequired();*/
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.Author) // This specifies a one-to-many relation.
            .WithMany(e => e.Books) // This provides the reverse mapping for the one-to-many relation. 
            .HasForeignKey(e => e.AuthorId) // Here the foreign key column is specified.
            .HasPrincipalKey(e => e.Id) // This specifies the referenced key in the referenced table.
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.Publisher) // This specifies a one-to-many relation.
           .WithMany(e => e.Books) // This provides the reverse mapping for the one-to-many relation. 
           .HasForeignKey(e => e.PublisherId) // Here the foreign key column is specified.
           .HasPrincipalKey(e => e.Id) // This specifies the referenced key in the referenced table.
           .IsRequired()
           .OnDelete(DeleteBehavior.Cascade);
    }
}
