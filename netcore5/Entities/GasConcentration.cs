using System;

namespace SmokeDetection.Entities
{
    public record GasConcentration
    {
        public Guid Id { get; init; } // immutable property
        public string City { get; init; }
        public Months[] Months { get; init; }
    }
}