using Microsoft.EntityFrameworkCore.Migrations;

namespace Travel.Migrations
{
    public partial class update1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiaDiem_Tour_DiaDiems_DiaDiemId",
                table: "DiaDiem_Tour");

            migrationBuilder.DropForeignKey(
                name: "FK_DiaDiem_Tour_Tours_TourId",
                table: "DiaDiem_Tour");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DiaDiem_Tour",
                table: "DiaDiem_Tour");

            migrationBuilder.RenameTable(
                name: "DiaDiem_Tour",
                newName: "DiaDiem_Tours");

            migrationBuilder.RenameIndex(
                name: "IX_DiaDiem_Tour_TourId",
                table: "DiaDiem_Tours",
                newName: "IX_DiaDiem_Tours_TourId");

            migrationBuilder.RenameIndex(
                name: "IX_DiaDiem_Tour_DiaDiemId",
                table: "DiaDiem_Tours",
                newName: "IX_DiaDiem_Tours_DiaDiemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiaDiem_Tours",
                table: "DiaDiem_Tours",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DiaDiem_Tours_DiaDiems_DiaDiemId",
                table: "DiaDiem_Tours",
                column: "DiaDiemId",
                principalTable: "DiaDiems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DiaDiem_Tours_Tours_TourId",
                table: "DiaDiem_Tours",
                column: "TourId",
                principalTable: "Tours",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiaDiem_Tours_DiaDiems_DiaDiemId",
                table: "DiaDiem_Tours");

            migrationBuilder.DropForeignKey(
                name: "FK_DiaDiem_Tours_Tours_TourId",
                table: "DiaDiem_Tours");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DiaDiem_Tours",
                table: "DiaDiem_Tours");

            migrationBuilder.RenameTable(
                name: "DiaDiem_Tours",
                newName: "DiaDiem_Tour");

            migrationBuilder.RenameIndex(
                name: "IX_DiaDiem_Tours_TourId",
                table: "DiaDiem_Tour",
                newName: "IX_DiaDiem_Tour_TourId");

            migrationBuilder.RenameIndex(
                name: "IX_DiaDiem_Tours_DiaDiemId",
                table: "DiaDiem_Tour",
                newName: "IX_DiaDiem_Tour_DiaDiemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiaDiem_Tour",
                table: "DiaDiem_Tour",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DiaDiem_Tour_DiaDiems_DiaDiemId",
                table: "DiaDiem_Tour",
                column: "DiaDiemId",
                principalTable: "DiaDiems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DiaDiem_Tour_Tours_TourId",
                table: "DiaDiem_Tour",
                column: "TourId",
                principalTable: "Tours",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
