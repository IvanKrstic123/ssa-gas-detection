using System;
using System.Collections.Generic;
using SmokeDetection.Entities;

namespace SmokeDetection.Repositories
{
    public interface IGasConcentrationRepository
    {
        GasConcentration GetGasConcentration(Guid id);
        IEnumerable<GasConcentration> GetAllGasConcentrations();

        void CreateGasConcentration(GasConcentration item);

        void UpdateGasConcentration(GasConcentration item);

        void DeleteGasConcentration(Guid id);

        List<string> GetCities();

        IEnumerable<GasConcentration> GetConcentrationByCity(string city);
    }
}
