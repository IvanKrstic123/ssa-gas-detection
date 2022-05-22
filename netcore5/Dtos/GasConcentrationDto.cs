using System;
using SmokeDetection.Entities;

namespace SmokeDetection.Dtos
{
    public record GasConcentrationDto
    {

        public Guid Id { get; init; } // immutable property
        public string City { get; init; }
        public Months[] Months { get; init; }
    }
}