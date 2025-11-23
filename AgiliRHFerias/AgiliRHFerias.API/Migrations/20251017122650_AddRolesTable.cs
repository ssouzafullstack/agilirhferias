using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AgiliRHFerias.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddRolesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b04f092c-99c8-48ec-b47d-2f9770a8b81f", null, "Administrator", "ADMINISTRATOR" },
                    { "c14f2f74-f6e8-4dd9-a8c0-d32548688a51", null, "Manager", "MANAGER" },
                    { "ca61e0b0-f5d5-4b8c-83a9-d9dfbe384c6e", null, "Employee", "EMPLOYEE" },
                    { "dd05da32-4bd1-45a4-b3d9-6e7f406a3b42", null, "Supervisor", "SUPERVISOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b04f092c-99c8-48ec-b47d-2f9770a8b81f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c14f2f74-f6e8-4dd9-a8c0-d32548688a51");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca61e0b0-f5d5-4b8c-83a9-d9dfbe384c6e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dd05da32-4bd1-45a4-b3d9-6e7f406a3b42");
        }
    }
}
