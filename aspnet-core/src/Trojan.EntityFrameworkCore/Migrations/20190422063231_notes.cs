using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Trojan.Migrations
{
    public partial class notes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    CreatorUserId = table.Column<long>(nullable: true),
                    Like = table.Column<long>(nullable: false),
                    Collect = table.Column<long>(nullable: false),
                    Scan = table.Column<long>(nullable: false),
                    TextType = table.Column<int>(nullable: false),
                    Des = table.Column<string>(nullable: true),
                    Img = table.Column<string>(nullable: true),
                    Tags = table.Column<string>(nullable: true),
                    IsPublic = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotesBooks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Des = table.Column<string>(nullable: true),
                    Img = table.Column<string>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    CreatorUserId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotesBooks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NoteToNoteBooks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NoteId = table.Column<int>(nullable: false),
                    NoteBookId = table.Column<int>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoteToNoteBooks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NoteToNoteBooks_NotesBooks_NoteBookId",
                        column: x => x.NoteBookId,
                        principalTable: "NotesBooks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NoteToNoteBooks_Notes_NoteId",
                        column: x => x.NoteId,
                        principalTable: "Notes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NoteToNoteBooks_NoteBookId",
                table: "NoteToNoteBooks",
                column: "NoteBookId");

            migrationBuilder.CreateIndex(
                name: "IX_NoteToNoteBooks_NoteId",
                table: "NoteToNoteBooks",
                column: "NoteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NoteToNoteBooks");

            migrationBuilder.DropTable(
                name: "NotesBooks");

            migrationBuilder.DropTable(
                name: "Notes");
        }
    }
}
