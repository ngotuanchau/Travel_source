using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Travel.Migrations
{
    public partial class update_admin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CongTies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: true),
                    MatKhau = table.Column<string>(maxLength: 255, nullable: true),
                    Sdt = table.Column<string>(nullable: true),
                    KhuVuc = table.Column<string>(nullable: true),
                    VanPhong = table.Column<string>(nullable: true),
                    Mst = table.Column<string>(nullable: true),
                    TheNganHang = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CongTies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NguoiDungs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenNguoiDung = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    MatKhau = table.Column<string>(maxLength: 255, nullable: true),
                    Avt = table.Column<string>(nullable: true),
                    Cmnd = table.Column<string>(nullable: true),
                    Sdt = table.Column<string>(nullable: true),
                    NgaySinh = table.Column<DateTime>(nullable: false),
                    HoTen = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NguoiDungs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TheLoais",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenLoai = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TheLoais", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeXuatTours",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NguoiDungId = table.Column<int>(nullable: false),
                    CongTyId = table.Column<int>(nullable: false),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeXuatTours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeXuatTours_CongTies_CongTyId",
                        column: x => x.CongTyId,
                        principalTable: "CongTies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeXuatTours_NguoiDungs_NguoiDungId",
                        column: x => x.NguoiDungId,
                        principalTable: "NguoiDungs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tours",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CongTyId = table.Column<int>(nullable: false),
                    TheLoaiId = table.Column<int>(nullable: false),
                    TenTour = table.Column<string>(nullable: true),
                    MoTa = table.Column<string>(nullable: true),
                    CanChuanBi = table.Column<string>(nullable: true),
                    DiemNoiBat = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tours_CongTies_CongTyId",
                        column: x => x.CongTyId,
                        principalTable: "CongTies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tours_TheLoais_TheLoaiId",
                        column: x => x.TheLoaiId,
                        principalTable: "TheLoais",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnhTours",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(nullable: false),
                    Anh = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnhTours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnhTours_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietDichVus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(nullable: false),
                    CoTrongVe = table.Column<string>(nullable: true),
                    KhongTrongVe = table.Column<string>(nullable: true),
                    CheDoTreEm = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietDichVus", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChiTietDichVus_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DiaDiems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(nullable: false),
                    Ten = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiaDiems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiaDiems_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GhiChus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(nullable: false),
                    TieuDe = table.Column<string>(nullable: true),
                    NoiDung = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GhiChus", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GhiChus_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GiaTreEms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(nullable: false),
                    DoTuoi = table.Column<int>(nullable: false),
                    GiaVe = table.Column<int>(nullable: false),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiaTreEms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GiaTreEms_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HoaDons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NguoiDungId = table.Column<int>(nullable: false),
                    TourId = table.Column<int>(nullable: false),
                    TongSoVeNl = table.Column<int>(nullable: false),
                    TongSoVeTe = table.Column<int>(nullable: false),
                    TongTien = table.Column<int>(nullable: false),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HoaDons_NguoiDungs_NguoiDungId",
                        column: x => x.NguoiDungId,
                        principalTable: "NguoiDungs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HoaDons_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KhuyenMais",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(nullable: false),
                    TenKm = table.Column<string>(nullable: true),
                    GiaTri = table.Column<int>(nullable: false),
                    NgayApDung = table.Column<DateTime>(nullable: false),
                    NgayHetHan = table.Column<DateTime>(nullable: false),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhuyenMais", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KhuyenMais_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LichTrinhs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(nullable: false),
                    Sang = table.Column<string>(nullable: true),
                    Trua = table.Column<string>(nullable: true),
                    Chieu = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LichTrinhs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LichTrinhs_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ThoiGians",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(nullable: false),
                    NgayDi = table.Column<DateTime>(nullable: false),
                    GiaDefaut = table.Column<int>(nullable: false),
                    NgayVe = table.Column<DateTime>(nullable: false),
                    SoLuongMax = table.Column<int>(nullable: false),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThoiGians", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ThoiGians_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnhDds",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DiaDiemId = table.Column<int>(nullable: false),
                    Anh = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    NgaySua = table.Column<DateTime>(nullable: false),
                    NgayXoa = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnhDds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnhDds_DiaDiems_DiaDiemId",
                        column: x => x.DiaDiemId,
                        principalTable: "DiaDiems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnhDds_DiaDiemId",
                table: "AnhDds",
                column: "DiaDiemId");

            migrationBuilder.CreateIndex(
                name: "IX_AnhTours_TourId",
                table: "AnhTours",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDichVus_TourId",
                table: "ChiTietDichVus",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_DeXuatTours_CongTyId",
                table: "DeXuatTours",
                column: "CongTyId");

            migrationBuilder.CreateIndex(
                name: "IX_DeXuatTours_NguoiDungId",
                table: "DeXuatTours",
                column: "NguoiDungId");

            migrationBuilder.CreateIndex(
                name: "IX_DiaDiems_TourId",
                table: "DiaDiems",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_GhiChus_TourId",
                table: "GhiChus",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_GiaTreEms_TourId",
                table: "GiaTreEms",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDons_NguoiDungId",
                table: "HoaDons",
                column: "NguoiDungId");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDons_TourId",
                table: "HoaDons",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_KhuyenMais_TourId",
                table: "KhuyenMais",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_LichTrinhs_TourId",
                table: "LichTrinhs",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_ThoiGians_TourId",
                table: "ThoiGians",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_CongTyId",
                table: "Tours",
                column: "CongTyId");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_TheLoaiId",
                table: "Tours",
                column: "TheLoaiId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnhDds");

            migrationBuilder.DropTable(
                name: "AnhTours");

            migrationBuilder.DropTable(
                name: "ChiTietDichVus");

            migrationBuilder.DropTable(
                name: "DeXuatTours");

            migrationBuilder.DropTable(
                name: "GhiChus");

            migrationBuilder.DropTable(
                name: "GiaTreEms");

            migrationBuilder.DropTable(
                name: "HoaDons");

            migrationBuilder.DropTable(
                name: "KhuyenMais");

            migrationBuilder.DropTable(
                name: "LichTrinhs");

            migrationBuilder.DropTable(
                name: "ThoiGians");

            migrationBuilder.DropTable(
                name: "DiaDiems");

            migrationBuilder.DropTable(
                name: "NguoiDungs");

            migrationBuilder.DropTable(
                name: "Tours");

            migrationBuilder.DropTable(
                name: "CongTies");

            migrationBuilder.DropTable(
                name: "TheLoais");
        }
    }
}
