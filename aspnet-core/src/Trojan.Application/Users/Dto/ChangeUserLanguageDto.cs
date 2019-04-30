using System.ComponentModel.DataAnnotations;

namespace Trojan.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}