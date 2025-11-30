using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AgiliRHFerias.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class CorrecaoRelacionamentoPeriodos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PeriodosAquisitivos_PeriodosConcessivos_IdPeriodoConcessivo",
                table: "PeriodosAquisitivos");

            migrationBuilder.DropIndex(
                name: "IX_PeriodosAquisitivos_IdPeriodoConcessivo",
                table: "PeriodosAquisitivos");

            migrationBuilder.DropColumn(
                name: "IdPeriodoConcessivo",
                table: "PeriodosAquisitivos");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<Guid>(
                name: "IdPeriodoConcessivo",
                table: "PeriodosAquisitivos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_PeriodosAquisitivos_IdPeriodoConcessivo",
                table: "PeriodosAquisitivos",
                column: "IdPeriodoConcessivo");

            migrationBuilder.AddForeignKey(
                name: "FK_PeriodosAquisitivos_PeriodosConcessivos_IdPeriodoConcessivo",
                table: "PeriodosAquisitivos",
                column: "IdPeriodoConcessivo",
                principalTable: "PeriodosConcessivos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
