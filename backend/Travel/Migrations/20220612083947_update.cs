using Microsoft.EntityFrameworkCore.Migrations;

namespace Travel.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Gia",
                table: "ThoiGians",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "GiaVe",
                table: "GiaTreEms",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Gia",
                table: "ThoiGians",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<int>(
                name: "GiaVe",
                table: "GiaTreEms",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
