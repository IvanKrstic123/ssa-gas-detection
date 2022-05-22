using SmokeDetection.Dtos;
using SmokeDetection.Entities;

namespace SmokeDetection
{
    public static class Extensions{
        public static GasConcentrationDto AsDto(this GasConcentration item) 
        {
            return new GasConcentrationDto{
                Id = item.Id,
                City = item.City,
                Months = item.Months
            };
        }
    }
}