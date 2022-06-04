using Microsoft.EntityFrameworkCore.Migrations;

namespace Travel.Migrations
{
    public partial class update_tencty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tencongty",
                table: "CongTies",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tencongty",
                table: "CongTies");
        }
    }
}
