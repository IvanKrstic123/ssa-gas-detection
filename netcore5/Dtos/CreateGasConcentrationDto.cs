using System.ComponentModel.DataAnnotations;
using SmokeDetection.Entities;

namespace SmokeDetection.Dtos
{
    public record CreateGasConcentrationDto
    {
        [Required]
        public string City { get; init; }

        [Required]
        public Months[] Months { get; init; }
    }
}