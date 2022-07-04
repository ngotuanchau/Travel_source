using Microsoft.EntityFrameworkCore.Migrations;

namespace Travel.Migrations
{
    public partial class updateeeeeeeeeeeeeeeeeeeee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ThoiGianId",
                table: "HoaDons",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ThoiGianId",
                table: "HoaDons");
        }
    }
}
