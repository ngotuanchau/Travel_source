using Microsoft.EntityFrameworkCore.Migrations;

namespace Travel.Migrations
{
    public partial class update_vedat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VeDaDat",
                table: "ThoiGians",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VeDaDat",
                table: "ThoiGians");
        }
    }
}
