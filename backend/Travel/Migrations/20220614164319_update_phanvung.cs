using Microsoft.EntityFrameworkCore.Migrations;

namespace Travel.Migrations
{
    public partial class update_phanvung : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tours_PhanVung_PhanVungId",
                table: "Tours");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PhanVung",
                table: "PhanVung");

            migrationBuilder.RenameTable(
                name: "PhanVung",
                newName: "PhanVungs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PhanVungs",
                table: "PhanVungs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tours_PhanVungs_PhanVungId",
                table: "Tours",
                column: "PhanVungId",
                principalTable: "PhanVungs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tours_PhanVungs_PhanVungId",
                table: "Tours");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PhanVungs",
                table: "PhanVungs");

            migrationBuilder.RenameTable(
                name: "PhanVungs",
                newName: "PhanVung");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PhanVung",
                table: "PhanVung",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tours_PhanVung_PhanVungId",
                table: "Tours",
                column: "PhanVungId",
                principalTable: "PhanVung",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
