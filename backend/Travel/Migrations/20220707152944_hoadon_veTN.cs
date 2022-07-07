using Microsoft.EntityFrameworkCore.Migrations;

namespace Travel.Migrations
{
    public partial class hoadon_veTN : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TongSoVeTn",
                table: "HoaDons",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TongSoVeTn",
                table: "HoaDons");
        }
    }
}
