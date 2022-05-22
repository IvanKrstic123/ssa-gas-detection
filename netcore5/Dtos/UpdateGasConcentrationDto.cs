using System.ComponentModel.DataAnnotations;
using SmokeDetection.Entities;

namespace SmokeDetection.Dtos
{
        public record UpdateGasConcentrationDto
    {
        [Required]
        public string City { get; init; }

        [Required]
        public Months[] months { get; init; }
    }
}