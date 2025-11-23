using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AgiliRHFerias.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial_v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cargos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(max)", nullable: false),
                    NivelCargo = table.Column<int>(type: "int", nullable: false),
                    CBO = table.Column<string>(type: "varchar(max)", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    InicioVigencia = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cargos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cargos_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConfigsCalculoFerias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MultiplicarSempreNumeroDiasMes = table.Column<bool>(type: "bit", nullable: false),
                    MultiplicarSempreTrintaDias = table.Column<bool>(type: "bit", nullable: false),
                    DividirSempreNumeroDiasMes = table.Column<bool>(type: "bit", nullable: false),
                    DividirSempreTrintaDias = table.Column<bool>(type: "bit", nullable: false),
                    DividirFevereiroTrintaDias = table.Column<bool>(type: "bit", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfigsCalculoFerias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConfigsCalculoFerias_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConfigsINSS",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(max)", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfigsINSS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConfigsINSS_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConfigsIRRF",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(max)", nullable: false),
                    ValorDependentes = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfigsIRRF", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConfigsIRRF_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConfigsOrcamentoFerias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfigsOrcamentoFerias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConfigsOrcamentoFerias_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConfigsPeriodoAquisitivo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(max)", nullable: false),
                    NumeroMesesTrabalhados = table.Column<int>(type: "int", nullable: false),
                    NumeroDiasGozo = table.Column<int>(type: "int", nullable: false),
                    InicioVigencia = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfigsPeriodoAquisitivo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConfigsPeriodoAquisitivo_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConfigsReducaoDiasFerias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(max)", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfigsReducaoDiasFerias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConfigsReducaoDiasFerias_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Empresas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RazaoSocial = table.Column<string>(type: "varchar(max)", nullable: false),
                    NomeFantasia = table.Column<string>(type: "varchar(max)", nullable: false),
                    Filial = table.Column<bool>(type: "bit", nullable: false),
                    CNPJ = table.Column<string>(type: "varchar(max)", nullable: false),
                    CEP = table.Column<string>(type: "varchar(max)", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empresas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Empresas_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TurnosTrabalho",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TurnosTrabalho", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TurnosTrabalho_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FaixasINSS",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdConfigINSS = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SalarioContribuicaoInicial = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalarioContribuicaoFinal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Aliquota = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    InicioVigencia = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FaixasINSS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FaixasINSS_ConfigsINSS_IdConfigINSS",
                        column: x => x.IdConfigINSS,
                        principalTable: "ConfigsINSS",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FaixasIRRF",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdConfigIRRF = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    BaseCalculoInicial = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BaseCalculoFinal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Aliquota = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Deducao = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    InicioVigencia = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FaixasIRRF", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FaixasIRRF_ConfigsIRRF_IdConfigIRRF",
                        column: x => x.IdConfigIRRF,
                        principalTable: "ConfigsIRRF",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FaixasOrcamentoFerias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdConfigOrcamentoFerias = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Descricao = table.Column<string>(type: "varchar(max)", nullable: false),
                    Mes = table.Column<int>(type: "int", nullable: false),
                    Orcamento = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    InicioVigencia = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FaixasOrcamentoFerias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FaixasOrcamentoFerias_ConfigsOrcamentoFerias_IdConfigOrcamentoFerias",
                        column: x => x.IdConfigOrcamentoFerias,
                        principalTable: "ConfigsOrcamentoFerias",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FaixasReducaoDiasFerias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdConfigReducaoDiasFerias = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    NumeroDiasFaltaInicial = table.Column<int>(type: "int", nullable: false),
                    NumeroDiasFaltaFinal = table.Column<int>(type: "int", nullable: false),
                    NumeroDiasFerias = table.Column<int>(type: "int", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    InicioVigencia = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FaixasReducaoDiasFerias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FaixasReducaoDiasFerias_ConfigsReducaoDiasFerias_IdConfigReducaoDiasFerias",
                        column: x => x.IdConfigReducaoDiasFerias,
                        principalTable: "ConfigsReducaoDiasFerias",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Colaboradores",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "varchar(300)", maxLength: 300, nullable: false),
                    Email = table.Column<string>(type: "varchar(300)", maxLength: 300, nullable: false),
                    IdEmpresa = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdCargo = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdTurnoTrabalho = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DataAdmissao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Salario = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IdConfigPeriodoAquisitivo = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExerceLideranca = table.Column<bool>(type: "bit", nullable: false),
                    NumeroDependentes = table.Column<int>(type: "int", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    DataDesligamento = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colaboradores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Colaboradores_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Colaboradores_Cargos_IdCargo",
                        column: x => x.IdCargo,
                        principalTable: "Cargos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Colaboradores_ConfigsPeriodoAquisitivo_IdConfigPeriodoAquisitivo",
                        column: x => x.IdConfigPeriodoAquisitivo,
                        principalTable: "ConfigsPeriodoAquisitivo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Colaboradores_Empresas_IdEmpresa",
                        column: x => x.IdEmpresa,
                        principalTable: "Empresas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Colaboradores_TurnosTrabalho_IdTurnoTrabalho",
                        column: x => x.IdTurnoTrabalho,
                        principalTable: "TurnosTrabalho",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "FaixasTurnoTrabalho",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(max)", nullable: false),
                    Entrada1 = table.Column<TimeSpan>(type: "time", nullable: false),
                    Saida1 = table.Column<TimeSpan>(type: "time", nullable: false),
                    PossuiIntervalo = table.Column<bool>(type: "bit", nullable: false),
                    Entrada2 = table.Column<TimeSpan>(type: "time", nullable: true),
                    Saida2 = table.Column<TimeSpan>(type: "time", nullable: true),
                    InicioVigencia = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    IdTurnoTrabalho = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FaixasTurnoTrabalho", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FaixasTurnoTrabalho_TurnosTrabalho_IdTurnoTrabalho",
                        column: x => x.IdTurnoTrabalho,
                        principalTable: "TurnosTrabalho",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Faltas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdColaborador = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Justificada = table.Column<bool>(type: "bit", nullable: false),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataFim = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Observacao = table.Column<string>(type: "varchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faltas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Faltas_Colaboradores_IdColaborador",
                        column: x => x.IdColaborador,
                        principalTable: "Colaboradores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AvisosFerias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdEscalaFerias = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TotalPagamentoFerias = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Observacao = table.Column<string>(type: "varchar(max)", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvisosFerias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AvisosFerias_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EscalasFerias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdPeriodoAquisitivo = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NumeroDiasDisponiveis = table.Column<int>(type: "int", nullable: false),
                    NumeroDiasAbono = table.Column<int>(type: "int", nullable: false),
                    NumeroDiasGozo = table.Column<int>(type: "int", nullable: false),
                    InicioFerias = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FimFerias = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    Observacao = table.Column<string>(type: "varchar(max)", nullable: false),
                    UltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "varchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EscalasFerias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EscalasFerias_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PeriodosAquisitivos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdColaborador = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataFim = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false),
                    IdPeriodoConcessivo = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeriodosAquisitivos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PeriodosAquisitivos_Colaboradores_IdColaborador",
                        column: x => x.IdColaborador,
                        principalTable: "Colaboradores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PeriodosConcessivos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdPeriodoAquisitivo = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataFim = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Situacao = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeriodosConcessivos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PeriodosConcessivos_PeriodosAquisitivos_IdPeriodoAquisitivo",
                        column: x => x.IdPeriodoAquisitivo,
                        principalTable: "PeriodosAquisitivos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AvisosFerias_IdEscalaFerias",
                table: "AvisosFerias",
                column: "IdEscalaFerias");

            migrationBuilder.CreateIndex(
                name: "IX_AvisosFerias_UserId",
                table: "AvisosFerias",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Cargos_UserId",
                table: "Cargos",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Colaboradores_IdCargo",
                table: "Colaboradores",
                column: "IdCargo");

            migrationBuilder.CreateIndex(
                name: "IX_Colaboradores_IdConfigPeriodoAquisitivo",
                table: "Colaboradores",
                column: "IdConfigPeriodoAquisitivo");

            migrationBuilder.CreateIndex(
                name: "IX_Colaboradores_IdEmpresa",
                table: "Colaboradores",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_Colaboradores_IdTurnoTrabalho",
                table: "Colaboradores",
                column: "IdTurnoTrabalho");

            migrationBuilder.CreateIndex(
                name: "IX_Colaboradores_UserId",
                table: "Colaboradores",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConfigsCalculoFerias_UserId",
                table: "ConfigsCalculoFerias",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConfigsINSS_UserId",
                table: "ConfigsINSS",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConfigsIRRF_UserId",
                table: "ConfigsIRRF",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConfigsOrcamentoFerias_UserId",
                table: "ConfigsOrcamentoFerias",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConfigsPeriodoAquisitivo_UserId",
                table: "ConfigsPeriodoAquisitivo",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConfigsReducaoDiasFerias_UserId",
                table: "ConfigsReducaoDiasFerias",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_UserId",
                table: "Empresas",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EscalasFerias_IdPeriodoAquisitivo",
                table: "EscalasFerias",
                column: "IdPeriodoAquisitivo");

            migrationBuilder.CreateIndex(
                name: "IX_EscalasFerias_UserId",
                table: "EscalasFerias",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FaixasINSS_IdConfigINSS",
                table: "FaixasINSS",
                column: "IdConfigINSS");

            migrationBuilder.CreateIndex(
                name: "IX_FaixasIRRF_IdConfigIRRF",
                table: "FaixasIRRF",
                column: "IdConfigIRRF");

            migrationBuilder.CreateIndex(
                name: "IX_FaixasOrcamentoFerias_IdConfigOrcamentoFerias",
                table: "FaixasOrcamentoFerias",
                column: "IdConfigOrcamentoFerias");

            migrationBuilder.CreateIndex(
                name: "IX_FaixasReducaoDiasFerias_IdConfigReducaoDiasFerias",
                table: "FaixasReducaoDiasFerias",
                column: "IdConfigReducaoDiasFerias");

            migrationBuilder.CreateIndex(
                name: "IX_FaixasTurnoTrabalho_IdTurnoTrabalho",
                table: "FaixasTurnoTrabalho",
                column: "IdTurnoTrabalho");

            migrationBuilder.CreateIndex(
                name: "IX_Faltas_IdColaborador",
                table: "Faltas",
                column: "IdColaborador");

            migrationBuilder.CreateIndex(
                name: "IX_PeriodosAquisitivos_IdColaborador",
                table: "PeriodosAquisitivos",
                column: "IdColaborador");

            migrationBuilder.CreateIndex(
                name: "IX_PeriodosAquisitivos_IdPeriodoConcessivo",
                table: "PeriodosAquisitivos",
                column: "IdPeriodoConcessivo");

            migrationBuilder.CreateIndex(
                name: "IX_PeriodosConcessivos_IdPeriodoAquisitivo",
                table: "PeriodosConcessivos",
                column: "IdPeriodoAquisitivo");

            migrationBuilder.CreateIndex(
                name: "IX_TurnosTrabalho_UserId",
                table: "TurnosTrabalho",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AvisosFerias_EscalasFerias_IdEscalaFerias",
                table: "AvisosFerias",
                column: "IdEscalaFerias",
                principalTable: "EscalasFerias",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_EscalasFerias_PeriodosAquisitivos_IdPeriodoAquisitivo",
                table: "EscalasFerias",
                column: "IdPeriodoAquisitivo",
                principalTable: "PeriodosAquisitivos",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_PeriodosAquisitivos_PeriodosConcessivos_IdPeriodoConcessivo",
                table: "PeriodosAquisitivos",
                column: "IdPeriodoConcessivo",
                principalTable: "PeriodosConcessivos",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Colaboradores_Cargos_IdCargo",
                table: "Colaboradores");

            migrationBuilder.DropForeignKey(
                name: "FK_Colaboradores_ConfigsPeriodoAquisitivo_IdConfigPeriodoAquisitivo",
                table: "Colaboradores");

            migrationBuilder.DropForeignKey(
                name: "FK_Colaboradores_Empresas_IdEmpresa",
                table: "Colaboradores");

            migrationBuilder.DropForeignKey(
                name: "FK_Colaboradores_TurnosTrabalho_IdTurnoTrabalho",
                table: "Colaboradores");

            migrationBuilder.DropForeignKey(
                name: "FK_PeriodosConcessivos_PeriodosAquisitivos_IdPeriodoAquisitivo",
                table: "PeriodosConcessivos");

            migrationBuilder.DropTable(
                name: "AvisosFerias");

            migrationBuilder.DropTable(
                name: "ConfigsCalculoFerias");

            migrationBuilder.DropTable(
                name: "FaixasINSS");

            migrationBuilder.DropTable(
                name: "FaixasIRRF");

            migrationBuilder.DropTable(
                name: "FaixasOrcamentoFerias");

            migrationBuilder.DropTable(
                name: "FaixasReducaoDiasFerias");

            migrationBuilder.DropTable(
                name: "FaixasTurnoTrabalho");

            migrationBuilder.DropTable(
                name: "Faltas");

            migrationBuilder.DropTable(
                name: "EscalasFerias");

            migrationBuilder.DropTable(
                name: "ConfigsINSS");

            migrationBuilder.DropTable(
                name: "ConfigsIRRF");

            migrationBuilder.DropTable(
                name: "ConfigsOrcamentoFerias");

            migrationBuilder.DropTable(
                name: "ConfigsReducaoDiasFerias");

            migrationBuilder.DropTable(
                name: "Cargos");

            migrationBuilder.DropTable(
                name: "ConfigsPeriodoAquisitivo");

            migrationBuilder.DropTable(
                name: "Empresas");

            migrationBuilder.DropTable(
                name: "TurnosTrabalho");

            migrationBuilder.DropTable(
                name: "PeriodosAquisitivos");

            migrationBuilder.DropTable(
                name: "Colaboradores");

            migrationBuilder.DropTable(
                name: "PeriodosConcessivos");
        }
    }
}
