using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class iDK7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderBook_Book_BookId1",
                table: "OrderBook");

            migrationBuilder.DropIndex(
                name: "IX_OrderBook_BookId1",
                table: "OrderBook");

            migrationBuilder.DropColumn(
                name: "BookId1",
                table: "OrderBook");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BookId1",
                table: "OrderBook",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_OrderBook_BookId1",
                table: "OrderBook",
                column: "BookId1");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderBook_Book_BookId1",
                table: "OrderBook",
                column: "BookId1",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
