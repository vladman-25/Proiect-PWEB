using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class iDK5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderBook_Book_OrderId",
                table: "OrderBook");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderBook_Order_BookId",
                table: "OrderBook");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderBook_Book_BookId",
                table: "OrderBook",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderBook_Order_OrderId",
                table: "OrderBook",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderBook_Book_BookId",
                table: "OrderBook");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderBook_Order_OrderId",
                table: "OrderBook");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderBook_Book_OrderId",
                table: "OrderBook",
                column: "OrderId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderBook_Order_BookId",
                table: "OrderBook",
                column: "BookId",
                principalTable: "Order",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
