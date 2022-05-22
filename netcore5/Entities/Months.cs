using System;

namespace SmokeDetection.Entities
{
    public class Months
    {
        public string Name { get; init; }
        public decimal Co { get; init; }
        public decimal Co2 { get; init; }
        public decimal Methane { get; init; }
        public decimal Propane { get; init; }
        public decimal Butane { get; init; }
    }
}